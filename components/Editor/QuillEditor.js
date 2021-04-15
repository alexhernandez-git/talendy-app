import React, { useEffect, useState } from "react";

const Quill = typeof window === "object" ? require("quill") : () => false;

const QuillEditor = () => {
  useEffect(() => {
    if (process.browser) {
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
      quill.on("selection-change", (range) => {
        if (range) {
          quill.theme.tooltip.show();
          quill.theme.tooltip.position(quill.getBounds(range));
        }
      });
    }
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
