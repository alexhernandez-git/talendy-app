import React from "react";
import Toolbar from "./Toolbar";
export default function Editor() {
  function paste(e) {
    e.preventDefault();
    const open = new RegExp("<", "gi");
    const close = new RegExp(">", "gi");
    const text = (e.originalEvent || e).clipboardData
      .getData("text/plain")
      .replace(open, "&lt")
      .replace(close, "&gt");
    document.execCommand("insertHTML", false, text);
  }
  const handleKeyDown = (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      document.execCommand("insertText", false, "\t");
      e.preventDefault();
      return false;
    }
    console.log(e.key);
    if (e.ctrlKey && e.keyCode === 13) {
      alert("Submit");
      e.preventDefault();
      return false;
    }
  };

  return (
    <div>
      <Toolbar />

      <div
        className="editor mt-4 text-gray-600 dark:text-white text-sm bg-gray-200 dark:bg-gray-900 p-3 rounded"
        id="editor"
        onKeyDown={(e) => handleKeyDown(e)}
        contentEditable="true"
        data-placeholder="Message"
        onPaste={(e) => paste(e)}
      ></div>
    </div>
  );
}
