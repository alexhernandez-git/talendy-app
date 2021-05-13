import React, { useEffect, useRef, useState } from "react";
import SharedToolbar from "components/Editor/SharedToolbar";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { updateSharedNotes } from "redux/actions/contributeRoom";
import { useDispatch } from "react-redux";
import { setEndOfContenteditable } from "helpers";

export default function ContributeScreenSharing({ socketRef, roomID }) {
  const authReducer = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  return <section aria-labelledby="notes-title" className=""></section>;
}
