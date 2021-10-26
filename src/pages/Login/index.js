import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import classNames from 'classnames';
import { toastr } from 'react-redux-toastr';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

import firebase from 'firebase.js';
import {
  auth,
  setPassword,
  authCleanUp,
  authWithSocialMedia,
} from 'state/actions/auth';
import { useFormatMessage } from 'hooks';
import { firebaseError, uiConfig } from 'utils';
import ErrorMessage from 'components/ErrorMessage';
import paths from 'pages/Router/paths';
import classes from './Login.module.scss';

import {
  Container,
  FormWrapper,
  SocialButtons
} from './styles';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const Login = () => {
  const { error, isAuth, loading, locale } = useSelector(
    (state) => ({
      error: state.auth.error,
      isAuth: !!state.auth.userData.id,
      loading: state.auth.loading,
      locale: state.preferences.locale,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    document.documentElement.classList.remove(
      'has-aside-left',
      'has-navbar-fixed-top'
    );
    return () => {
      document.documentElement.classList.add(
        'has-aside-left',
        'has-navbar-fixed-top'
      );
      dispatch(authCleanUp());
    };
  }, [dispatch]);

  const isEmailLink = firebase
    .auth()
    .isSignInWithEmailLink(window.location.href);

  const onSubmitHandler = ({ email, password }) => {
    if (isEmailLink) {
      dispatch(setPassword(email, password, window.location.href));
    } else {
      dispatch(auth(email, password));
    }
  };

  const onSignInSuccessHandler = (authResult) => {
    dispatch(authWithSocialMedia(authResult));
  };

  const onSignInFailHandler = (signInEror) => {
    const signInErrorMessage = firebaseError(signInEror.code, locale);
    toastr.error('', signInErrorMessage);
  };

  const isValidPassword = watch('password') && watch('password').length >= 6;

  const invalidEmailMessage = useFormatMessage('Login.invalidEmail');

  const safePasswordMessage = useFormatMessage('Login.safePassword');

  const unsafePasswordMessage = useFormatMessage('Login.unsafePassword');

  const redirect = isAuth && <Redirect to={paths.ROOT} />;

  const setNewPasswordMessage = useFormatMessage('Login.setNewPassword');

  const loginMessage = useFormatMessage('Login.login');

  const setPasswordMessage = useFormatMessage('Login.setPassword');

  const forgotPasswordMessage = useFormatMessage('Login.forgotPassword');

  const invalidPasswordMessage = useFormatMessage('Login.invalidPassword');

  return (
    <Container>
      {redirect}
      <div className="container">
                <header className="card-header">
                  <p className="card-header-title">
                    <span className="icon">
                      <i className="mdi mdi-lock default" />
                    </span>
                    <span>
                      {isEmailLink ? setNewPasswordMessage : loginMessage}
                    </span>
                  </p>
                </header>
                <FormWrapper>
                  <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="field">
                      <p className="label">{useFormatMessage('Login.email')}</p>
                      <div className="control is-clearfix">
                        <input
                          className={classNames('input', {
                            'is-danger': errors.email,
                          })}
                          name="email"
                          ref={register}
                        />
                      </div>
                      {errors.email && (
                        <ErrorMessage text={invalidEmailMessage} />
                      )}
                    </div>
                    <div className="field">
                      <p className="label">
                        {useFormatMessage('Login.password')}
                      </p>
                      <div className="control is-clearfix">
                        <input
                          className={classNames(
                            'input',
                            {
                              'is-danger': errors.password,
                            },
                            {
                              'is-success': isEmailLink && isValidPassword,
                            }
                          )}
                          type="password"
                          name="password"
                          ref={register}
                        />
                      </div>
                      {errors.password ? (
                        <ErrorMessage
                          text={
                            isEmailLink
                              ? unsafePasswordMessage
                              : invalidPasswordMessage
                          }
                        />
                      ) : (
                        isEmailLink &&
                        isValidPassword && (
                          <p className="is-success">{safePasswordMessage}</p>
                        )
                      )}
                    </div>
                    {error && (
                      <p
                        className={classNames(
                          'has-text-danger',
                          classes.errorMessage
                        )}
                      >
                        {error}
                      </p>
                    )}
                    <br />
                    <div className="buttonLinkWrapper">
                    
                      <div className="control">
                        <button
                          type="submit"
                          className={classNames('button', 'is-black', {
                            'is-loading': loading,
                          })}
                        >
                          {isEmailLink ? setPasswordMessage : loginMessage}
                        </button>
                      </div>
                      {!isEmailLink && (
                        <div className="control">
                          <Link
                            to={paths.RESET_PASSWORD}
                            className="button is-outlined"
                          >
                            {forgotPasswordMessage}
                          </Link>
                        </div>
                      )}
                    </div>
                    
                  </form>
                  {!isEmailLink && (
                    <SocialButtons>
                      <hr />
                      <div
                        className={classNames(
                          'field',
                          'is-grouped',
                          classes.socialButtons
                        )}
                      >
                        <StyledFirebaseAuth
                          uiConfig={uiConfig(
                            onSignInSuccessHandler,
                            onSignInFailHandler
                          )}
                          firebaseAuth={firebase.auth()}
                        />
                      </div>
                    </SocialButtons>
                  )}
                </FormWrapper>
              
      </div>
    </Container>
  );
};

export default Login;