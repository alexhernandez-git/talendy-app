import React, { useEffect } from "react";
import Header from "components/Layout/Header";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import Chat from "./Chat";
import NewPostModal from "./NewPostModal";

const Layout = ({ children }) => {
  const [messagesOpen, setMessagesOpen] = useState(false);
  const handleOpenMessages = () => {
    setMessagesOpen(true);
  };
  const handleCloseMessages = () => {
    setMessagesOpen(false);
  };
  const handleToggleMessages = () => {
    setMessagesOpen(!messagesOpen);
  };
  const messagesRef = useRef();
  useOutsideClick(messagesRef, () => handleCloseMessages());
  useEffect(() => {
    if (messagesOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [messagesOpen]);

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

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header
          handleToggleMessages={handleToggleMessages}
          handleOpenModal={handleOpenModal}
        />
        {children}
      </div>
      <Chat
        messagesOpen={messagesOpen}
        handleToggleMessages={handleToggleMessages}
        messagesRef={messagesRef}
      />
      <NewPostModal modalOpen={modalOpen} modalRef={modalRef} />
    </>
  );
};

export default Layout;
