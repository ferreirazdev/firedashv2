import styled from 'styled-components';

export const Container = styled.div`
  margin: 100px;
  padding: 20px 50px;
  background: #17191e;
  border-radius: 20px;
  padding-bottom: 60px;
`;
export const UsersTopBar = styled.section`
  .usersTopBarWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      color: #F67E2D;
    }
  }

  .createUser {
    .button {
      background: #f2721c;
      text-decoration: none;
      padding: 8px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      color: #fff;
      &:hover {
        background: #F67E2D;
      }
    }
  }
`;

export const UsersContentWrapper = styled.section`
  margin-top: 20px;
  
`;

export const AdminIconWrapper = styled.small`
  display: flex;
  align-items: center;
  .mdi-check {
    color: #00c4a7;
  }
  .mdi-close {
    color: #ff3860;
  }
`;

export const ButtonEditWrapper = styled.div`
  display: flex;
  align-items: center;
  .mdi-account-edit {
    padding: 3px;
    background: #00c4a7;
    color: #fff;
  }
  .mdi-trash-can {
    padding: 5px;
    background: #ff3860;
    color: #fff;
    cursor: pointer;
  }
`;

