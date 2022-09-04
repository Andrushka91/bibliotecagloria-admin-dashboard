import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// context
import { useUserDispatch, signUp } from "../../../context/UserContext";

function SignUp({handleCloseModalAddAccount, accountCreated, setAccountCreated }) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [success, setSuccess] = useState(null);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState(" ");
  var [passwordValue, setPasswordValue] = useState("");

  return (
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <React.Fragment>
            <Typography variant="h4" className={classes.subGreeting}>
              Crează cont administrator
            </Typography>
            <Fade in={error}>
              <Typography color="secondary" className={classes.errorMessage}>
                Crearea contului nu a putut fi efectuată :(
              </Typography>
            </Fade>
            <Fade in={success}>
              <Typography color="primary" className={classes.errorMessage}>
                Contul a fost creat cu success!
              </Typography>
            </Fade>
            <TextField
              id="name"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={nameValue}
              onChange={e => setNameValue(e.target.value)}
              margin="normal"
              placeholder="Nume"
              type="text"
              fullWidth
            />
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={loginValue}
              onChange={e => setLoginValue(e.target.value)}
              margin="normal"
              placeholder="Adresă de email"
              type="email"
              fullWidth
            />
            <TextField
              id="password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={passwordValue}
              onChange={e => setPasswordValue(e.target.value)}
              margin="normal"
              placeholder="Parolă"
              type="password"
              fullWidth
            />
            <div className={classes.creatingButtonContainer}>
              {isLoading ? (
                <CircularProgress size={26} />
              ) : (
                <Button
                  onClick={() =>
                    signUp(
                      userDispatch,
                      nameValue,
                      loginValue,
                      passwordValue,
                      setIsLoading,
                      setSuccess,
                      setError,
                      handleCloseModalAddAccount,
                      accountCreated, 
                      setAccountCreated 
                    )
                  }
                  disabled={
                    loginValue.length === 0 ||
                    passwordValue.length === 0 ||
                    nameValue.length === 0
                  }
                  size="large"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.createAccountButton}
                >
                  Crează cont
                </Button>
              )}
            </div>
            <div className={classes.formDividerContainer}>
              <div className={classes.formDivider} />
              <div className={classes.formDivider} />
            </div>

          </React.Fragment>

        </div>
        <Typography color="primary" className={classes.copyright}>
          ©{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="#" rel="noopener noreferrer" target="_blank">BibliotecaGloria</a>
        </Typography>
      </div>
    
  );
}

export default withRouter(SignUp);
