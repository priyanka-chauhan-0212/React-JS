import styled from 'styled-components';

import Colors from '../../container/design/Colors';
import { scrollbars } from '../../container/design/Styled';

export const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
  max-width:70%;


  .date {
    width: 12%;

    @media (min-width: 767px) and (max-width: 1200px) {
      width: 12%;
    }
  }

  .section {
    display: flex;

    @media (min-width: 320px) and (max-width: 1200px) {
      flex-direction: column;
    }
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    color: #183b56;
  }

  .back-img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  h2 {
    font-size: 30px;
    font-weight: 600;
    color: #183b56;
    margin-top: 30px;
    margin-bottom: 30px;

    @media (min-width: 320px) and (max-width: 1200px) {
      font-size: 20px;
      margin-top: 20px;
      margin-bottom: 20px;
      line-height: 1.6;
    }
  }

  .select-icon {
    position: relative;

    .fa-chevron-down {
      position: absolute;
      top: 16px;
      right: 14px;
      font-size: 12px;
      pointer-events: none;
    }
  }

  select {
    height: 45px;
    width: 100%;
    font-size: 12px !important;
    border-radius: 4px;
    padding-left: 10px;
    background-color: #f7f8f9;
    border: none;
    margin-bottom: 20px;

    :focus-visible {
      border: none;
      outline: none;
    }

    :-ms-expand {
      display: none;
    }

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  .custome {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 60px #00000012;
    border: none;
    padding: 24px;
    border-radius: 8px;
    min-width: 300px;
    max-width: 300px;
    width: 300px;
    height: 100%;
    margin-bottom: 20px;

    @media (min-width: 320px) and (max-width: 1200px) {
      min-width: 100%;
      max-width: 100%;
      width: 100%;
    }
  }

  .title {
    font-size: 14px;
    font-weight: 600;
    color: #183b56;
  }

  .custome-title {
    font-size: 20px;
    font-weight: 700;
    color: #183b56;
    margin-bottom: 20px;
  }

  .comment {
    margin-left: 25px;
    font-size: 14px;
    font-weight: 600;
    color: #183b56;
    margin-bottom: 20px;
  }

  .color-flex {
    display: flex;
    flex-direction: column;
   
  }

  .color {
    height: 45px;
    width: 120px;
    border-radius: 4px;
    padding: 6px;
    background-color: #f7f8f9;

    :focus-visible {
      border: none;
      outline: none;
    }
  }

  .input {
    height: 45px;
    width: 100%;
    font-size: 12px !important;
    border-radius: 4px;
    padding-left: 10px;
    background-color: #f7f8f9;
    border: none;

    :focus-visible {
      border: none;
      outline: none;
    }
  }

  textarea {
    height: 120px;
    width: 100%;
    font-size: 12px !important;
    border-radius: 4px;
    padding: 12px;
    background-color: #f7f8f9;
    border: none;

    :focus-visible {
      border: none;
      outline: none;
    }
  }

  .align {
    text-align: center;
  }

  .configure {
    background-color: #bce897;
    color: #5f7948;
    font-size: 14px;
    height: 45px;
    width: 200px;
    border-radius: 8px !important;
    border: none;
    font-weight: 700 !important;
    margin-top: 35px;

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

  .accordion {
    background-color: ${ Colors.Transparent };
  }

  .accordion .card {
    border: none;
    background-color: ${ Colors.Transparent };
    border-bottom: 1px solid ${ Colors.BorderHover };
    border-radius: 0;
  }

  .card-header {
    background-color: ${ Colors.Transparent };
    font: 500 10px Montserrat;
    color: ${ Colors.Container };
    padding: 16px 0;
    -webkit-appearance: inherit;
  }

  .card-header.inactive {
    pointer-events: none;
  }

  .card-header.active {
  }

  .card-header[aria-expanded='true'],
  .collapse {
    background: ${ Colors.Transparent };
  }

  .card-header[aria-expanded='false'] {
    .fa-chevron-circle-up {
      display: none;
    }
  }

  .card-header[aria-expanded='true'] {
    .fa-chevron-circle-down {
      display: none;
    }
  }

  label {
    margin-top: 10px;
    font: 500 12px Montserrat;
    color: ${ Colors.LightDark };
  }

  .radio-buttons {
    display: flex;
    cursor: pointer;
  }

  .theme-option {
    width: 56px;
    height: 56px;
    border: 1px solid ${ Colors.BorderHover };
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;

    :visited {
      border-color: ${ Colors.red };
    }
  }

  .theme-option-label {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .number1 {
    color: rgb(255, 255, 255);
    background: ${ ({ color }) => color };
    border-radius: 4px;
  }

  .number2 {
    color: ${ ({ color }) => color };
    background: rgb(255, 255, 255);
    border-radius: 4px;
    border: 1px solid ${ ({ color }) => color };
  }

  .shape {
    margin-bottom: 20px;
  }

  .shape1 {
    width: 36px;
    height: 36px;
    border-radius: 5px;
    background: ${ ({ color }) => color };
  }

  .shape2 {
    width: 36px;
    height: 36px;
    background: ${ ({ color }) => color };
  }

  .shape3 {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${ ({ color }) => color };
  }

  .cards {
    border: none;
    padding: 0;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    text-align: center;
    margin-left: 30px;

    @media (min-width: 320px) and (max-width: 1200px) {
      margin-left: 0;
      margin-top: 30px;
    }
  }

  .flex-mobile {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #cad1d3;
    margin: 30px 0;
  }
`;

export const Arrows = styled.div`
  position: absolute;
  top: 17px;
  right: 0;
  font-size: 12px;
  color: #183b56;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: ${ Colors.LightDark };
  vertical-align: baseline;
  position: relative;

  @media (min-width: 320px) and (max-width: 1200px) {
    font-size: 12px;
  }

  :before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 1px solid #cad1d3;
  }

  div:nth-child(1) {
    border-radius: 5px 5px 0 0;
    // border-radius: 5px 0 0 0;
    // border-right: 0;
  }

  div:nth-child(2) {
    border-radius: 0 5px 0 0;
  }

  .tab {
    padding: 12px 30px;
    border: 1px solid #cad1d3;
    position: relative;
    cursor: pointer;

    @media (min-width: 320px) and (max-width: 1200px) {
      padding: 12px 14px;
    }
  }

  .tab.active {
    color: #344eaa;
    font-weight: 700;
    border-bottom: 1px solid ${ Colors.Container };
  }
`;

export const EmailDetails = styled.table`
  width: 100%;

  .table-container {
    border: 1px solid #cad1d3;
    border-radius: 5px;
    margin: 20px 0;
    text-align: left;
  }

  table {
    width: 100%;
  }

  tr {
    border-bottom: 1px solid #cad1d3;
    font-size: 14px;
    border-radius: 8px;

    :last-child {
      border-bottom: none;
    }

    td {
      padding: 10px;
    }

    .from {
      white-space: nowrap;
      width: 14%;
      border-right: 1px solid #cad1d3;
    }
  }
`;

export const DesktopPreview = styled.div`
  border-radius: 12px 12px 3px 3px;
  border: 1px solid ${ Colors.BorderHover };
  margin: 20px 0;

  @media (min-width: 320px) and (max-width: 767px) {
    margin-left: 0;
    margin-right: 0;
  }

  .header {
    padding: 12px 24px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${ Colors.BorderHover };

    .left {
      width: 18px;
      height: 16px;
      background: #ecece8;
      border-radius: 2px;
      margin-right: 4px;
    }

    .border {
      width: 100%;
      height: 16px;
      background: #ecece8;
      border-radius: 14px;
      margin-left: 12px;
    }
  }

  .desktop-modal {
    margin: 35px;

    @media (min-width: 320px) and (max-width: 991px) {
      margin: 16px;
    }
  }

  .view-card {
    border-radius: 10px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 60px #00000012;
    width: 100%;
    padding: 0 30px;
    text-align: left;
    padding-top: 1px;

    @media (min-width: 320px) and (max-width: 767px) {
      padding: 1px 12px;
    }
  }

  .name {
    font-size: 16px;
    font-weight: 600;
    color: #183b56;
    margin-top: 35px;
    margin-bottom: 15px;
  }

  .description {
    font-size: 14px;
    font-weight: 500;
    color: #183b56;
    margin-top: 10px;
    margin-bottom: 30px;
  }

  .rating {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rating-m {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .line {
    height: 22px;
    margin-top: 3px;
    margin-right: 10px;
    width: 4px;
    border-radius: 10px;
    background: #dadfe3;

    @media (min-width: 320px) and (max-width: 767px) {
      height: 12px;
      margin-top: 0px;
    }

    @media (min-width: 767px) and (max-width: 991px) {
      height: 18px;
      margin-top: 0px;
    }
  }

  .divider {
    height: 40px;
  }

  .dropdown-divider.new {
    margin: 0;
    border: 4px solid #dadfe3;
    border-radius: 8px;
    margin-top: -22px;
    margin-bottom: 20px;

    @media (min-width: 320px) and (max-width: 767px) {
      border: 2px solid #dadfe3;
      border-radius: 8px;
      margin-top: -11px;
    }

    @media (min-width: 767px) and (max-width: 991px) {
      border: 3px solid #dadfe3;
      border-radius: 8px;
      margin-top: -15px;
    }
  }

  .row {
    @media (min-width: 320px) and (max-width: 767px) {
      margin-right: 0;
      margin-left: 0;
    }
  }

  .col {
    @media (min-width: 320px) and (max-width: 400px) {
      flex-basis: unset;
      margin-bottom: 16px;
    }

    @media (min-width: 400px) and (max-width: 767px) {
      flex-basis: unset;
      margin-bottom: 16px;
      max-width: 50%;
    }

    @media (min-width: 400px) and (max-width: 1200px) {
      padding-right: 5px;
      padding-left: 5px;
    }
  }

  .number {
    font-size: 20px;
    font-weight: bold;
    border-radius: 50%;
    width: 40px;
    min-width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    color: #ffffff;

    :last-child {
      margin-right: 0;
    }

    @media (min-width: 320px) and (max-width: 767px) {
      width: 18px;
      min-width: 18px;
      height: 18px;
      font-size: 8px;
    }

    @media (min-width: 767px) and (max-width: 991px) {
      width: 25px;
      min-width: 25px;
      height: 25px;
      font-size: 12px;
    }
  }

  .like {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .not-likely {
    font-size: 14px;
    font-weight: 600;
  }

  .category-card {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 60px #00000012;
    width: 280px;
    max-width: 280px;
    min-width: 280px;
    border-radius: 10px;
    padding: 0 20px;
    text-align: center;
    position: relative;
  }

  .flex {
    display: flex;
    justify-content: center;
  }

  .dropdown-divider {
    margin: 30px 0;
  }

  .comment-text {
    color: #183b56;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .box {
    height: 50px;
    border-radius: 10px;
    background: #f7f8f9;
  }

  .buttons {
    text-align: center;
    padding: 30px;
  }

  .send {
    background-color: #bce897;
    color: #5f7948;
    font-size: 14px;
    height: 45px;
    width: 200px;
    border-radius: 8px !important;
    border: none;
    font-weight: 700 !important;

  //   :hover,
  //   :active,
  //   :focus,
  //   :focus-visible {
  //     background-color: #bce897 !important;
  //     color: #5f7948 !important;
  //     outline: none !important;
  //     box-shadow: none !important;
    }
  }
`;

export const Emoji = styled.div`
  background: #f7f8f9;
  border-radius: 8px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  .svg-inline--fa {
    font-size: 30px;
    color: ${ ({ icon }) => icon };
  }

  .emoji-text {
    font-size: 14px;
    font-weight: 600;
    color: ${ ({ text }) => text };
    margin-top: 30px;
  }

  .emoji-card.active {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 60px #00000012;
  }
`;
