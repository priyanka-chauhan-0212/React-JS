import styled from 'styled-components';

import Colors from '../../container/design/Colors';

export const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
  max-width:100% !important;


    .table {
    tr {
      th,
      td {
        @media (min-width: 320px) and (max-width: 991px) {
          min-width: 200px;
        }
      }
    }
  }

  .table {
    margin-bottom: 0;
  }

  thead tr th {
    padding: 1.05rem 0.75rem;
    border-bottom: none;
    font-size: 16px;
    font-weight: 600;
    color: #183b56;
    white-space: nowrap;

    @media (min-width: 320px) and (max-width: 767px) {
      font-size: 14px;
    }
  }

  td {
    font-size: 14px;
    color: #183b56;

    @media (min-width: 320px) and (max-width: 767px) {
      font-size: 12px;
    }
  }

  .th {
    display: flex;
    align-items: center;
    cursor: pointer;

    .fa-caret-down {
      margin-left: 10px;
    }
  }

   .date {
    width: 12%;

    @media (min-width: 767px) and (max-width: 1200px) {
      width: 12%;
    }
  }

  @media print {
   body {
      -webkit-print-color-adjust: exact;
   }
}

  // button {
  //   background-color: #bce897;
  //   color: #5f7948;
  //   font-size: 14px;
  //   height: 45px;
  //   width: 100px;
  //   border-radius: 8px !important;
  //   border: none;

  //   font-weight: 700 !important;

  //   :hover,
  //   :active,
  //   :focus,
  //   :focus-visible {
  //     background-color: #bce897 !important;
  //     color: #5f7948 !important;
  //     outline: none !important;
  //     box-shadow: none !important;
  //   }

  //   @media (min-width: 320px) and (max-width: 767px) {
  //     // margin-top: 15px;
  //   }
  // }

    .back-img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

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

  .table-title {
    padding: 20px 25px;
    font-size: 14px;
    font-weight: 600;
    color: #183b56;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: 320px) and (max-width: 767px) {
      flex-direction: column;
    }
  }

  .table {
    tr {
      th,
      td {
        @media (min-width: 320px) and (max-width: 991px) {
          min-width: 200px;
        }
      }
    }
  }

  .table {
    margin-bottom: 0;
  }

  thead tr th {
    padding: 1.05rem 0.75rem;
    border-bottom: none;
    font-size: 16px;
    font-weight: 600;
    color: #183b56;
    white-space: nowrap;

    @media (min-width: 320px) and (max-width: 767px) {
      font-size: 14px;
    }
  }

  td {
    font-size: 14px;
    color: #183b56;

    @media (min-width: 320px) and (max-width: 767px) {
      font-size: 12px;
    }
  }

  .wrapper {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 60px #00000012;
    border-radius: 8px;
  }

  .date {
    padding-left: 25px;
    width: 12%;

    @media (min-width: 767px) and (max-width: 1200px) {
      width: 15%;
    }
  }

  .score {
    width: 10%;
    text-align: center;
  }

  .url {
    width: 40%;
  }

  a {
    color: ${ Colors.WebsiteLink };
    cursor: pointer;
  }

  .message {
    width: 40%;
  }

  .filter {
    font-size: 10px;
    background-color: #f1f4ff;
    border: 1px solid #6b7dc0;
    color: #6b7dc0;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;

    @media (min-width: 320px) and (max-width: 767px) {
      margin-top: 15px;
    }

    .fa-calendar-alt {
      margin-right: 8px;
      font-size: 14px;
    }
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #183b56;
    font-size: 12px;
    padding: 20px 15px;

    div {
      padding: 0 10px;
    }
  }

  .next,
  .previous {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .hide {
    visibility: hidden;
  }

  .dropdown-divider {
    margin: 0rem 0;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  opacity: ${ props => props.opacity || 1 };

  @media (min-width: 320px) and (max-width: 991px) {
    display: block;
    width: 100%;
    overflow-x: auto;
  }
`;

export const NoData = styled.div`
  text-align: center;
  padding-bottom: 20px;
`;
