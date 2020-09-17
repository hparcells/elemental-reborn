import React, { useEffect, useState } from 'react';

import socket from '../socket';

import { setPlayerCount } from '../logic/stats';

import Login from './Login';
import Game from './Game';

export let username: string = null as any;
export let userToken: string = null as any;

function App() {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    function handleReceivePlayerCount(playerCount: number) {
      setPlayerCount(playerCount);
    }

    socket.on('player-count', handleReceivePlayerCount);

    return () => {
      socket.removeListener('player-count', handleReceivePlayerCount);
    };
  }, []);

  function handleLogin(googleUser: any) {
    setToken(googleUser.getAuthResponse().id_token);

    userToken = googleUser.getAuthResponse().id_token;
    username = googleUser.getBasicProfile().getName();
  }

  return <>{token ? <Game /> : <Login handleLogin={handleLogin} />}</>;
}

export default App;
