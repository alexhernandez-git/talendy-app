import React from "react";
import Message from "components/Pages/ContributeRoom/Message";
import Editor from "components/Editor/Editor";
import { useSelector } from "react-redux";
import VisibilitySensor from "react-visibility-sensor";
import { useDispatch } from "react-redux";
import ContributeRoomChatEditor from "components/Editor/ContributeRoomChatEditor";

import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import useCanvas from "hooks/useCanvas";
const sizeOptions = [1, 2, 5, 10, 15, 20, 25, 30, 40, 50, 100];
const ContributeWhiteboard = ({ socketRef, roomID }) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);

  const [isDrawing, setIsDrawing] = useState(false);
  const [timeout, setTimeoutId] = useState(undefined);
  const [color, setColor] = useState("#000");
  const [size, setSize] = useState(5);
  const handleChangeColor = (e) => {
    setColor(e.target.value);
    var canvas = document.querySelector("#board");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = e.target.value;
  };
  const handleChangeSize = (e) => {
    setSize(e.target.value);
    var canvas = document.querySelector("#board");
    var ctx = canvas.getContext("2d");
    ctx.lineWidth = e.target.value;
  };
  useEffect(() => {
    socketRef.current.on("drawing", function (data) {
      var interval = setInterval(function () {
        if (isDrawing) return;
        setIsDrawing(true);
        clearInterval(interval);
        var image = new Image();
        var canvas = document.querySelector("#board");
        var ctx = canvas.getContext("2d");
        image.onload = function () {
          ctx.drawImage(image, 0, 0);

          setIsDrawing(false);
        };
        image.src = data;
      }, 200);
    });
  }, []);
  const canvasRef = useCanvas(([canvas, ctx]) => {
    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = size;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    canvas.addEventListener(
      "mousedown",
      function (e) {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );
    var onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (timeout != undefined) clearTimeout(timeout);
      const timeoutId = setTimeout(function () {
        var base64ImageData = canvas.toDataURL("image/png");
        socketRef.current.emit("drawing", {
          data: base64ImageData,
          roomID: roomID,
        });
      }, 1000);
      setTimeoutId(timeoutId);
    };
  });

  return (
    <section aria-labelledby="notes-title" className="">
      <div
        className="w-full content-container
      bg-gradient-to-r from-orange-500 to-pink-500 dark:bg-gray-700 shadow sm:rounded-lg pt-1
      "
      >
        <div className="flex justify-end">
          <input
            type="color"
            className="bg-gray-800 h-auto rounded-t cursor-pointer flex items-center text-white mr-1 text-xs"
            value={color}
            onChange={handleChangeColor}
          />

          <div>
            <select
              className="bg-gray-800 py-2  rounded-t cursor-pointer flex items-center text-white mr-1 text-xs"
              value={size}
              onChange={handleChangeSize}
            >
              {sizeOptions.map((sizeValue) => (
                <option value={sizeValue}>{sizeValue}</option>
              ))}
            </select>
          </div>
        </div>
        <div id="sketch" className="h-full">
          <canvas
            ref={canvasRef}
            id="board"
            className="bg-white rounded-b h-full"
          ></canvas>
        </div>
      </div>
    </section>
  );
};

export default ContributeWhiteboard;
