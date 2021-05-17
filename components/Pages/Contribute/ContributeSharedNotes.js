import React, { useEffect, useRef, useState } from "react";
import SharedToolbar from "components/Editor/SharedToolbar";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { updateSharedNotes } from "redux/actions/contributeRoom";
import { useDispatch } from "react-redux";
import { setEndOfContenteditable } from "helpers";

export default function ContributeSharedNotes({
  socketRef,
  roomID,
  sharedNotes,
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

  const [firstLoad, setFirstLoad] = useState(true);

  const [editorTextLength, setEditorTextLength] = useState(0);
  const [editorText, setEditorText] = useState(false);
  const [onKeyUpCounter, setOnkeyUpCounter] = useState(false);
  const sharedNotesRef = useRef();

  const handleOnKeyUp = () => {
    setOnkeyUpCounter(!onKeyUpCounter);

    console.log("entra");
    function lengthInUtf8Bytes(str) {
      // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
      var m = encodeURIComponent(str).match(/%[89ABab]/g);
      return str.length + (m ? m.length : 0);
    }
    const textBytes = lengthInUtf8Bytes(sharedNotesRef.current.innerHTML);
    if (textBytes < 20000) {
      console.log(sharedNotesRef.current.innerHTML);
      setEditorTextLength(sharedNotesRef.current.innerText.length);
      setEditorText(sharedNotesRef.current.innerHTML);
    } else {
      sharedNotesRef.current.innerHTML = editorText;
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (editorText || editorText === "") {
        const payload = {
          token: authReducer?.access_token,
          text: editorText,
          roomID: roomID,
        };
        dispatch(updateSharedNotes(editorText));
        console.log("editor text", editorText);
        socketRef.current.emit("text", payload);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [onKeyUpCounter]);
  useEffect(() => {
    if (socketRef?.current) {
      const handleRecievedText = (data) => {
        console.log("data recieved", data);

        if (data) {
          if (sharedNotesRef.current) {
            sharedNotesRef.current.innerHTML = data;
            setEndOfContenteditable(sharedNotesRef.current);
            setEditorTextLength(sharedNotesRef.current.innerText.length);
            setEditorText(sharedNotesRef.current.innerHTML);
          }

          dispatch(updateSharedNotes(data));
        }
      };
      socketRef.current.on("text", handleRecievedText);
    }
  }, [socketRef?.current]);
  useEffect(() => {
    if (firstLoad) {
      if (sharedNotes) {
        sharedNotesRef.current.innerHTML = sharedNotes;
        setEditorTextLength(sharedNotesRef.current.innerText.length);
      }
      setFirstLoad(false);
    }
  }, [sharedNotes]);

  return (
    <section aria-labelledby="notes-title" className="">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 dark:bg-gray-700 shadow sm:rounded-lg p-1">
        <SharedToolbar editorTextLength={editorTextLength} />

        <div
          className="editor text-gray-600 dark:text-white text-sm bg-gray-200 dark:bg-gray-900 p-3 rounded-b rounded-l cursor-text"
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
