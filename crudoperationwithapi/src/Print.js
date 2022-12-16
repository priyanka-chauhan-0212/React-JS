import Datatable from "./Datatable";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
// import ReactDOM from "react-dom";

const Print = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button
        type="button"
        className='btn-outline-secondary'
        onClick={handlePrint}
      >
        Print
      </button>

      <Datatable ref={componentRef} />
    </div>
  );
};

export default Print;

