import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  

  .is-ancestor {
    background: #17191e;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
      background: #17191e;
      padding: 8px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      color: #fff;
      &:hover {
        background: #2e323a;
        text-decoration: none;
      }
    }

    button {
      text-decoration: none;
      background: #f2721c;
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

  .card-header {
    p {
      font-size: 25px;

    }
  }

  .card-content {
    justify-content: center;
    form {
      input {
        width: 95%;
        color: #fff;
        background: #2e323a;
        padding: 10px 10px;
        margin-top: 5px;
        margin-bottom: 10px;
        border-radius: 6px;
      }
    }
  }

  .adminControl {
    margin: 5px 0;
    display: flex;
  }

  .controlWrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .fileInput {

    .file-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .file-input {
        width: 50%;
        margin-right: 5px;
      }

      .file-cta{
        display: flex;
      }
    }
  }
`;