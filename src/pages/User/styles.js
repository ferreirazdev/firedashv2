import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 100px;

  @media(max-width: 600px){
    padding: 30px;
  }

  .is-hero-bar{
    @media(max-width: 600px){
      margin-bottom: -30px;
    }
  }

  .title {
    @media(max-width: 600px){
      font-size: 20px;
    }
  }
`;
