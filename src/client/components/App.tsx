import React, { useState } from 'react';

import Login from './Login';
import Game from './Game';

export let username: string = null as any;

function App() {
  const [userToken, setUserToken] = useState<string>();

  function handleLogin(googleUser: any) {
    setUserToken(googleUser.getAuthResponse().id_token);
    username = googleUser.getBasicProfile().getName();
  }

  return (
    <div>{userToken ? <Game userToken={userToken} /> : <Login handleLogin={handleLogin} />}</div>
  );
}

export default App;
