import React, { useEffect, useState } from 'react';

import socket from '../socket';

import { setElementCount, setMostRecentElements, setPlayerCount } from '../logic/stats';

import { ElementCount, MostRecentElement } from '../../shared/types';

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
    function handleReceiveMostRecentElements(recent: MostRecentElement[]) {
      setMostRecentElements(recent);
    }
    function handleReceiveElementCount(elementCount: ElementCount) {
      setElementCount(elementCount);
    }

    socket.on('player-count', handleReceivePlayerCount);
    socket.on('most-recent-elements', handleReceiveMostRecentElements);
    socket.on('element-count', handleReceiveElementCount);

    return () => {
      socket.removeListener('player-count', handleReceivePlayerCount);
      socket.removeListener('most-recent-elements', handleReceiveMostRecentElements);
      socket.removeListener('element-count', handleReceiveElementCount);
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
