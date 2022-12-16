import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
  max-width:100% !important;


  .title {
    font-size: 30px;
    font-weight: 600;
    color: #183b56;
    margin-bottom: 10px;
    margin-top: 30px;

    @media (min-width: 320px) and (max-width: 1200px) {
      font-size: 20px;
      margin-top: 20px;
      margin-bottom: 20px;
      line-height: 1.6;
    }
  }

  .back-img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .wrapper {
    background: rgb(40, 44, 52);
    border-radius: 10px;
    overflow: auto;
    tab-size: 1.5em;
    position: relative;
  }

  .copy-img {
    position: absolute;
    right: 35px;
    top: 20px;
    cursor: pointer;

    @media (min-width: 320px) and (max-width: 1200px) {
      right: 20px;
      top: 10px;
    }
  }

  pre {
    margin: 1rem 2rem;
    color: rgb(250, 200, 99);
    user-select: text;

    @media (min-width: 320px) and (max-width: 1200px) {
      margin: 0.5rem 1rem;
    }

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;
