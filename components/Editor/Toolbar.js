import React from "react";
import { IconContext } from "react-icons/lib";
import { MdCode } from "react-icons/md";
export default function Toolbar() {
  function format(com, val) {
    document.execCommand(com, false, val);
  }

  function addLineAfterBlock(id) {
    const block = document.getElementById(`${id}`);
    const div = document.createElement("div");
    const br = document.createElement("br");
    div.appendChild(br);

    if (!block) {
      return;
    } else {
      block.after(div);
    }
  }
  function addCodeBlock() {
    const codeBlock = document.createElement("pre");
    const target = document.getSelection();
    if (
      target?.focusNode?.nodeName?.includes("#text") ||
      target?.focusNode?.classList?.contains("title") ||
      target?.focusNode?.className?.includes("codeBlock")
    ) {
      return;
    }
    const id = `codeBlock-${
      document.getElementsByClassName("codeBlock").length + 1
    }`;
    codeBlock.classList.add("codeBlock");

    format(
      "insertHTML",
      `<pre class='codeBlock whitespace-pre-line' id='${id}'>${target}</pre>`
    );
    addLineAfterBlock(id);
  }

  return (
    <div className="flex justify-end rounded-t">
      <button
        type="button"
        className="bg-gray-800 py-2 px-3 rounded-t cursor-pointer flex items-center"
        onClick={(e) => addCodeBlock()}
      >
        <IconContext.Provider
          value={{ size: 18, className: "text-white mr-1" }}
        >
          <MdCode />
        </IconContext.Provider>
        <span className="text-white text-xs">Inline code</span>
      </button>
    </div>
  );
}
