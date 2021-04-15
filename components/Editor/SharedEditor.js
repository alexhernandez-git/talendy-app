import React, { useEffect, useRef } from "react";
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
  useEffect(() => {
    var target = document.querySelector("#editor");

    const socket = io("ws://127.0.0.1:8080");
    const handleTextChange = () => {
      var data = {
        text: target.innerHTML,
      };
      console.log(data);
      socket.emit("text", data);
    };

    const handleRecievedText = (data) => {
      console.log("data revieved", data);
      text.text = data.text;
      target.innerHTML = data.text;
    };

    socket.on("text", handleRecievedText);
    socket.on("newUser", handleRecievedText);

    target.addEventListener("DOMSubtreeModified", handleTextChange);
    return () => {
      target.removeEventListener("DOMSubtreeModified", handleTextChange);
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <SharedToolbar />
      <div
        className="editor text-gray-600 dark:text-white text-sm bg-gray-200 dark:bg-gray-900 p-3 rounded-b rounded-l cursor-text"
        id="editor"
        onKeyDown={handleKeyDown}
        onChange={(e) => console.log(e.target)}
        contentEditable="true"
        data-placeholder="Notes"
        onPaste={(e) => paste(e)}
        style={{ minHeight: "50rem" }}
      ></div>
    </>
  );
}
