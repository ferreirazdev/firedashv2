import styled from 'styled-components';

export const Container = styled.div`
  z-index: 1;
  position: fixed;
  
  overflow: auto;
  display: flex;
  background: #000;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: -150px;
  margin-top: -200px;
`;

export const ModalCard = styled.div`

  .modal-card-body{
    background: #181b23;
    border: none;
    padding: 20px 20px;

    section {
      font-weight: 700;
    }
  }

  .modal-card-foot {
    display: flex;
    padding: 20px 20px;
    border: none;

    background: #181b23;

    button {
      background: #ff3860;
      text-decoration: none;
      padding: 8px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      color: #fff;
      &:hover {
        background: red;
      }
    }

    .buttonCancel{
      background: #17191e;
      font-size: 14px;
      padding: 8px;
      border-radius: 6px;
      font-weight: 500;
      color: #fff;
      &:hover {
        text-decoration: underline;
        background: #17191e;
      }
    }
  }
`;