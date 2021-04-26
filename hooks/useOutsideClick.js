import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("onclick", handleClick);

    return () => {
      document.removeEventListener("onclick", handleClick);
    };
  });
};

export default useOutsideClick;
