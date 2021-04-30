import React from "react";
import Toolbar from "./Toolbar";
export default function Editor({ chat, solveIssueForm }) {
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
  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      return false;
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      document.execCommand("insertText", false, "\t");
      e.preventDefault();
      return false;
    }
    if (e.ctrlKey && e.keyCode === 13) {
      alert("Submit");
      e.preventDefault();
      return false;
    }
  };

  return (
    <div>
      {chat && (
        <>
          <Toolbar />
          <div
            className="editor text-gray-600 dark:text-white text-sm bg-gray-200 dark:bg-gray-900 p-3 rounded-b rounded-l cursor-text"
            id="editor"
            onKeyDown={handleKeyDown}
            contentEditable="true"
            data-placeholder="Message"
            onPaste={(e) => paste(e)}
          ></div>
        </>
      )}
      {solveIssueForm && (
        <>
          <Toolbar />
          <div
            className="editor text-gray-600 dark:text-white text-sm bg-gray-200 dark:bg-gray-900 p-3 rounded-b rounded-l cursor-text"
            id="editor"
            onKeyDown={handleKeyDown}
            contentEditable="true"
            data-placeholder="Solution"
            onPaste={(e) => paste(e)}
          ></div>
        </>
      )}
    </div>
  );
}
