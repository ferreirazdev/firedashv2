/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import classNames from 'classnames';
import ClipLoader from 'react-spinners/ClipLoader';

import { useFormatMessage, useFormatDate } from 'hooks';
import { fetchUsers, deleteUser } from 'state/actions/users';
import paths from 'pages/Router/paths';
import ConfirmationModal from 'components/ConfirmationModal';

import {
  Container,
  UsersTopBar,
  UsersContentWrapper,
  ButtonEditWrapper,
  AdminIconWrapper
} from './styles';

const Users = () => {
  const { usersList, isAdmin, error, loading, deleted } = useSelector(
    (state) => ({
      usersList: state.users.data,
      isAdmin: state.auth.userData.isAdmin,
      error: state.users.error,
      loading: state.users.loading,
      deleted: state.users.deleted,
    }),
    shallowEqual
  );

  const [deleteModal, setDeleteModal] = useState({
    userId: null,
    isOpen: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (deleted && !loading) {
      setDeleteModal((prevState) => ({
        userId: null,
        isOpen: !prevState.isOpen,
      }));
    }
  }, [deleted, loading]);

  const redirect = !isAdmin && <Redirect to={paths.ROOT} />;

  const onRemoveButtonClickHandler = (userId) => {
    setDeleteModal((prevState) => ({
      userId,
      isOpen: !prevState.isOpen,
    }));
  };

  const onCloseModalHandler = () => {
    setDeleteModal({ userId: null, isOpen: false });
  };

  const onDeleteUserHandler = () => {
    dispatch(deleteUser(deleteModal.userId));
  };

  console.log(usersList);

  const deleteMessage = useFormatMessage('Users.delete');
  const confirmMessage = useFormatMessage('Users.confirm');
  const permDeleteMessage = useFormatMessage('Users.permDelete');
  const cancelMessage = useFormatMessage('Users.cancel');

  return (
    <Container>
      {redirect}
      {deleteModal.isOpen && (
        <ConfirmationModal
          isActive={deleteModal.isOpen}
          isLoading={loading}
          confirmButtonMessage={deleteMessage}
          title={confirmMessage}
          body={permDeleteMessage}
          cancelButtonMessage={cancelMessage}
          onConfirmation={onDeleteUserHandler}
          onCancel={onCloseModalHandler}
        />
      )}
      <UsersTopBar>
        <div className="usersTopBarWrapper">
            
            <div className="titleContentWrapper">
              <div className="titleWrapper">
                <h1 className="title">{useFormatMessage('Users.users')}</h1>
              </div>
            </div>
            
            <div className="createUserWrapper">
              <div className="createUser">
                <Link to={paths.ADD_USER} className="button">
                  {useFormatMessage('Users.newUser')}
                </Link>
              </div>
            </div>
          
        </div>
      </UsersTopBar>

      <UsersContentWrapper>
        <div>
          <h1>Id</h1>
          {loading ? <ClipLoader /> : usersList.map(user => (
            <div className="infoWrapper" key={user.id}>
              <div className="idWrapper">
                <h3>{user.id}</h3>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h1>Nome</h1>
          {loading ? <ClipLoader /> : usersList.map(user => (
            <div className="infoWrapper" key={user.id}>
              <div className="nameWrapper">
                <h3>{user.name}</h3>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h1>Email</h1>
          {loading ? <ClipLoader /> : usersList.map(user => (
            <div className="infoWrapper" key={user.id}>
              <div className="emailWrapper">
                <h3>{user.email}</h3>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h1>Admin</h1>
          {loading ? <ClipLoader /> : usersList.map(user => (
            <div className="infoWrapper" key={user.id}>
              <div className="isAdminWrapper">
                <AdminIconWrapper className="has-text-grey is-abbr-like">
                  {user.isAdmin ? (
                    <span className="icon">
                      <i className="mdi mdi-check" />
                    </span>
                    ) : (
                    <span className="icon">
                      <i className="mdi mdi-close" />
                    </span>
                    )}
                </AdminIconWrapper>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h1>Ações</h1>
          {loading ? <ClipLoader /> : usersList.map(user => (
            <div className="infoWrapper" key={user.id}>
              <div className="actionsWrapper">
                <ButtonEditWrapper>
                  <Link
                    to={`/users/${user.id}`}
                    className="button is-small is-primary"
                  >
                    <span className="icon is-small">
                      <i className="mdi mdi-account-edit" />
                    </span>
                  </Link>
                    <button
                      type="button"
                      className="button is-small is-danger"
                      onClick={() => onRemoveButtonClickHandler(user.id)}
                    >
                      <span className="icon is-small">
                        <i className="mdi mdi-trash-can" />
                      </span>
                    </button>
                </ButtonEditWrapper>
              </div>
            </div>
          ))}
        </div>
                      
      
        
        
      </UsersContentWrapper>
    </Container>
  );
};

export default Users;