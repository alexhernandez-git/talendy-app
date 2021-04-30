import React from "react";
import { useRef } from "react";
import Toolbar from "./Toolbar";
export default function CreateEditPostEditor({
  solveIssueForm,
  handleChangeTitle,
  handleChangeText,
}) {
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
    if (titleRef.current?.innerText.length >= 300 && e.keyCode !== 8) {
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
  const titleRef = useRef();

  return (
    <div>
      <div className="relative">
        <span className="absolute right-1 bottom-1 text-xs text-gray-400 z-10 ">
          {titleRef.current && titleRef.current.innerText.length}/300
        </span>

        <div
          id="editor-title"
          contentEditable="true"
          data-placeholder="Title"
          ref={titleRef}
          onKeyDown={handleTitleKeyDown}
          onKeyUp={handleChangeTitle}
          className="title my-4 text-gray-600 dark:text-white text-xl bg-gray-200 dark:bg-gray-900 p-3 pr-12 rounded cursor-text relative"
        ></div>
      </div>
      <>
        <Toolbar />

        <div
          className="editor text-gray-600 dark:text-white text-sm bg-gray-200 dark:bg-gray-900 p-3 rounded-b rounded-l cursor-text"
          id="editor"
          onKeyDown={handleKeyDown}
          onKeyUp={handleChangeText}
          contentEditable="true"
          data-placeholder="Text (optional)"
          onPaste={(e) => paste(e)}
        ></div>
      </>
    </div>
  );
}
