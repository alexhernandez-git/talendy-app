import React, { useEffect } from "react";
import Header from "components/Layout/Header";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import Chat from "./Chat";
import NewPostModal from "./CreateEditPostModal";
import RegisterModal from "./RegisterModal";
import { useAlert } from "hooks/useAlert";
import { closeChats } from "redux/actions/chats";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Layout = ({ children, page }) => {
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
  const [registerOpen, setRegisterOpen] = useState(false);
  const handleOpenRegister = () => {
    setRegisterOpen(true);
  };
  const handleCloseRegister = () => {
    setRegisterOpen(false);
  };
  const handleToggleRegister = () => {
    setRegisterOpen(!registerOpen);
  };
  const registerRef = useRef();
  useOutsideClick(registerRef, () => handleCloseRegister());
  useEffect(() => {
    if (registerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [registerOpen]);
  const alert = useAlert();
  return (
    <>
      {alert}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative">
        <Header
          handleOpenModal={handleOpenModal}
          page={page}
          handleToggleRegister={handleToggleRegister}
        />
        {children}
      </div>
      <Chat />
      <NewPostModal modalOpen={modalOpen} modalRef={modalRef} />
      <RegisterModal
        registerOpen={registerOpen}
        registerRef={registerRef}
        handleCloseRegister={handleCloseRegister}
      />
    </>
  );
};

export default Layout;
