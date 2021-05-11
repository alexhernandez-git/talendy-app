import React, { useEffect, useRef, useState } from "react";
import SharedToolbar from "components/Editor/SharedToolbar";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { updateSharedNotes } from "redux/actions/contributeRoom";
import { useDispatch } from "react-redux";

export default function ContributeSharedNotes({
  socketRef,
  roomID,
  sharedNotes,
  editorTextLength,
  editorText,
  onKeyUpCounter,
  setEditorTextLength,
  setEditorText,
  setOnkeyUpCounter,
  sharedNotesRef,
}) {
  const authReducer = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

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
    if (e.ctrlKey && e.keyCode === 13) {
      alert("Submit");
      e.preventDefault();
      return false;
    }
  };

  const handleOnKeyUp = () => {
    setOnkeyUpCounter(!onKeyUpCounter);
    var target = document.querySelector("#editor");
    if (target.innerText.length <= 2500) {
      setEditorTextLength(target.innerText.length);
      setEditorText(target.innerHTML);
    } else {
      target.innerText = target.innerText.slice(0, 2500);
      setEndOfContenteditable(target);
      setEditorText(target.innerText);
    }
  };

  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      sharedNotesRef.current.innerHTML = sharedNotes;
      setEditorTextLength(sharedNotesRef.current.innerText.length);
      setFirstLoad(false);
    }
  }, [sharedNotes]);
  return (
    <section aria-labelledby="notes-title" className="">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 dark:bg-gray-700 shadow sm:rounded-lg p-1">
        <SharedToolbar editorTextLength={editorTextLength} />
        <div
          className="editor text-gray-600 dark:text-white text-sm bg-gray-200 dark:bg-gray-900 p-3 rounded-b rounded-l cursor-text"
          id="editor"
          onKeyUp={handleOnKeyUp}
          ref={sharedNotesRef}
          onKeyDown={handleKeyDown}
          contentEditable="true"
          data-placeholder="Notes"
          onPaste={(e) => paste(e)}
          style={{ minHeight: "40rem" }}
        ></div>
      </div>
    </section>
  );
}
