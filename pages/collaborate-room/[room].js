import React, { useEffect, useRef, useState } from "react";
import useOutsideClick from "hooks/useOutsideClick";
import PostModal from "components/Layout/PostModal";
import Layout from "components/Layout/Layout";
import { CONTRIBUTE_PAGE } from "pages";
import { IconContext } from "react-icons";
import {
  MdHeadset,
  MdMic,
  MdScreenShare,
  MdMicOff,
  MdFiberManualRecord,
} from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import Member from "components/Pages/ContributeRoom/Member";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import ContributeChat from "components/Pages/Contribute/ContributeChat";
import ContributeSharedNotes from "components/Pages/Contribute/ContributeSharedNotes";
import ContributeAsteroids from "components/Pages/Contribute/ContributeAsteroids";
import { FaDeaf } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAlert } from "redux/actions/alerts";
import useAuthRequired from "hooks/useAuthRequired";
import {
  fetchContributeRoom,
  resetContributeRoom,
  stopCollaborating,
  updateSharedNotes,
} from "redux/actions/collaborateRoom";
import Spinner from "components/Layout/Spinner";
import moment from "moment";
import { addRoomMessage, fetchRoomMessages } from "redux/actions/roomMessages";
import { setEndOfContenteditable } from "helpers";
import ContributeWhiteboard from "components/Pages/Contribute/ContributeWhiteboard";
import ContributeScreenSharing from "components/Pages/Contribute/ContributeScreenSharing";
import Finalize from "components/Pages/ContributeRoom/Finalize";
import ContributeKanbanBoard from "components/Pages/Contribute/ContributeKanbanBoard";
const Audio = (props) => {
  const ref = useRef();
  useEffect(() => {
    if (props.isDeafen) {
      ref.current.muted = true;
    } else {
      ref.current.muted = false;
    }
  }, [props.isDeafen]);
  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <audio playsInline autoPlay ref={ref} />;
};

