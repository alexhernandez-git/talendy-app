import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch } from "react-redux";
import { addList, addCard } from "redux/actions/kanban";

const ActionButton = (props) => {
  const { list, listID } = props;
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => {
    setFormOpen(true);
  };
  const closeForm = () => {
    setFormOpen(false);
  };
  const [text, setText] = useState("");
  const handleInputChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const dispatch = useDispatch();
  const handleAddList = () => {
    if (text) {
      dispatch(addList(text));
      setText("");
    }
  };
  const handleAddCard = () => {
    if (text) {
      dispatch(addCard(listID, text));
      setText("");
    }
  };
  // Button
  const buttonText = list ? "Add another list" : "Add another card";
  const buttonTextOpacity = list ? 1 : 0.5;
  const buttonTextColor = list ? "white" : "inherit";
  // Form
  const placeholder = list
    ? "Enter list title..."
    : "Enter a title for this card...";
  const buttonTitle = list ? "Add List" : "Add Card";
  const renderForm = () => {
    return (
      <div>
        <div
          style={{
            overflow: "visible",
            minWidth: "18rem",
          }}
          className=""
        >
          <TextareaAutosize
            placeholder={placeholder}
            autoFocus
            onBlur={closeForm}
            value={text}
            onChange={handleInputChange}
            className="focus:ring-orange-500 focus:border-orange-500 flex-grow block w-full min-w-0 rounded-lg sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
            style={{
              resize: "none",
            }}
          />
        </div>
        <div style={styles.formButtonGroup}>
          <button
            onMouseDown={list ? handleAddList : handleAddCard}
            variant="contained"
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 text-white px-2 rounded-md"
          >
            {buttonTitle}
          </button>
          <span
            onClick={closeForm}
            style={{ marginLeft: 8, cursor: "pointer" }}
          >
            close
          </span>
        </div>
      </div>
    );
  };
  const renderAddButton = () => {
    return (
      <div
        style={{
          ...styles.openForButtonGroup,
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          minWidth: 300,
        }}
        className={`${list ? " bg-gray-400" : "inherit"}`}
        onClick={openForm}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <p>{buttonText}</p>
      </div>
    );
  };
  return formOpen ? renderForm() : renderAddButton();
};

const styles = {
  openForButtonGroup: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    height: 36,
    width: 272,
    paddingLeft: 10,
  },
  formButtonGroup: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
  },
};

export default ActionButton;
