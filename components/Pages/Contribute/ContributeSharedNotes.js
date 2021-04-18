import React, { useEffect, useRef, useState } from "react";
import SharedToolbar from "components/Editor/SharedToolbar";
import { io } from "socket.io-client";

export default function ContributeSharedNotes({ socketRef, roomID }) {
  function setEndOfContenteditable(contentEditableElement) {
    var range, selection;
    if (document.createRange) {
      //Firefox, Chrome, Opera, Safari, IE 9+
      range = document.createRange(); //Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection(); //get the selection object (allows you to change selection)
      selection.removeAllRanges(); //remove any selections already made
      selection.addRange(range); //make the range you have just created the visible selection
    } else if (document.selection) {
      //IE 8 and lower
      range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
      range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      range.select(); //Select the range (make it the visible selection
    }
  }
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

  const [editorTextLength, setEditorTextLength] = useState(0);
  const [editorText, setEditorText] = useState(false);
  useEffect(() => {
    var target = document.querySelector("#editor");

    const handleRecievedText = (data) => {
      console.log("data recieved", data);
      if (data) {
        target.innerHTML = data;
        setEndOfContenteditable(target);

        setEditorText(target.innerHTML);
      }
      setEditorTextLength(target.innerText.length);
    };
    socketRef.current.on("text", handleRecievedText);

    return () => {};
  }, []);

  const [onKeyUpCounter, setOnkeyUpCounter] = useState(false);
  const handleOnKeyUp = () => {
    setOnkeyUpCounter(!onKeyUpCounter);
    var target = document.querySelector("#editor");
    console.log(editorTextLength);
    if (target.innerText.length <= 2500) {
      setEditorTextLength(target.innerText.length);
      setEditorText(target.innerHTML);
    } else {
      target.innerText = target.innerText.slice(0, 2500);
      setEndOfContenteditable(target);
      setEditorText(target.innerText);
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const payload = { text: editorText, roomID: roomID };
      console.log(payload);
      socketRef.current.emit("text", payload);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [onKeyUpCounter]);

  return (
    <section aria-labelledby="notes-title" className="">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 dark:bg-gray-700 shadow sm:rounded-lg p-1">
        <SharedToolbar editorTextLength={editorTextLength} />
        <div
          className="editor text-gray-600 dark:text-white text-sm bg-gray-200 dark:bg-gray-900 p-3 rounded-b rounded-l cursor-text"
          id="editor"
          onKeyUp={handleOnKeyUp}
          onKeyDown={handleKeyDown}
          onFocus={(e) => console.log(e.target.selectionStart)}
          onChange={(e) => console.log(e.target)}
          contentEditable="true"
          data-placeholder="Notes"
          onPaste={(e) => paste(e)}
          style={{ minHeight: "40rem" }}
        ></div>
      </div>
    </section>
  );
}
