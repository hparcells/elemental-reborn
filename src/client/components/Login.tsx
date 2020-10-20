import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';

import { usePlayerCount } from '../logic/stats';

import packageJson from '../../../package.json';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function Login({
  handleLogin,
  handleGuestLogin
}: {
  handleLogin: (googleUser: any) => void;
  handleGuestLogin: () => void;
}) {
  const [hasError, setHasError] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const playerCount = usePlayerCount();

  function onLoginError(error: any) {
    setError(error.error);
    setHasError(true);
  }
  function handleErrorClose() {
    setHasError(false);
  }

  return (
    <div>
      <div style={{ textAlign: 'center', maxWidth: '900px', margin: 'auto', padding: '1em' }}>
        <div
          style={{
            textAlign: 'center'
          }}
        >
          <h1 style={{ marginBottom: '0px' }}>
            Elemental Reborn <span style={{ fontSize: '18px' }}>v{packageJson.version}</span>
          </h1>
          <p style={{ marginTop: '0px' }}>{playerCount} Online</p>
        </div>

        <p>
          Yet another Elemental 3 clone. Combine elements together to form new elements. Login with
          Google below to get started.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            clientId='148901687072-c2otormactiabvs9iqacd751e7f62f9b.apps.googleusercontent.com'
            onSuccess={handleLogin}
            onFailure={onLoginError}
            style={{
              marginRight: '0.5em'
            }}
            render={(renderProps) => {
              return (
                <Button
                  onClick={renderProps.onClick}
                  variant='contained'
                  color='primary'
                  style={{
                    marginRight: '0.5em'
                  }}
                  disabled={renderProps.disabled}
                >
                  Login with Google
                </Button>
              );
            }}
          />
          <Button
            onClick={handleGuestLogin}
            variant='contained'
            color='primary'
            style={{
              marginLeft: '0.5em'
            }}
          >
            Guest Login
          </Button>
        </div>

        <p style={{ fontSize: '14px' }}>
          Logging in as a guest, you will be unable to make any element suggestions.
        </p>
      </div>

      <Snackbar open={hasError} autoHideDuration={5000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity='error'>
          {error} Try again.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