const Contribute = () => {
  const page = CONTRIBUTE_PAGE;
  const router = useRouter();
  const dispatch = useDispatch();
  const [canRender, authReducer, initialDataFetched] = useAuthRequired(page);
  useEffect(() => {
    const fetchInitialData = async () => {
      if (initialDataFetched) {
        await dispatch(fetchContributeRoom(router.query?.room));
        await dispatch(fetchRoomMessages(router.query?.room));
      }
    };

    fetchInitialData();
  }, [initialDataFetched, router.query?.room]);
  const collaborateRoomReducer = useSelector(
    (state) => state.collaborateRoomReducer
  );
  const { collaborate_room, is_loading } = collaborateRoomReducer;
  const [roomID, setRoomID] = useState(router.query?.room);
  const [validationsMade, setValidationsMade] = useState(false);

  useEffect(() => {
    if (
      initialDataFetched &&
      !is_loading &&
      collaborate_room &&
      !collaborate_room?.members?.some(
        (member) => member.user.id === authReducer.user?.id
      )
    ) {
      router.push(authReducer.is_authenticated ? "/feed" : "/");
      dispatch(
        createAlert("ERROR", "You are not member of this collaborate_room")
      );
    } else {
      if (initialDataFetched && !is_loading) {
        setRoomID(router.query?.room);
        setValidationsMade(true);
      }
    }
  }, [is_loading]);
  // Webrtc
  const [peers, setPeers] = useState([]);
  const myStreamRef = useRef();
  const myScreenSharingStreamRef = useRef();
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const [isMicOn, setIsMicOn] = useState(false);
  const [joinedMembersList, setJoinedMembersList] = useState([]);

  const handleToggleMic = () => {
    if (myStreamRef.current?.getAudioTracks()) {
      if (!isMicOn) {
        setDeafen(false);
      }
      setIsMicOn(!isMicOn);
      myStreamRef.current.getAudioTracks()[0].enabled = !isMicOn;
    }
  };
  const [isDeafen, setDeafen] = useState(false);
  const handleToggleDeafen = () => {
    if (myStreamRef.current?.getAudioTracks()) {
      setDeafen(!isDeafen);
      if (!isDeafen) {
        setIsMicOn(false);
        myStreamRef.current.getAudioTracks()[0].enabled = false;
      }
    }
  };

  const handleAddMessage = async (payload) => {
    await dispatch(addRoomMessage(payload.message));
  };

  const [message, setMessage] = useState("");
  const handleChangeMessage = (e) => {
    e.preventDefault();
    setMessage(e.target.innerHTML);
  };
  const handleSendMessage = (e = null) => {
    if (e) {
      e.preventDefault();
    }
    if (!message || message.trim().length === 0) {
      return;
    }
    const payload = {
      roomID: router.query?.room,
      token: authReducer?.access_token,
      message: {
        text: message,
        sent_by: authReducer.user,
        files: [],
        created: Date.now(),
      },
    };
    handleAddMessage(payload);

    socketRef.current.emit("message", payload);
    setMessage("");
  };

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  useEffect(() => {
    if (initialDataFetched && validationsMade) {
      socketRef.current = io.connect(process.env.COLLABORATE_ROOM_WS);
      socketRef.current.on("connect", () => {
        console.log("connected layout!!!!!!!!!!");
      });
      socketRef.current.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

      socketRef.current.emit("join room", {
        roomID: roomID,
        userID: authReducer.user?.id,
      });

      socketRef.current.on("joined members", (joinedMembers) => {
        setJoinedMembersList(joinedMembers);
      });
      socketRef.current.on("user left", (socketID) => {});
      socketRef.current.on("members left", (membersLeft) => {
        setJoinedMembersList(membersLeft);
      });

      socketRef.current.on("no user id", () => {
        dispatch(createAlert("ERROR", "There is not user id"));
        router.push("/feed");
      });

      socketRef.current.on("message", (payload) => {
        handleAddMessage(payload);
      });

      function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream,
        });

        peer.on("signal", (signal) => {
          console.log("enter on returning signal");
          socketRef.current.emit("returning signal", { signal, callerID });
        });

        peer.signal(incomingSignal);

        return peer;
      }
      socketRef.current.on("receiving returned signal", (payload) => {
        console.log("enter on receiving returen");
        const item = peersRef.current.find((p) => p.peerID === payload.id);
        item?.peer.signal(payload.signal);
      });
      navigator.mediaDevices
        .getUserMedia({
          video: false,
          audio: { echoCancellation: true, noiseSuppression: true },
        })
        .then(async (stream) => {
          myStreamRef.current = stream;
          stream.getAudioTracks()[0].enabled = isMicOn;
          socketRef.current.emit("media ready", roomID);

          socketRef.current.on("all users", (users) => {
            console.log("enter on all users");
            const peers = [];
            users.forEach((user) => {
              const peer = createPeer(
                user.socketID,
                socketRef.current.id,
                stream
              );
              peersRef.current.push({
                peerID: user.socketID,
                peer,
              });
              peers.push(peer);
            });
            setPeers(peers);
          });

          socketRef.current.on("user joined", (payload) => {
            console.log("enter on user joined");
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });

            setPeers((users) => [...users, peer]);
          });
        });
    }
  }, [initialDataFetched, validationsMade]);

  useEffect(() => {
    return () => {
      dispatch(resetContributeRoom());
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (myStreamRef.current) {
        myStreamRef.current.getTracks().forEach(function (track) {
          track.stop();
        });
        myStreamRef.current.getAudioTracks().forEach(function (track) {
          track.stop();
        });
      }
    };
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleToggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const modalRef = useRef();
  useOutsideClick(modalRef, () => handleCloseModal());
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modalOpen]);
  const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);
  const handleOpenMoreOptions = () => {
    setMoreOptionsOpen(true);
  };
  const handleCloseMoreOptions = () => {
    if (moreOptionsOpen) {
      setMoreOptionsOpen(false);
    }
  };
  const handleToggleMoreOptions = () => {
    setMoreOptionsOpen(!moreOptionsOpen);
  };
  const moreOptionsRef = useRef();
  useOutsideClick(moreOptionsRef, () => handleCloseMoreOptions());
  const [feature, setFeature] = useState("CHAT");
  const handleChangeFeature = (newFeature) => {
    setFeature(newFeature);
    handleCloseMoreOptions();
  };
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const shareScreenVideoRef = useRef();
  const handleShareScreen = () => {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
      dispatch(createAlert("INFO", "Feature not ready"));
      myScreenSharingStreamRef.current = stream;
      shareScreenVideoRef.current.srcObject = stream;
      shareScreenVideoRef.current.play();
      const screenTrack = stream.getTracks()[0];
      setIsSharingScreen(true);

      handleChangeFeature("SCREENSHARING");
      screenTrack.onended = function () {
        setIsSharingScreen(false);
        handleChangeFeature("CHAT");
        console.log("screen sharing ended");
      };
    });
  };

  const [members, setMembers] = useState({
    joined: [],
    online: [],
    offline: [],
  });
  useEffect(() => {
    if (collaborate_room?.members && joinedMembersList) {
      setMembers({
        joined: collaborate_room?.members?.filter((member) => {
          return joinedMembersList?.some(
            (joinedMember) => joinedMember?.userID === member?.user?.id
          );
        }),
        online: collaborate_room?.members?.filter(
          (member) =>
            !joinedMembersList?.some(
              (joinedMember) => joinedMember?.userID === member?.user?.id
            ) && member?.user?.is_online
        ),
        offline: collaborate_room?.members?.filter(
          (member) =>
            !joinedMembersList?.some(
              (joinedMember) => joinedMember?.userID === member?.user?.id
            ) && !member?.user?.is_online
        ),
      });
    }
  }, [collaborate_room?.members, joinedMembersList]);

  const [isFinalizePage, setIsFinalizePage] = useState(false);
  const handleGoToFinalize = () => {
    setIsFinalizePage(true);
  };
  const handleGoToRoomPage = () => {
    setIsFinalizePage(false);
  };
  const [stopCollaboratingOpen, setStopCollaboratingOpen] = useState(false);
  const handleOpenStopCollaborating = () => {
    setStopCollaboratingOpen(true);
  };
  const handleCloseStopCollaborating = () => {
    setStopCollaboratingOpen(false);
  };
  const handleToggleStopCollaborating = () => {
    setStopCollaboratingOpen(!stopCollaboratingOpen);
  };
  const stopCollaboratingRef = useRef();
  useOutsideClick(stopCollaboratingRef, () => handleCloseStopCollaborating());
  const handleStopCollaborating = () => {
    dispatch(stopCollaborating(router));
  };
  return !canRender ? (
    <div className="flex justify-center items-center h-screen dark:bg-gray-800">
      <Spinner />
    </div>
  ) : (
    <>
      {peers.map((peer, index) => {
        return <Audio key={index} peer={peer} isDeafen={isDeafen} />;
      })}
      <Layout>
        <div className="fixed bottom-0 w-full z-40 flex items-center justify-center">
          {/* <div className="mr-2 flex items-center dark:bg-gray-800 bg-white rounded-t-lg border-t border-l border-r border-orange-500 dark:border-white shadow">
            <button
              onClick={handleShareScreen}
              type="button"
              className="inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-3xl text-orange-500 dark:text-gray-100 "
            >
              <IconContext.Provider value={{ size: 25, className: "mr-2" }}>
                <MdScreenShare />
              </IconContext.Provider>
              Screen
            </button>
          </div> */}
          <div className="flex items-center dark:bg-gray-800 bg-white rounded-t-lg border-t border-l border-r border-orange-500 dark:border-white shadow">
            {isMicOn ? (
              <button
                onClick={handleToggleMic}
                className="inline-flex items-center px-4 py-2 font-medium rounded-3xl text-orange-500 dark:text-gray-100 "
              >
                <IconContext.Provider value={{ size: 25 }}>
                  <MdMic />
                </IconContext.Provider>
              </button>
            ) : (
              <button
                onClick={handleToggleMic}
                className="inline-flex items-center px-4 py-2 font-medium rounded-3xl text-red-600 dark:text-red-500"
              >
                <IconContext.Provider value={{ size: 25 }}>
                  <MdMicOff />
                </IconContext.Provider>
              </button>
            )}
            {isDeafen ? (
              <button
                onClick={handleToggleDeafen}
                className="inline-flex items-center px-4 py-2 font-medium rounded-3xl text-red-600 dark:text-red-500"
              >
                <IconContext.Provider value={{ size: 25 }}>
                  <MdHeadset />
                </IconContext.Provider>
              </button>
            ) : (
              <button
                onClick={handleToggleDeafen}
                className="inline-flex items-center px-4 py-2 font-medium rounded-3xl text-orange-500 dark:text-gray-100 "
              >
                <IconContext.Provider value={{ size: 25 }}>
                  <MdHeadset />
                </IconContext.Provider>
              </button>
            )}
          </div>
        </div>
        <div className={isFinalizePage ? "block" : "hidden"}>
          <Finalize handleGoToRoomPage={handleGoToRoomPage} />
        </div>

        <section
          aria-labelledby="profile-overview-title"
          className={!isFinalizePage ? "block" : "hidden"}
        >
          <div className="bg-white dark:bg-gray-700 shadow border-t border-gray-200 dark:border-gray-600">
            <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl">
              <h2 className="sr-only" id="profile-overview-title">
                Profile Overview
              </h2>
              <div className="bg-white dark:bg-gray-700  p-3 sm:px-0">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="sm:flex sm:space-x-5">
                    <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                      {/* <p className="text-sm font-medium text-gray-600">
                            Welcome back,
                          </p> */}
                      <p className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                        {collaborate_room?.title}
                      </p>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Created at{" "}
                        <time dateTime="2020-08-25">
                          {moment(collaborate_room?.created).format(
                            "MMM D [at] h:mm A z"
                          )}
                        </time>
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-center md:mt-0 flex-col-reverse justify-stretch space-y-4 space-y-reverse md:flex-row-reverse md:justify-end md:space-x-reverse md:space-y-0 md:space-x-3  md:space-x-3">
                    <button
                      onClick={handleOpenModal}
                      type="button"
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 hover:text-gray-500 dark:hover:text-white dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Info
                    </button>
                    {collaborate_room?.status === "SO" ? (
                      <span className="inline-flex items-center justify-center  px-4 py-2 border dark:border-green-300 border-green-500 shadow-sm text-sm font-medium rounded-3xl dark:text-green-300 text-green-500 bg-white dark:bg-gray-700 ">
                        Finalized
                      </span>
                    ) : (
                      <>
                        {collaborate_room?.user?.id ===
                          authReducer.user?.id && (
                          <button
                            onClick={handleGoToFinalize}
                            type="button"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-3xl shadow-sm  text-white hover:text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                          >
                            Finalize
                          </button>
                        )}
                      </>
                    )}
                    {collaborate_room?.status !== "SO" &&
                      collaborate_room?.user?.id !== authReducer.user?.id && (
                        <button
                          onClick={handleOpenStopCollaborating}
                          type="button"
                          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 hover:text-gray-500 dark:hover:text-white dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                        >
                          Stop collaborating
                        </button>
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800  p-3">
              <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl sm:flex justify-between items-center ">
                <div className="flex justify-center md:mt-0 flex-col-reverse justify-stretch space-y-4 space-y-reverse md:flex-row-reverse md:justify-end md:space-x-reverse md:space-y-0 md:space-x-3  md:space-x-3">
                  <button
                    onClick={handleChangeFeature.bind(this, "KANBANBOARD")}
                    type="button"
                    className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
                    </svg>
                    Kanban board <span className="text-red-500 ml-2">Beta</span>
                  </button>
                  <button
                    onClick={handleChangeFeature.bind(this, "SHAREDWHITEBOARD")}
                    type="button"
                    className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path
                        fillRule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Shared whiteboard
                  </button>
                  <button
                    onClick={handleChangeFeature.bind(this, "SHAREDNOTES")}
                    type="button"
                    className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Shared notes
                  </button>
                  <button
                    onClick={handleChangeFeature.bind(this, "CHAT")}
                    type="button"
                    className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Chat
                  </button>
                  {isSharingScreen && (
                    <button
                      onClick={handleChangeFeature.bind(this, "SCREENSHARING")}
                      type="button"
                      className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                    >
                      <IconContext.Provider
                        value={{ size: 20, className: "mr-2 text-red-600" }}
                      >
                        <MdFiberManualRecord />
                      </IconContext.Provider>
                      Screen sharing
                    </button>
                  )}
                </div>

                <div className="relative sm:inline-block text-left mt-5 sm:mt-0 flex justify-end">
                  <div>
                    <button
                      type="button"
                      onMouseDown={handleOpenMoreOptions}
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      More
                      <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div
                    ref={moreOptionsRef}
                    className={moreOptionsOpen ? "block" : "hidden"}
                  >
                    <ul
                      className="origin-top-right absolute right-0 mt-10 sm:mt-2 w-72 z-30 rounded-md shadow-lg overflow-hidden bg-white dark:bg-gray-800 divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
                      tabIndex="-1"
                      role="listbox"
                      aria-labelledby="listbox-label"
                      aria-activedescendant="listbox-option-0"
                    >
                      <li
                        className="text-gray-900 dark:text-white cursor-pointer select-none relative p-4 text-sm hover:opacity-70"
                        id="listbox-option-0"
                        role="option"
                      >
                        <button
                          onClick={handleChangeFeature.bind(this, "ASTEROIDS")}
                          className="flex flex-col"
                        >
                          <div className="flex justify-between">
                            <p className="font-normal">Asteroids</p>
                          </div>
                          <p className="text-gray-500 text-left mt-2">
                            Psst.. waiting for someone? Let's shoot some
                            asteroids in the meantime. This game is only loaded
                            for you.
                          </p>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={`${!isFinalizePage ? "block" : "hidden"} py-10`}>
          <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="lg:col-start-1 lg:col-span-2">
              <div
                className={
                  feature.toUpperCase() === "SCREENSHARING" && collaborate_room
                    ? "block"
                    : "hidden"
                }
              >
                <ContributeScreenSharing
                  socketRef={socketRef}
                  roomID={roomID}
                  shareScreenVideoRef={shareScreenVideoRef}
                />
              </div>
              <div
                className={
                  feature.toUpperCase() === "CHAT" && collaborate_room
                    ? "block"
                    : "hidden"
                }
              >
                <ContributeChat
                  handleSendMessage={handleSendMessage}
                  handleChangeMessage={handleChangeMessage}
                  message={message}
                />
              </div>
              <div
                className={
                  feature.toUpperCase() === "SHAREDNOTES" && collaborate_room
                    ? "block"
                    : "hidden"
                }
              >
                <ContributeSharedNotes
                  socketRef={socketRef}
                  roomID={roomID}
                  sharedNotes={collaborate_room?.shared_notes}
                />
              </div>
              <div
                className={
                  feature.toUpperCase() === "SHAREDWHITEBOARD" &&
                  collaborate_room
                    ? "block"
                    : "hidden"
                }
              >
                <ContributeWhiteboard
                  socketRef={socketRef}
                  roomID={roomID}
                  feature={feature}
                />
              </div>
              <div
                className={
                  feature.toUpperCase() === "KANBANBOARD" && collaborate_room
                    ? "block"
                    : "hidden"
                }
              >
                <ContributeKanbanBoard socketRef={socketRef} roomID={roomID} />
              </div>
              {!isFinalizePage &&
                feature.toUpperCase() === "ASTEROIDS" &&
                collaborate_room && <ContributeAsteroids />}
            </div>

            <section
              aria-labelledby="timeline-title"
              className="lg:col-start-3 lg:col-span-1 "
            >
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6  dark:bg-gray-700  sticky top-24">
                <h2
                  id="timeline-title"
                  className="text-lg font-medium text-gray-900 dark:text-white"
                >
                  Members
                </h2>

                <div className="mt-3 flow-root overflow-y-auto max-h-96 p-1">
                  <span
                    id="timeline-title"
                    className="text-md text-gray-900 dark:text-white"
                  >
                    Joined
                  </span>

                  {members?.joined?.length === 0 ? (
                    <span className="text-sm text-gray-500 dark:text-gray-200 block">
                      No members joined
                    </span>
                  ) : (
                    <ul className=" divide-y divide-gray-200 dark:divide-gray-400 ">
                      {members?.joined?.map((member) => (
                        <Member member={member} key={member.id} />
                      ))}
                    </ul>
                  )}
                  <span
                    id="timeline-title"
                    className="text-md text-gray-900 dark:text-white"
                  >
                    Online
                  </span>

                  {members?.online?.length === 0 ? (
                    <span className="text-sm text-gray-500 dark:text-gray-200 block">
                      No members online
                    </span>
                  ) : (
                    <ul className=" divide-y divide-gray-200 dark:divide-gray-400 ">
                      {members?.online?.map((member) => (
                        <Member member={member} key={member.id} />
                      ))}
                    </ul>
                  )}
                  <span
                    id="timeline-title"
                    className="text-md text-gray-900 dark:text-white"
                  >
                    Offline
                  </span>
                  {members?.offline?.length === 0 ? (
                    <span className="text-sm text-gray-500 dark:text-gray-200 block">
                      No members offline
                    </span>
                  ) : (
                    <ul className=" divide-y divide-gray-200 dark:divide-gray-400 opacity-70">
                      {members?.offline?.map((member) => (
                        <Member member={member} key={member.id} />
                      ))}
                    </ul>
                  )}
                </div>
                {/* <div className="mt-6 flex flex-col justify-stretch">
             
            </div> */}
              </div>
            </section>
          </div>
        </div>
      </Layout>
      <PostModal
        post={collaborate_room}
        page={page}
        modalOpen={modalOpen}
        handleToggleModal={handleToggleModal}
        handleCloseModal={handleCloseModal}
        modalRef={modalRef}
      />
      <div
        className={`${
          stopCollaboratingOpen ? "block" : "hidden"
        } fixed z-30 inset-0 overflow-y-auto`}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            ref={stopCollaboratingRef}
            className="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                    id="modal-headline"
                  >
                    Stop collaborating
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      You will stop collaborating on this post.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleStopCollaborating}
                type="button"
                className="w-full inline-flex justify-center rounded-3xl border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Stop collaborating
              </button>
              <button
                onClick={handleCloseStopCollaborating}
                type="button"
                className="mt-3 inline-flex justify-center rounded-3xl border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-700 sm:mt-0 sm:col-start-1 sm:text-sm bg-white dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contribute;
