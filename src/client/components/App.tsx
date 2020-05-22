import React, { useState } from 'react';

import Login from './Login';
import Game from './Game';

function App() {
  const [userToken, setUserToken] = useState<string>();

  function handleLogin(googleUser: any) {
    setUserToken(googleUser.getAuthResponse().id_token);
  }

  return <div>{userToken ? <Game /> : <Login handleLogin={handleLogin} />}</div>;
}

export default App;
