import React from "react";
import ActionButton from "./ActionButton";
import Card from "./Card";
import { Draggable, Droppable } from "react-beautiful-dnd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
const List = ({ title, cards, listID, index }) => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const handleOpenEditTitle = () => {
    setIsEditTitle(true);
  };
  const handleCloseEditTitle = () => {
    setIsEditTitle(false);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title,
    },
    validationSchema: Yup.object({
      title: Yup.string().max(
        100,
        "Title must not be more than 100 characters"
      ),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provided) => (
        <div
          style={{
            backgroundColor: "#dfe3e6",
            minWidth: "18rem",
            maxWidth: "18rem",
          }}
          className="rounded-md p-3 mr-3 h-full bg-gray-200 dark:bg-gray-700 shadow"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listID)}>
            {(provided) => (
              <div style={{ minWidth: "18rem", maxWidth: "18rem" }}>
                <div className="flex justify-between">
                  {isEditTitle ? (
                    <form className="py-4">
                      <input
                        type="text"
                        className="focus:ring-orange-500 focus:border-orange-500 flex-grow block w-full min-w-0 rounded-lg sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="title"
                      />
                    </form>
                  ) : (
                    <h4 className="p-4 text-gray-900 dark:text-white truncate">
                      {title}
                    </h4>
                  )}
                  <div className=" flex items-center">
                    {isEditTitle ? (
                      <svg
                        onClick={handleCloseEditTitle}
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer h-5 w-5 text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-200 transition"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={handleOpenEditTitle}
                          className="cursor-pointer h-5 w-5 text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-200 transition"
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="cursor-pointer h-5 w-5 text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-200 transition"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </>
                    )}
                  </div>
                </div>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {cards.map((card, index) => (
                    <Card
                      title={card.title}
                      key={card.id}
                      id={card.id}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                  <ActionButton listID={listID} />
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
