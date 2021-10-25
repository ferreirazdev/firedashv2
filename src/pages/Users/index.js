/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import classNames from 'classnames';
import ClipLoader from 'react-spinners/ClipLoader';

import { useFormatMessage, useFormatDate } from 'hooks';
import Table from 'components/Table';
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

  const [search, setSearch] = useState('');

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

  const columns = [
    {
      Header: '',
      accessor: 'logoUrl',
      Cell: ({ row }) => (
        <div className="image">
          <img src={row.original.logoUrl} alt="" className="is-rounded" />
        </div>
      ),
      disableSortBy: true,
    },
    {
      Header: useFormatMessage('Users.name'),
      accessor: 'name',
    },
    {
      Header: useFormatMessage('Users.email'),
      accessor: 'email',
    },
    {
      Header: useFormatMessage('Users.location'),
      accessor: 'location',
    },
    {
      Header: useFormatMessage('Users.admin'),
      accessor: 'isAdmin',
      Cell: ({ row }) => (
        <AdminIconWrapper className="has-text-grey is-abbr-like">
          {row.original.isAdmin ? (
            <span className="icon">
              <i className="mdi mdi-check" />
            </span>
          ) : (
            <span className="icon">
              <i className="mdi mdi-close" />
            </span>
          )}
        </AdminIconWrapper>
      ),
    },
    {
      Header: useFormatMessage('Users.created'),
      accessor: 'created',
      Cell: ({ row }) => (
        <small className="has-text-grey is-abbr-like">
          {useFormatDate(row.original.createdAt, {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </small>
      ),
    },
    {
      Header: '',
      id: 'actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <>
          {!row.original.isAdmin && (
            <ButtonEditWrapper>
              <Link
                to={`/users/${row.original.id}`}
                className="button is-small is-primary"
              >
                <span className="icon is-small">
                  <i className="mdi mdi-account-edit" />
                </span>
              </Link>

              <button
                type="button"
                className="button is-small is-danger"
                onClick={() => onRemoveButtonClickHandler(row.original.id)}
              >
                <span className="icon is-small">
                  <i className="mdi mdi-trash-can" />
                </span>
              </button>
            </ButtonEditWrapper>
          )}
        </>
      ),
      disableSortBy: true,
    },
  ];

  const data = search
    ? usersList.filter((el) => {
        const clonedElem = { ...el };
        delete clonedElem.id;
        delete clonedElem.isAdmin;
        delete clonedElem.logoUrl;
        return Object.values(clonedElem).some((field) =>
          field.toLowerCase().includes(search.toLowerCase())
        );
      })
    : usersList;

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
        <div className="usersWrapper">
          <div className="Users">
            {loading ? <ClipLoader /> : <Table columns={columns} data={data} />}
            {error && 'Show error'}
          </div>
        </div>
      </UsersContentWrapper>
    </Container>
  );
};

export default Users;