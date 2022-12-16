import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
max-width:70%;



  @media (min-width: 767px) and (max-width: 1200px) {
    max-width: 100%;
    padding-left: 25px;
    padding-right: 25px;
  }

  .title {
    font-size: 30px;
    font-weight: 600;
    color: #183b56;
    margin-bottom: 30px;
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

  .view-card {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 60px #00000012;
    margin-right: 40px;
    width: 100%;
    max-width: 80%;
    min-width: 610px;
    border-radius: 10px;
    padding: 0 30px;

    @media (min-width: 320px) and (max-width: 991px) {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      margin-bottom: 30px;
      padding: 0 12px;
    }

    @media (min-width: 991px) and (max-width: 1200px) {
      width: 58%;
      max-width: 58%;
      min-width: 58%;
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
    align-items: center;
    justify-content: center;
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
      margin-top: 1px;
    }

    @media (min-width: 767px) and (max-width: 1200px) {
      height: 18px;
    }
  }

  .dropdown-divider.new {
    margin: 0;
    border: 4px solid #dadfe3;
    border-radius: 8px;
    margin-top: -22px;
    margin-bottom: 20px;

    @media (min-width: 320px) and (max-width: 767px) {
      border: 2px solid #dadfe3;
      margin-top: -11px;
    }

    @media (min-width: 767px) and (max-width: 991px) {
      margin-top: -18px;
    }

    @media (min-width: 991px) and (max-width: 1200px) {
      margin-top: -16px;
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
      width: 20px;
      min-width: 20px;
      height: 20px;
      font-size: 8px;
    }

    @media (min-width: 767px) and (max-width: 991px) {
      width: 31px;
      min-width: 31px;
      height: 31px;
      font-size: 12px;
    }

    @media (min-width: 991px) and (max-width: 1200px) {
      width: 26px;
      min-width: 26px;
      height: 26px;
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

  .emoji-card {
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
    }

    .emoji-text {
      font-size: 14px;
      font-weight: 600;
      color: #183b56;
      margin-top: 30px;
    }
  }

  .emoji-card.active {
    background: #00000012 50% 50% no-repeat padding-box;
    box-shadow: 10px 10px 60px #00000012;
  }

  .category-card {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 60px #00000012;
    width: 280px;
    max-width: 280px;
    min-width: 280px;
    min-height: 350px;
    border-radius: 10px;
    padding: 0 20px;
    text-align: center;
    position: relative;

    @media (min-width: 320px) and (max-width: 991px) {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      height: 400px;
    }
  }

  .flex {
    display: flex;
    justify-content: center;
   

    @media (min-width: 320px) and (max-width: 991px) {
      flex-direction: column;
    }
  }

  .dropdown-divider {
    margin: 30px 0;
  }

  .divider {
    @media (min-width: 320px) and (max-width: 991px) {
      margin: 30px 0;
    }
  }

  .comment-text {
    color: #183b56;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
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
    transition: all 0.5s ease-in-out;
  }

  .survey.active {
    padding: 10px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 60px #00000012;
    margin-left: -38px;
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

  .check-box {
    width: 18px;
    height: 18px;
  }

  .box {
    height: 50px;
    border-radius: 10px;
    background: #f7f8f9;
    margin-bottom: 40px;
  }

  .customize {
    background-color: #bce897;
    color: #5f7948;
    font-size: 14px;
    height: 45px;
    width: 200px;
    border-radius: 8px !important;
    border: none;
    font-weight: 700 !important;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

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

  .buttons {
    text-align: center;
    margin-bottom: 40px;
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

  .color0 {
    background: #c41513;
  }

  .color1 {
    background: #ed302b;
  }

  .color2 {
    background: #ff605d;
  }

  .color3 {
    background: #ff8527;
  }

  .color4 {
    background: #ffa602;
  }

  .color5 {
    background: #f3c400;
  }

  .color6 {
    background: #ccb801;
  }

  .color7 {
    background: #c0cc02;
  }

  .color8 {
    background: #99cf00;
  }

  .color9 {
    background: #7fce00;
  }

  .color10 {
    background: #2fb300;
  }

  .color01 {
    background: #dadfe3;
  }

  .color43 {
    background: #bce897;
  }

  .color100 {
    background: #183b56;
  }
`;
