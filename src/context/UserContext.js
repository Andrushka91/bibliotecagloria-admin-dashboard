import React from "react";
import booksApi from '../api/books';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGNUP_SUCCESS":
      return action.payload;
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

function signIn(dispatch, email, password, history, setIsLoading, setError) {
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
        localStorage.setItem('userId',user.data.id);
        setError(null);
        setIsLoading(false)
        dispatch({ type: 'LOGIN_SUCCESS', isAuthenticated: true })
        history.push('/app/BookList')
      } catch (error) {
        setError(true);
        setIsLoading(false);
        dispatch({ type: 'LOGIN_FAILURE', isAuthenticated: false })
      }
    }
  )
    ();
}
const signUp = async (dispatch, name, email, password, setIsLoading, setSuccess, setError, handleCloseModalAddAccount,accountCreated, setAccountCreated ) => {
  setError(false);
  setIsLoading(true);
  try {
    const userType = 'admin';
    console.log("signupData:", name, email, userType, password);
    const { data } = await booksApi.post('/signup', { name, email, userType, password });
    console.log("data:", data);
    setSuccess(true);
    setError(null)
    setIsLoading(false);
    setTimeout(() => {
      handleCloseModalAddAccount();
    }, 4000);
    setAccountCreated(!accountCreated);
  } catch (error) {
    setSuccess(false);
    setError(true);
    setIsLoading(false);
    console.log("error:", error)
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

export { UserProvider, useUserState, useUserDispatch, signIn, signUp, signOut };
