import React, { useEffect, useState } from 'react';

import socket from '../socket';

import { setElementCount, setMostRecentElements, setPlayerCount } from '../logic/stats';

import { ElementCount, MostRecentElement } from '../../shared/types';

import Login from './Login';
import Game from './Game';

export const login = {
  loggedIn: false,
  username: '',
  token: ''
};

function App() {
  const [access, setAccess] = useState<boolean>(false);

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
    login.loggedIn = true;
    login.username = googleUser.getBasicProfile().getName();
    login.token = googleUser.getAuthResponse().id_token;
    setAccess(true);
  }
  function handleGuestLogin() {
    setAccess(true);
  }

  return (
    <>
      {access ? <Game /> : <Login handleLogin={handleLogin} handleGuestLogin={handleGuestLogin} />}
    </>
  );
}

export default App;
