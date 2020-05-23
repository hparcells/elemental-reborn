import React, { useState } from 'react';

import Login from './Login';
import Game from './Game';

export let username: string = null as any;
export let userToken: string = null as any;

function App() {
  const [token, setToken] = useState<string>();

  function handleLogin(googleUser: any) {
    setToken(googleUser.getAuthResponse().id_token);

    userToken = googleUser.getAuthResponse().id_token;
    username = googleUser.getBasicProfile().getName();
  }

  return <div>{token ? <Game /> : <Login handleLogin={handleLogin} />}</div>;
}

export default App;
