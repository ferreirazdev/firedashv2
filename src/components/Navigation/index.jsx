import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'state/actions/auth';
import Logo from 'assets/fire.png';

import './Navigation.scss';

const Navigation = () => {
  const dispatch = useDispatch();

  const onClickLogoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="containerNavigation">
      <div className="logoWrapper">
        <img src={Logo} alt="logo"/>
        <h1>Firedash</h1>
      </div>
      <div className="buttonWrapper">
        <button onClick={onClickLogoutHandler}>Sair</button>
      </div>
    </div>
  );
};

export default Navigation;