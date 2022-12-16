import styled from 'styled-components';

import Colors from '../../container/design/Colors';
import { scrollbars } from '../../container/design/Styled';

export const Container = styled.div`




  .title {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: ${ Colors.DarkGrey };
    padding: 30px 0;
    text-transform: capitalize;
  }

  .wrapper {
    text-align: center;
    background-color: ${ Colors.BorderWhite };
    padding: 25px 0;

    @media (min-width: 320px) and (max-width: 550px) {
      width: 100%;
      padding: 25px;
    }
  }

  .feedback {
    font-size: 20px;
    font-weight: bold;
    color: ${ Colors.LightDark };
    margin-bottom: 20px;
  }

  .content {
    font-size: 20px;
    font-weight: 600;
    color: ${ Colors.LightDark };
    margin-bottom: 20px;
  }

  input {
    width: 500px;
    height: 50px;
    font-size: 12px !important;
    border-radius: 4px;
    padding-left: 10px;
    background-color: #f7f8f9;
    border: 1px solid #cad1d3;
    margin-bottom: 20px;

    @media (min-width: 320px) and (max-width: 550px) {
      width: 100%;
    }

    :focus-visible {
      outline: none;
    }
  }

  textarea {
    height: 150px;
    width: 500px;
    font-size: 15px !important;
    border-radius: 4px;
    padding: 12px;
    background-color: #f7f8f9;
    border-color: ${ Colors.BorderHover };
    ${ scrollbars };

    @media (min-width: 320px) and (max-width: 550px) {
      width: 100%;
    }

    :focus-visible {
      outline: none;
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
    margin-top: 20px;

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
