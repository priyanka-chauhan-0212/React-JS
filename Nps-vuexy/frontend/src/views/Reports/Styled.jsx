import styled from 'styled-components';

import Colors from '../../container/design/Colors';

export const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
  max-width:100% !important;
max-width:100% !important;


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

  .wrapper {
    display: flex;
    align-items: flex-start;

    @media (min-width: 320px) and (max-width: 991px) {
      flex-direction: column;
    }
  }

  .card {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 60px #00000012;
    border: none;
    border-radius: 10px;
    height: 100%;
  }

  .score {
    width: 50%;
    height: 85px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    padding-left: 20px;
    position: relative;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    margin-right: 18px;

    @media (min-width: 320px) and (max-width: 500px) {
      width: 100%;
      margin-right: 0;
    }

    @media (min-width: 500px) and (max-width: 991px) {
      width: 50%;
    }
  }

  .respondents {
    width: 50%;
    height: 85px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    padding-left: 20px;
    position: relative;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: hidden;

    @media (min-width: 320px) and (max-width: 500px) {
      width: 100%;
    }

    @media (min-width: 500px) and (max-width: 991px) {
      width: 50%;
    }
  }

  .promoters {
    width: 50%;
    height: 270px;
    margin-right: 18px;

    @media (min-width: 320px) and (max-width: 500px) {
      width: 100%;
      margin-right: 0;
      margin-bottom: 20px;
    }

    @media (min-width: 500px) and (max-width: 991px) {
      width: 50%;
    }
  }

  .uses-totals-pop {
    display: flex;
    justify-content: center;
  }

  .user-sm {
    width: 200px;
    height: 150px;
    position: relative;
    margin-top: -40px;
  }

  .uses-totals {
    width: 50%;
    height: 270px;

    @media (min-width: 320px) and (max-width: 500px) {
      width: 100%;
    }

    @media (min-width: 500px) and (max-width: 991px) {
      width: 50%;
    }
  }

  .score-all {
    width: 100%;
  }

  .d-flex {
    display: flex;
    align-items: center;

    @media (min-width: 320px) and (max-width: 500px) {
      flex-direction: column;
      width: 100%;
    }

    @media (min-width: 500px) and (max-width: 991px) {
      width: 100%;
    }
  }

  .score-flex {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 60px #00000012;
    width: 70%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 8px;

    @media (min-width: 320px) and (max-width: 991px) {
      flex-direction: column;
      width: 100%;
      height: auto;
    }
  }

  .respondents-comments {
    height: 375px;
  }

  .respondents-comments-flex {
    width: 100%;
    margin-left: 15px;

    @media (min-width: 320px) and (max-width: 991px) {
      margin-top: 20px;
      margin-left: 0;
    }
  }

  .number {
    font: 600 32px Montserrat;

    // font: 600 20px Montserrat;
    color: ${ Colors.LightDark };
    margin-bottom: 5px;
  }

   .number-text {
    font: 500 14px Montserrat;
    color: ${ Colors.DarkGrey };
  }

  .number-text1 {
    font: 500 14px Montserrat;
    color: ${ Colors.DarkGrey };
    width: 100%;
    line-height: 1.5;
  }

  .promoters-title {
    padding: 15px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font: 600 18px Montserrat;
    color: ${ Colors.LightDark };
    border-bottom: 1px solid ${ Colors.BorderHover };
  }

  .overlay1 {
    background: #ddf0ed;
    width: 108px;
    height: 100px;
    position: absolute;
    top: -35px;
    right: -20px;
    border-radius: 60%;
  }

  .overlay2 {
    background: #dee7f9;
    width: 108px;
    height: 100px;
    position: absolute;
    top: -35px;
    right: -20px;
    border-radius: 60%;
  }

  .fa-chart-bar {
    color: #72bfb2;
    font-size: 24px;
    margin-top: 60px;
    margin-left: 42px;
  }

  .fa-user-friends {
    color: #779ce6 !important;
    font-size: 24px !important;
    margin-top: 60px !important;
    margin-left: 42px !important;
  }

  .pie-wrapper {
    display: flex;
    justify-content: center;

    .pie {
      width: 140px;
      height: 140px;
      margin-top: 15px;
    }
  }

  .label {
    font: 500 14px Montserrat;
    color: ${ Colors.LightDark };
    padding: 0 16px;
    margin-top: 15px;

    .col {
      margin-bottom: 10px;
    }
  }

  .label1 {
    position: absolute;
    bottom: 0px;
    font: 500 14px Montserrat;
    color: ${ Colors.LightDark };
    padding: 0 16px;
    margin-top: 24px;
    width: 109%;

    .col {
      margin-bottom: 10px;
    }
  }

  .color1 {
    display: flex;
    align-items: center;

    .fa-circle {
      color: #bce897;
      margin-right: 4px;
      font-size: 8px;
    }
  }

  .color2 {
    display: flex;
    align-items: center;

    .fa-circle {
      color: #faca00;
      margin-right: 4px;
      font-size: 8px;
    }
  }

  .color3 {
    display: flex;
    align-items: center;

    .fa-circle {
      color: #e95432;
      margin-right: 4px;
      font-size: 8px;
    }
  }

  .promoters-k {
    background-color: #bce897;
    width: 80px;
    height: 80px;
    position: absolute;
    top: 60px;
    left: 20px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${ Colors.Container };

    div:nth-child(1) {
      font: 500 28px Montserrat;
    }

    div:nth-child(2) {
      font: 500 8px Montserrat;
      color: #689f5c;
    }
  }

  .passive-k {
    background-color: #faca00;
    width: 60px;
    height: 60px;
    position: absolute;
    top: 70px;
    left: 120px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${ Colors.Container };

    div:nth-child(1) {
      font: 500 20px Montserrat;
    }

    div:nth-child(2) {
      font: 500 8px Montserrat;
      color: ${ Colors.LightDark };
      margin-top: 2px;
    }
  }

  .detractors-k {
    background-color: #e95432;
    position: absolute;
    top: 130px;
    left: 88px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${ Colors.Container };

    div:nth-child(1) {
      font: 500 20px Montserrat;
    }
  }
