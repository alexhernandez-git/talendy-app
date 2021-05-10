import React, { useEffect, useRef, useState } from "react";
import useOutsideClick from "hooks/useOutsideClick";
import PostModal from "components/Layout/PostModal";
import Layout from "components/Layout/Layout";
import { CONTRIBUTE_PAGE } from "pages";
import { IconContext } from "react-icons";
import { MdHeadset, MdMic, MdScreenShare, MdMicOff } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import Member from "components/Pages/Help/Member";
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
import { fetchPost } from "redux/actions/post";
import Spinner from "components/Layout/Spinner";
import moment from "moment";
const Audio = (props) => {
  const ref = useRef();
  useEffect(() => {
    console.log(ref.current);
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
        await dispatch(fetchPost(router.query?.contribute));
      }
    };

    fetchInitialData();
  }, [initialDataFetched]);
  const postReducer = useSelector((state) => state.postReducer);
  const { post, is_loading } = postReducer;
  const [roomID, setRoomID] = useState([]);
  useEffect(() => {
    if (
      initialDataFetched &&
      !is_loading &&
      post &&
      !post?.members?.some((member) => member.user.id === authReducer.user?.id)
    ) {
      router.push(authReducer.is_authenticated ? "/feed" : "/");
      dispatch(createAlert("ERROR", "You are not member of this post"));
    } else {
      if (!is_loading) {
        if (post) {
          setRoomID(post.id);
          setValidationsMade(true);
        } else {
          router.push(authReducer.is_authenticated ? "/feed" : "/");
        }
      }
    }
  }, [is_loading]);
  // Webrtc
  const [peers, setPeers] = useState([]);
  const myStreamRef = useRef();
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const [isMicOn, setIsMicOn] = useState(false);
  const [joinedMembersList, setJoinedMembersList] = useState([]);
  const [validationsMade, setValidationsMade] = useState(false);

  useEffect(() => {
    console.log("peers", peers);
  }, [peers]);
  const handleToggleMic = () => {
    if (myStreamRef.current?.getAudioTracks().lenght > 0) {
      if (!isMicOn) {
        setDeafen(false);
      }
      setIsMicOn(!isMicOn);
      myStreamRef.current.getAudioTracks()[0].enabled = !isMicOn;
    }
  };
  const [isDeafen, setDeafen] = useState(false);
  const handleToggleDeafen = () => {
    if (myStreamRef.current?.getAudioTracks().lenght > 0) {
      setDeafen(!isDeafen);
      if (!isDeafen) {
        setIsMicOn(false);
        console.log("myStreamRef.current", myStreamRef.current);
        myStreamRef.current.getAudioTracks()[0].enabled = false;
      }
    }
  };

  useEffect(() => {
    if (initialDataFetched && validationsMade) {
      socketRef.current = io.connect("http://localhost:5500");
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
      socketRef.current.on("user left", (socketID) => {
        console.log("joinedMembersList user left", joinedMembersList);
        console.log("jsocketIDt", socketID);
        setJoinedMembersList(
          joinedMembersList.filter(
            (joinedMember) => joinedMember.socketID !== socketID
          )
        );
      });

      socketRef.current.on("no user id", () => {
        dispatch(createAlert("ERROR", "There is not user id"));
        router.push("/feed");
      });
      function createPeer(userToSignal, callerID, stream) {
        console.log("createPeer", stream);
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream,
        });

        peer.on("signal", (signal) => {
          console.log("signal", signal);
          console.log("signal callerId", callerID);
          console.log("signal signal", signal);
          socketRef.current.emit("sending signal", {
            userToSignal,
            callerID,
            signal,
          });
        });

        return peer;
      }

      function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream,
        });

        peer.on("signal", (signal) => {
          console.log("returning signal", signal);
          socketRef.current.emit("returning signal", { signal, callerID });
        });

        peer.signal(incomingSignal);

        return peer;
      }

      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then(async (stream) => {
          myStreamRef.current = stream;
          stream.getAudioTracks()[0].enabled = isMicOn;
          console.log(socketRef.current);
          socketRef.current.emit("media ready", roomID);

          socketRef.current.on("all users", (users) => {
            const peers = [];
            users.forEach((user) => {
              console.log(user);
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
            console.log("all users user", users);
          });

          socketRef.current.on("user joined", (payload) => {
            console.log("user joined", payload);
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });

            setPeers((users) => [...users, peer]);
          });

          socketRef.current.on("receiving returned signal", (payload) => {
            console.log("payload", payload);
            const item = peersRef.current.find((p) => p.peerID === payload.id);
            console.log(peersRef.current);
            item?.peer.signal(payload.signal);
          });
        });
    }
  }, [initialDataFetched, validationsMade]);
  useEffect(() => {
    return () => {
      console.log("myStreamRef.current", myStreamRef.current);
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (myStreamRef.current) {
        myStreamRef.current.getTracks().forEach(function (track) {
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
  const handleShareScreen = () => {
    dispatch(createAlert("INFO", "Feature not ready"));
  };

  const [members, setMembers] = useState({
    joined: [],
    online: [],
    offline: [],
  });
  useEffect(() => {
    if (post?.members) {
      setMembers({
        joined: post?.members?.filter((member) => {
          console.log("joinedMembersList", joinedMembersList);
          return joinedMembersList?.some(
            (joinedMember) => joinedMember?.userID === member?.user?.id
          );
        }),
        online: post?.members?.filter(
          (member) =>
            !joinedMembersList?.some(
              (joinedMember) => joinedMember?.userID === member?.user?.id
            ) && member?.user?.is_online
        ),
        offline: post?.members?.filter(
          (member) =>
            !joinedMembersList?.some(
              (joinedMember) => joinedMember?.userID === member?.user?.id
            ) && !member?.user?.is_online
        ),
      });
    }
  }, [post?.members, joinedMembersList]);

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
          <div className="mr-2 flex items-center dark:bg-gray-800 bg-white rounded-t-lg border-t border-l border-r border-orange-500 dark:border-white shadow">
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
          </div>
          <div className="flex items-center dark:bg-gray-800 bg-white rounded-t-lg border-t border-l border-r border-orange-500 dark:border-white shadow">
            {/* <button
              type="button"
              className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-orange-500 dark:text-gray-100 bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
            >
              <IconContext.Provider value={{ size: 18, className: "mr-2" }}>
                <MdScreenShare />
              </IconContext.Provider>
              Screen
            </button> */}
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
        <section aria-labelledby="profile-overview-title">
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
                        {post?.title}
                      </p>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Created at{" "}
                        <time dateTime="2020-08-25">
                          {moment(post?.created).format("MMM D [at] h:mm A z")}
                        </time>
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-center sm:mt-0 flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
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
                    <Link href="/finalize/123">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-3xl shadow-sm  text-white hover:text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                      >
                        Finalize
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800  p-3">
              <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl flex justify-between items-center ">
                <div className="  flex justify-center sm:justify-start sm:mt-0 flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
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
                </div>

                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      onClick={handleOpenMoreOptions}
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
                      className="origin-top-right absolute right-0 mt-2 w-72 z-30 rounded-md shadow-lg overflow-hidden bg-white dark:bg-gray-800 divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
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

        <div className="py-10">
          <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              {feature.toUpperCase() === "CHAT" && <ContributeChat />}
              {feature.toUpperCase() === "SHAREDNOTES" && (
                <ContributeSharedNotes socketRef={socketRef} roomID={roomID} />
              )}
              {feature.toUpperCase() === "ASTEROIDS" && <ContributeAsteroids />}
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
                  <ul className=" divide-y divide-gray-200 dark:divide-gray-400 ">
                    {members?.joined?.map((member) => (
                      <Member member={member} key={member.id} />
                    ))}
                  </ul>
                  <span
                    id="timeline-title"
                    className="text-md text-gray-900 dark:text-white"
                  >
                    Online
                  </span>
                  <ul className=" divide-y divide-gray-200 dark:divide-gray-400 ">
                    {members?.online?.map((member) => (
                      <Member member={member} key={member.id} />
                    ))}
                  </ul>
                  <span
                    id="timeline-title"
                    className="text-md text-gray-900 dark:text-white"
                  >
                    Offline
                  </span>
                  <ul className=" divide-y divide-gray-200 dark:divide-gray-400 opacity-70">
                    {members?.offline?.map((member) => (
                      <Member member={member} key={member.id} />
                    ))}
                  </ul>
                </div>
                {/* <div className="mt-6 flex flex-col justify-stretch">
             
              </div> */}
              </div>
            </section>
          </div>
        </div>
      </Layout>
      <PostModal
        post={post}
        page={page}
        modalOpen={modalOpen}
        handleToggleModal={handleToggleModal}
        handleCloseModal={handleCloseModal}
        modalRef={modalRef}
      />
    </>
  );
};

export default Contribute;
