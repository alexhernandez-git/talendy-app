import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ text, id, index }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          className="mb-3 bg-white rounded-md shadow p-4"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <div>
            <div>
              <span gutterBottom className="whitespace-pre-line text-sm">
                {text}
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
