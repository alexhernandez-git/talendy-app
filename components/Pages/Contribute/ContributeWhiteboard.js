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

const ContributeWhiteboard = ({ socketRef }) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);

  const canvasRef = useRef();
  const [canvas, setCanvas] = useState();
  const [colors, setColors] = useState();
  const [context, setContext] = useState();
  const [firstLoad, setFirstLoad] = useState(true);
  const [drawing, setDrawing] = useState(false);
  const [current, setCurrent] = useState({ color: "black" });
  useEffect(() => {
    socketRef.current.on("drawing", onDrawingEvent);
    setCanvas(document.getElementById("whiteboard")[0]);
    console.log("set canvas", document.getElementById("whiteboard")[0]);
    setColors(document.getElementsByClassName("color"));
  }, []);
  useEffect(() => {
    console.log("canvas", canvas);
    console.log(canvas);
    if (canvas && firstLoad) {
      setContext(canvas.getContext("2d"));
      canvas.addEventListener("mousedown", onMouseDown, false);
      canvas.addEventListener("mouseup", onMouseUp, false);
      canvas.addEventListener("mouseout", onMouseUp, false);
      canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);

      //Touch support for mobile devices
      canvas.addEventListener("touchstart", onMouseDown, false);
      canvas.addEventListener("touchend", onMouseUp, false);
      canvas.addEventListener("touchcancel", onMouseUp, false);
      canvas.addEventListener("touchmove", throttle(onMouseMove, 10), false);
      setFirstLoad(false);
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener("mousedown", onMouseDown, false);
        canvas.removeEventListener("mouseup", onMouseUp, false);
        canvas.removeEventListener("mouseout", onMouseUp, false);
        canvas.removeEventListener(
          "mousemove",
          throttle(onMouseMove, 10),
          false
        );

        //Touch support for mobile devices
        canvas.removeEventListener("touchstart", onMouseDown, false);
        canvas.removeEventListener("touchend", onMouseUp, false);
        canvas.removeEventListener("touchcancel", onMouseUp, false);
        canvas.removeEventListener(
          "touchmove",
          throttle(onMouseMove, 10),
          false
        );
      }
    };
  }, [canvas]);
  useEffect(() => {
    console.log(colors);
    if (colors) {
      for (var i = 0; i < colors?.length; i++) {
        colors[i].addEventListener("click", onColorUpdate, false);
      }
    }
    return () => {
      for (var i = 0; i < colors?.length; i++) {
        colors[i].removeEventListener("click", onColorUpdate, false);
      }
    };
  }, [colors]);

  const onMouseDown = (e) => {
    console.log(e);
    setDrawing(true);
    setCurrent({
      ...current,
      x: e.clientX || e.touches[0].clientX,
      y: e.clientY || e.touches[0].clientY,
    });
  };

  const onMouseUp = (e) => {
    if (!drawing) {
      return;
    }
    setDrawing(false);
    drawLine(
      current.x,
      current.y,
      e.clientX || e.touches[0].clientX,
      e.clientY || e.touches[0].clientY,
      current.color,
      true
    );
  };

  const onMouseMove = (e) => {
    console.log("onmousemove", drawing);
    if (!drawing) {
      return;
    }
    console.log(e);
    drawLine(
      current.x,
      current.y,
      e.clientX || e.touches[0].clientX,
      e.clientY || e.touches[0].clientY,
      current.color,
      true
    );
    setCurrent({
      ...current,
      x: e.clientX || e.touches[0].clientX,
      y: e.clientY || e.touches[0].clientY,
    });
  };
  const onColorUpdate = (e) => {
    current.color = e.target.className.split(" ")[1];
  };

  // limit the number of events per second
  const throttle = (callback, delay) => {
    var previousCall = new Date().getTime();
    return function () {
      var time = new Date().getTime();

      if (time - previousCall >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  };
  const onDrawingEvent = (data) => {
    var w = canvas.width;
    var h = canvas.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  };
  const drawLine = (x0, y0, x1, y1, color, emit) => {
    console.log(x0, y0, x1, y1, color, emit);
    console.log(context);
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) {
      return;
    }
    var w = canvas.width;
    var h = canvas.height;

    socketRef.current.emit("drawing", {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color,
    });
  };

  // make the canvas fill its parent
  const onResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  return (
    <section aria-labelledby="notes-title" className="">
      <div className="w-full content-container bg-white">
        <canvas ref={canvasRef} className="bg-white"></canvas>

        <div class="colors">
          <div class="color black"></div>
          <div class="color red"></div>
          <div class="color green"></div>
          <div class="color blue"></div>
          <div class="color yellow"></div>
        </div>
      </div>
    </section>
  );
};

export default ContributeWhiteboard;
