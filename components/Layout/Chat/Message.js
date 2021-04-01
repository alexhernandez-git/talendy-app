import React from "react";

const Message = ({ myMessage }) => {
  return (
    <div
      className={`${
        myMessage ? "float-right" : "float-left"
      } bg-white dark:bg-gray-700 p-3 shadow sm:rounded-lg mt-2 w-11/12`}
    >
      <div className="text-md text-gray-800 dark:text-gray-100">
        <p>
          Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae
          vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor
          neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet
          venenatis condimentum. Convallis accumsan et nunc eleifend.
        </p>
      </div>
    </div>
  );
};

export default Message;
