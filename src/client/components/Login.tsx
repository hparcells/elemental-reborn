import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function Login({ handleLogin }: { handleLogin: (googleUser: any) => void }) {
  const [hasError, setHasError] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  function onLoginError(error: any) {
    setError(error.error);
    setHasError(true);
  }
  function handleErrorClose() {
    setHasError(false);
  }

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>Elemental Reborn</h1>

        <p>
          Yet another Elemental 3 clone. Combine elements together to form new elements. Login with
          Google below to get started.
        </p>
        <GoogleLogin
          clientId='148901687072-c2otormactiabvs9iqacd751e7f62f9b.apps.googleusercontent.com'
          onSuccess={handleLogin}
          onFailure={onLoginError}
        />

        <p style={{ fontSize: '12px' }}>
          This game is not officially affiliated with carykh's Elemental games, and none of your
          personal information (e.g. email address, name, IP, etc.) will be stored.
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
