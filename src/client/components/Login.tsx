import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { usePlayerCount } from '../logic/stats';

import packageJson from '../../../package.json';

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

        <div style={{ textAlign: 'left' }}>
          <h2>FAQ</h2>
          <p>
            <strong>Q</strong>: What happened to all the elements.
          </p>
          <p>
            <strong>A</strong>: On 2020-09-18, I accidentally deleted all the recipes to the
            elements with no way to get them back. The elements still existed, but none of them
            would be creatable. The database was reset.
          </p>
        </div>

        <p style={{ fontSize: '12px' }}>
          This game is not officially affiliated with carykh's Elemental games, and none of your
          personal information (e.g. email address, IPs, etc.) will be stored, <em>however</em>,
          your Google profile name will be displayed if elements you submit get voted through.
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
