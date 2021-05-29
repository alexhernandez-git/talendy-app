import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ title, id, index }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          className="mb-3 bg-white dark:bg-gray-800 rounded-md shadow p-4"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <div>
            <div>
              <span
                gutterBottom
                className="text-gray-600 dark:text-gray-200 whitespace-pre-line text-sm"
              >
                {title}
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
