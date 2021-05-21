import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import Toolbar from "./Toolbar";
export default function SolveIssueEditor({ formik }) {
  const collaborateRoomReducer = useSelector(
    (state) => state.collaborateRoomReducer
  );
  const { collaborate_room } = collaborateRoomReducer;
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
  const solutionRef = useRef();
  const [firstLoad, setFirstLoad] = useState(true);
  const handleChangeSolution = (e) => {
    e.preventDefault();
    if (solutionRef.current?.innerText?.length > 2500) {
      solutionRef.current.innerHTML = formik.values?.solution;
    } else {
      formik.setFieldValue("solution", e.target.innerHTML);
    }
  };
  useEffect(() => {
    if (collaborate_room?.draft_solution) {
      if (firstLoad && solutionRef?.current) {
        solutionRef.current.innerHTML = collaborate_room?.draft_solution;
      }
      setFirstLoad(false);
    }
  }, [collaborate_room?.draft_solution]);

  return (
    <div>
      <Toolbar />
      <div className="relative">
        <span className="absolute right-1 bottom-1 text-xs text-gray-400 z-10 ">
          {solutionRef.current?.innerText?.length}/2500
        </span>

        <div
          className="editor text-gray-600 dark:text-white text-sm bg-gray-200 dark:bg-gray-900 p-3 rounded-b rounded-l pr-12 cursor-text"
          id="editor"
          onKeyDown={handleKeyDown}
          ref={solutionRef}
          onKeyUp={handleChangeSolution}
          contentEditable="true"
          data-placeholder="Solution"
          onPaste={(e) => paste(e)}
        ></div>
      </div>
    </div>
  );
}
