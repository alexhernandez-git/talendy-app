import React, { useEffect, useRef, useState } from "react";
import SharedToolbar from "./SharedToolbar";
import { io } from "socket.io-client";
export default function SharedEditor({ chat, postForm, solveIssueForm }) {
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

  var text = {
    text: "",
  };
  const socketRef = useRef(null);
  const [editorTextLength, setEditorTextLength] = useState(false);
  const [editorText, setEditorText] = useState(false);
  useEffect(() => {
    var target = document.querySelector("#editor");

    socketRef.current = io("http://localhost:5000");
    socketRef.current.on("connect", () => {
      console.log("connected!!!!!!!!!!");
    });
    socketRef.current.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    console.log(socketRef.current);

    const handleRecievedText = (data) => {
      console.log("data recieved", data);
      text.text = data.text;

      target.innerHTML = text.text;
      setEditorTextLength(target.innerText.length);
      setEditorText(target.innerHTML);
    };
    socketRef.current.on("message", (msg) => console.log("msg", msg));
    socketRef.current.on("text", handleRecievedText);
    socketRef.current.on("newUser", handleRecievedText);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleOnKeyUp = () => {
    var target = document.querySelector("#editor");
    console.log(editorTextLength);
    if (target.innerText.length <= 2500) {
      setEditorTextLength(target.innerText.length);
      setEditorText(target.innerHTML);
    } else {
      target.innerText = target.innerText.slice(-2500);
      setEditorText(target.innerText);
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      socketRef.current.emit("text", editorText);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [editorText]);

  return (
    <>
      <SharedToolbar editorTextLength={editorTextLength} />
      <div
        className="editor text-gray-600 dark:text-white text-sm bg-gray-200 dark:bg-gray-900 p-3 rounded-b rounded-l cursor-text"
        id="editor"
        onKeyUp={handleOnKeyUp}
        onKeyDown={handleKeyDown}
        onChange={(e) => console.log(e.target)}
        contentEditable="true"
        data-placeholder="Notes"
        onPaste={(e) => paste(e)}
        style={{ minHeight: "40rem" }}
      ></div>
    </>
  );
}
