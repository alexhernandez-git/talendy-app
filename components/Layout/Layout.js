import React, { useEffect } from "react";
import Header from "components/Layout/Header";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import Chat from "./Chat";

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
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header handleToggleMessages={handleToggleMessages} />
        {children}
      </div>
      <Chat
        messagesOpen={messagesOpen}
        handleToggleMessages={handleToggleMessages}
        messagesRef={messagesRef}
      />
    </>
  );
};

export default Layout;
