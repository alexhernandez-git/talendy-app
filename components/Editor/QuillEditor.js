import React, { useEffect, useState } from "react";

const Quill = typeof window === "object" ? require("quill") : () => false;
import Sharedb from "sharedb/lib/client";
import richText from "rich-text";

// Registering the rich text type to make sharedb work
// with our quill editor
Sharedb.types.register(richText.type);

// Connecting to our socket server
const socket = new WebSocket("ws://127.0.0.1:8080");
const connection = new Sharedb.Connection(socket);

// Querying for our document
const doc = connection.get("documents", "firstDocument");

const QuillEditor = () => {
  useEffect(() => {
    doc.subscribe(function (err) {
      if (err) throw err;

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
      quill.setContents(doc.data);

      /**
       * On Text change publishing to our server
       * so that it can be broadcasted to all other clients
       */
      quill.on("text-change", function (delta, oldDelta, source) {
        if (source !== "user") return;
        doc.submitOp(delta, { source: quill });
      });
      quill.on("selection-change", (range) => {
        if (range) {
          quill.theme.tooltip.show();
          quill.theme.tooltip.position(quill.getBounds(range));
        }
      /** listening to changes in the document
       * that is coming from our server
       */
      doc.on("op", function (op, source) {
        if (source === quill) return;
        quill.updateContents(op);
      });
    });
    return () => {
      connection.close();
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