`;

export const Filter = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 10px 10px 60px #00000012;
  width: 300px;
  border-radius: 8px;
  margin-left: 50px;

  @media (min-width: 320px) and (max-width: 991px) {
    margin-top: 20px;
    margin-left: 0;
    width: 100%;
  }

  @media (min-width: 991px) and (max-width: 1000px) {
    margin-left: 50px;
  }

  @media (min-width: 1000px) and (max-width: 1200px) {
    margin-left: 25px;
  }


  .survey {
    color: #183b56;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: center;
    cursor: pointer;
    width: 300px;
    transition: all 0.5s ease-in-out;
  }

  .survey.active {
    padding: 10px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 60px #00000012;
    margin-left: -20px;
    border-radius: 6px;
    width: 250px;
    padding-left: 30px;

    .check-box {
      margin-right: 10px;
    }

    .s-box {
      background: #bce897;
      color: #637e4c;
    }
  }

  .s-box {
    padding: 8px 10px;
    background: #dee7f9;
    color: #779ce6;
    border-radius: 5px;
    margin-left: 12px;
    width: 170px;
  }

  // .survey {
  //   color: #183b56;
  //   font-size: 14px;
  //   font-weight: bold;
  //   display: flex;
  //   align-items: center;
  //   margin-bottom: 20px;
  //   justify-content: flex-start;
  //   padding: 10px;
  //   background: #ffffff 0% 0% no-repeat padding-box;
  //   box-shadow: 10px 10px 60px #00000012;
  //   margin-left: -15px;
  //   border-radius: 6px;
  //   width: 300px;
  //   margin-top: 25px;
  //    margin-bottom: 30px;
  //   padding-left: 30px;

  //   .check-box {
  //     margin-right: 10px;
  //     width: 18px;
  //     height: 18px;
  //   }

  //   .s-box {
  //     background: #bce897;
  //     color: #637e4c;
  //   }
  // }

  // .s-box {
  //   padding: 8px 10px;
  //   background: #dee7f9;
  //   color: #779ce6;
  //   border-radius: 5px;
  //   margin-left: 5px;
  //   width: 100%;
  //   text-align: center;
  // }

  .report {
    margin-bottom: 40px;

    img {
      width: 20px;
      height: 20px;
      margin-right: 12px;
    }
  }

  .archive {
    font-size: 14px;
    font-weight: 600;
    color: #183b56;
    padding: 0 45px;
    margin-bottom: 10px;
  }

  .month {
    display: flex;
    align-items: center;
    color: #779ce6;
    font-size: 14px;
    font-weight: 600;
    padding: 6px 55px;
    cursor: pointer;
  }
`;
