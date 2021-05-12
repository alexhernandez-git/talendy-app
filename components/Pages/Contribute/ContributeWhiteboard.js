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
const ContributeWhiteboard = ({ socketRef }) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const canvasRef = useCanvas(([canvas, ctx]) => {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var colors = document.getElementsByClassName("color");
    var ctx = canvas.getContext("2d");

    var current = {
      color: "black",
    };
    var drawing = false;

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mouseout", onMouseUp, false);
    canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);

    //Touch support for mobile devices
    canvas.addEventListener("touchstart", onMouseDown, false);
    canvas.addEventListener("touchend", onMouseUp, false);
    canvas.addEventListener("touchcancel", onMouseUp, false);
    canvas.addEventListener("touchmove", throttle(onMouseMove, 10), false);

    for (var i = 0; i < colors.length; i++) {
      colors[i].addEventListener("click", onColorUpdate, false);
    }

    socketRef.current.on("drawing", onDrawingEvent);

    window.addEventListener("resize", onResize, false);
    onResize();

    function drawLine(x0, y0, x1, y1, color, emit) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();

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
    }

    function onMouseDown(e) {
      drawing = true;
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    }

    function onMouseUp(e) {
      if (!drawing) {
        return;
      }
      drawing = false;
      drawLine(
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        current.color,
        true
      );
    }

    function onMouseMove(e) {
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
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    }

    function onColorUpdate(e) {
      current.color = e.target.className.split(" ")[1];
    }

    // limit the number of events per second
    function throttle(callback, delay) {
      var previousCall = new Date().getTime();
      return function () {
        var time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    }

    function onDrawingEvent(data) {
      var w = canvas.width;
      var h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }

    // make the canvas fill its parent
    function onResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });

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
