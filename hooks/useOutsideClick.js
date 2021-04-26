const { useEffect } = require("react");

export default function useOutsideClick(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);

      document.addEventListener("mouseup", listener);
      document.addEventListener("touchstart", listener);
      document.addEventListener("touchend", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("mouseup", listener);
        document.removeEventListener("touchstart", listener);
        document.removeEventListener("touchend", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}
