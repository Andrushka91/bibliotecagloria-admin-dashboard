import React from "react";
import booksApi from '../api/books';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, email, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  (
    async () => {
      try {
        const { data } = await booksApi.post('signin', { email, password })
        localStorage.setItem('token', data.token)
        localStorage.setItem('email', email);
        const user = await booksApi.get('/getUser', { headers: { 'token': data.token } })
        localStorage.setItem('name', user.data.name);
        setError(null)
        setIsLoading(false)
        dispatch({ type: 'LOGIN_SUCCESS', isAuthenticated: true })
        history.push('/app/dashboard')
      } catch (error) {
        console.log("ERROR:", error);
        setError(true);
        setIsLoading(false);
        dispatch({ type: 'LOGIN_FAILURE', isAuthenticated: false })
      }
    }
  )();
}

// if (!!login && !!password) {
//   setTimeout(() => {
//     localStorage.setItem('id_token', 1)
//     setError(null)
//     setIsLoading(false)
//     dispatch({ type: 'LOGIN_SUCCESS' })

//     history.push('/app/dashboard')
//   }, 2000);
// } else {
//   dispatch({ type: "LOGIN_FAILURE" });
//   setError(true);
//   setIsLoading(false);
// }


function signOut(dispatch, history) {
  localStorage.removeItem("token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
