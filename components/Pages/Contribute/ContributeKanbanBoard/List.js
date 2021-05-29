import React from "react";
import ActionButton from "./ActionButton";
import Card from "./Card";
import { Draggable, Droppable } from "react-beautiful-dnd";

const List = ({ title, cards, listID, index }) => {
  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provided) => (
        <div
          style={{ backgroundColor: "#dfe3e6" }}
          className="rounded-md w-72 p-3 mr-3 h-full bg-gray-200 shadow"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listID)}>
            {(provided) => (
              <>
                <h4 className="p-4">{title}</h4>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {cards.map((card, index) => (
                    <Card
                      text={card.text}
                      key={card.id}
                      id={card.id}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                  <ActionButton listID={listID} />
                </div>
              </>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
