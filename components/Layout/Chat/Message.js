import React from "react";

const Message = () => {
  return (
    <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
      <div className="sm:flex sm:justify-between sm:items-baseline">
        <h3 className="text-base font-medium">
          <span className="text-gray-900">Joe Armstrong</span>
          <span className="text-gray-600">wrote</span>
        </h3>
        <p className="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
          <time dateTime="2021-01-27T16:09">Wednesday at 4:09pm</time>
        </p>
      </div>
      <div className="mt-4 space-y-6 text-sm text-gray-800">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at
          ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non
          fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet
          dui commodo.
        </p>
        <p>
          Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae
          vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor
          neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet
          venenatis condimentum. Convallis accumsan et nunc eleifend.
        </p>
        <p>– Joe</p>
      </div>
    </li>
  );
};

export default Message;
