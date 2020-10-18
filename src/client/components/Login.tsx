import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { usePlayerCount } from '../logic/stats';

import packageJson from '../../../package.json';
import { exception } from 'react-ga';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function Login({ handleLogin }: { handleLogin: (googleUser: any) => void }) {
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
        <GoogleLogin
          clientId='148901687072-c2otormactiabvs9iqacd751e7f62f9b.apps.googleusercontent.com'
          onSuccess={handleLogin}
          onFailure={onLoginError}
        />
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
