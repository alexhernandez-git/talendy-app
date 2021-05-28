import React, { useEffect, useRef, useState } from "react";
import SharedToolbar from "components/Editor/SharedToolbar";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { updateSharedNotes } from "redux/actions/collaborateRoom";
import { useDispatch } from "react-redux";
import { setEndOfContenteditable } from "helpers";

export default function ContributeScreenSharing({
  socketRef,
  roomID,
  shareScreenVideoRef,
}) {
  const authReducer = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  console.log(shareScreenVideoRef);
  return (
    <section aria-labelledby="notes-title" className="">
      <video ref={shareScreenVideoRef} className="w-full h-full" controls />
      <div className="mt-4 flex justify-center">
        <span className="text-sm text-red-500 dark:text-red-500 p-3 border border-red-500 rounded-xl">
          This feature is not ready at the moment, you are not sharing the
          content
        </span>
      </div>
    </section>
  );
}
