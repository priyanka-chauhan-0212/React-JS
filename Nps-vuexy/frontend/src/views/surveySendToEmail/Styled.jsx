import styled from 'styled-components';

import Colors from '../../container/design/Colors';

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

  .people {
    font-size: 12px;
    font-weight: bold;
    color: #183b56;
    margin-bottom: 5px;
  }

  textarea {
    height: 150px;
    width: 50%;
    font-size: 15px !important;
    border-radius: 4px;
    padding: 12px;
    background-color: #f7f8f9;
    border-color: ${ Colors.BorderHover };
    ${ scrollbars };

    :focus-visible {
      outline: none;
    }

    @media (min-width: 320px) and (max-width: 1200px) {
      width: 100%;
    }
  }

  .submit {
    background-color: #bce897;
    color: #5f7948;
    font-size: 14px;
    height: 45px;
    width: 200px;
    border-radius: 8px !important;
    border: none;
    font-weight: 700 !important;
    margin-top: 30px;
    margin-bottom: 30px;

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
