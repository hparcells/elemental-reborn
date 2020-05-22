import React, { useState } from 'react';

import Login from './Login';

function App() {
  const [userToken, setUserToken] = useState<string>();

  function handleLogin(googleUser: any) {
    setUserToken(googleUser.getAuthResponse().id_token);
  }

  return <div>{userToken ? null : <Login handleLogin={handleLogin} />}</div>;
}

export default App;
