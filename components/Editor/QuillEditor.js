import React, { useEffect, useRef, useState } from "react";

const Quill = typeof window === "object" ? require("quill") : () => false;
import { io } from "socket.io-client";

// Registering the rich text type to make sharedb work
// with our quill editor

const QuillEditor = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    socketRef.current.on("connect", () => {
      console.log("connected!!!!!!!!!!");
    });
    socketRef.current.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ];
    const options = {
      theme: "bubble",
      modules: {
        toolbar: toolbarOptions,
      },
    };
    let quill = new Quill("#quill-editor", options);
    /**
     * On Initialising if data is present in server
     * Updaing its content to editor
     */

    /**
     * On Text change publishing to our server
     * so that it can be broadcasted to all other clients
     */
    quill.on("text-change", function (delta, oldDelta, source) {
      if (source !== "user") return;
      socketRef.current.emit("text", { delta: delta, source: source });
    });
    quill.on("selection-change", (range) => {
      if (range) {
        quill.theme.tooltip.show();
        quill.theme.tooltip.position(quill.getBounds(range));
      }
      /** listening to changes in the document
       * that is coming from our server
       */
      const handleRecievedText = (data) => {
        console.log("data recieved", data.text.delta.ops);

        quill.updateContents(data.text.delta.ops);
      };
      socketRef.current.on("text", handleRecievedText);
      socketRef.current.on("newUser", handleRecievedText);
    });
    return () => {
      socketRef.current.close();
    };
  }, []);
  return (
    <div
      id="quill-editor"
      className="bg-white p-1 sm:rounded-lg"
      style={{ minHeight: "50rem" }}
    ></div>
  );
};

export default QuillEditor;
