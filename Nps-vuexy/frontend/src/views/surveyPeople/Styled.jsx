import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
  max-width:70%;

    @media screen and (max-width:768px)
    {
      //  max-width:85%;
    }

  .title {
    font-size: 30px;
    font-weight: 600;
    color: #183b56;
    margin-top: 30px;
    margin-bottom: 20px;

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

  .card {
    background: #fff;
    border: 1px solid #e0e0d9;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    cursor: pointer;
    margin-bottom: 30px;
    border-radius: 10px;

    :hover {
      border-color: #344eaa;
    }

    img {
      width: 120px;
      height: 90px;
    }

    .name {
      font-size: 25px;
      font-weight: bold;
      margin: 15px 0;
    }

    // .content {
    //   font-size: 18px;
    //   font-weight: 500;
    //   margin-bottom: 20px;
    //   text-align: center;
    // }
  }

  button {
    // background-color: #bce897;
    // color: #5f7948;
    // font-size: 14px;
    // height: 45px;
    // width: 200px;
    // border-radius: 30px !important;
    // border: none;
    // font-weight: 700 !important;

    // :hover,
    // :active,
    // :focus,
    // :focus-visible {
    //   background-color: #bce897 !important;
    //   color: #5f7948 !important;
    //   outline: none !important;
    //   box-shadow: none !important;
    // }
  }
`;
