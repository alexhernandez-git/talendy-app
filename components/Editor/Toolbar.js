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
      target?.focusNode?.className?.includes("codeBlock")
    ) {
      return;
    }
    const id = `codeBlock-${
      document.getElementsByClassName("codeBlock").length + 1
    }`;
    codeBlock.classList.add("codeBlock");

    format("insertHTML", `<pre class='codeBlock' id='${id}'>${target}</pre>`);
    addLineAfterBlock(id);
  }

  return (
    <div className="flex justify-end">
      <button
        className="bg-gray-800 p-2 rounded cursor-pointer"
        onClick={(e) => addCodeBlock()}
      >
        <IconContext.Provider value={{ size: 18, className: "text-white" }}>
          <MdCode />
        </IconContext.Provider>
      </button>
    </div>
  );
}
