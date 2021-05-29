import React from "react";
import ActionButton from "./ActionButton";
import Card from "./Card";
import { Draggable, Droppable } from "react-beautiful-dnd";

const List = ({ title, cards, listID, index }) => {
  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provided) => (
        <div
          style={{ backgroundColor: "#dfe3e6", minWidth: "18rem" }}
          className="rounded-md p-3 mr-3 h-full bg-gray-200 dark:bg-gray-700 shadow"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listID)}>
            {(provided) => (
              <div style={{ minWidth: "18rem" }}>
                <h4 className="p-4 text-gray-900 dark:text-white truncate">
                  {title}
                </h4>
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
