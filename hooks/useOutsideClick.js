import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("mouseup", handleClick);

    return () => {
      document.removeEventListener("mouseup", handleClick);
      document.removeEventListener("mousedown", handleClick);
    };
  });
};

export default useOutsideClick;
