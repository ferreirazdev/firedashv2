import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;

  @media (max-width: 600px){
      padding: 50px 10px;
    }
`;

export const FormWrapper = styled.div`
  width: 100%;
  padding: 50px;
  background: #17191e;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px){
      flex-direction: column;
      width: 65%;
    }



  a {
      background: #17191e;
      font-size: 14px;
      padding: 8px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      color: #fff;
      &:hover {
        text-decoration: none;
      }

      @media(max-width: 600px){
        font-size: 11px;
      }
    }

  .has-text-danger {
    color: #ff3860;
  }

  form{
    width: 100%;
    justify-content: center;
    align-items: center;

    @media (max-width: 600px){
      flex-direction: column;
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

      @media (max-width: 600px){
        font-size: 12px;
      }
    }

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
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;