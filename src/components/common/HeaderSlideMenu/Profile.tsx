import React, { MouseEvent } from 'react';
import { AppDispatch } from 'store/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from 'hooks/useRedux';
import { closeMenu } from 'reducers/slideMenu';
import { logOut } from 'reducers/user';
import { RootState } from 'store/configureStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './profile.module.scss';
import X from 'assets/X.svg';
import arrow from 'assets/arrow-right.svg';
import Logout from 'assets/bold-Logout.svg';
import { offline } from 'actions/access';

/**
 * 사용자가 로그인 된 경우 보여주는 컴포넌트입니다.
 * @returns {React.ReactElement} JSX 형식의 엘리먼트를 반환합니다.
 */
const LoggedInProfile = (): React.ReactElement => {
  let navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const username = useSelector((state: RootState) => state.user.username);
  const course = useSelector((state: RootState) => state.user.course);
  const generation = useSelector((state: RootState) => state.user.generation);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    navigate('/myPage');
    dispatch(closeMenu());
  };

  return (
    <button className={styles.Profile} onClick={handleClick}>
      <div className={styles.ProfileImage}></div>

      {isAdmin && (
        <>
          <div className={styles.ProfileInfo}>
            <span>{username}</span>
          </div>
        </>
      )}
      {!isAdmin && (
        <>
          <div className={styles.ProfileInfo}>
            <span>{`[${course}/${generation}]`}</span>
            <span>{username}</span>
          </div>
        </>
      )}
    </button>
  );
};

/**
 * 사용자가 로그인 되지 않은 경우 보여주는 컴포넌트 입니다.
 * @returns {React.ReactElement} JSX 형식의 엘리먼트를 반환합니다.
 */
const ToLogIn = (): React.ReactElement => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    navigate('/login');
    dispatch(closeMenu());
  };

  return (
    <div className={styles.Profile}>
      <button className={styles.ToLogInButton} onClick={handleClick}>
        <span className={styles.ToLogInSpan}>로그인하러가기</span>{' '}
        <img className={styles.arrow} src={arrow} alt='->' />
      </button>
    </div>
  );
};

/**
 * 메뉴 버튼 눌렀을 시 나오는 슬라이드 메뉴 입니다.
 * @returns {React.ReactElement} JSX 형식의 엘리먼트를 반환합니다.
 */
const Profile = (): React.ReactElement => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const offLineDispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const email = useSelector((state: RootState) => state.user.email);

  const handleLogoutClick = async () => {
    const api = process.env.REACT_APP_BACKEND_ADDRESS + '/members/logout';
    try {
      await offLineDispatch(offline(email)).unwrap();
      await axios.delete(api, {
        withCredentials: true,
      });
      await dispatch(closeMenu());
      await dispatch(logOut());
      await navigate('/');
    } catch (error) {
      console.log('Logout Error : ', error);
    }
  };

  return (
    <div className={styles.LayoutProfile}>
      <div className={styles.ButtonBar}>
        <button onClick={() => dispatch(closeMenu())}>
          <img className={styles.ButtonX} src={X} alt='X' />
        </button>
        {isLoggedIn && (
          <button onClick={handleLogoutClick}>
            <img src={Logout} className={styles.ButtonLogout} alt='Logout' />
          </button>
        )}
      </div>
      {isLoggedIn ? <LoggedInProfile /> : <ToLogIn />}
    </div>
  );
};

export default Profile;
