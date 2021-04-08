import React from "react";

const Spinner = () => {
  return (
    <div>
      <style css>
        {`
          .loader {
            border-top-color: #3498db;
            -webkit-animation: spinner 1.5s linear infinite;
            animation: spinner 1.5s linear infinite;
          }

          @-webkit-keyframes spinner {
            0% {
              -webkit-transform: rotate(0deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
            }
          }

          @keyframes spinner {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
    </div>
  );
};

export default Spinner;
