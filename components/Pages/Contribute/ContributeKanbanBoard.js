import { useDispatch, useSelector } from "react-redux";
import ActionButton from "./ContributeKanbanBoard/ActionButton";
import List from "./ContributeKanbanBoard/List";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "redux/actions/kanban";
import { useEffect, useState } from "react";

const ContributeKanbanBoard = ({ socketRef, roomID }) => {
  const lists = useSelector((state) => state.kanbanReducer);
  const dispatch = useDispatch();
  const onDragEnd = (result) => {
    // TODO: reordering logic
    console.log("element dragged");
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };
  const [firstRender, setFirstRender] = useState(0);
  useEffect(() => {
    if (firstRender > 0) {
      console.log(lists);
    } else {
      setFirstRender((firstRender) => firstRender + 1);
    }
  }, [JSON.stringify(lists)]);

  return (
    <section aria-labelledby="notes-title" className="overflow-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              className="flex"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {lists.map((list, index) => (
                <List
                  listID={list.id}
                  title={list.title}
                  cards={list.cards}
                  key={list.id}
                  index={index}
                />
              ))}
              {provided.placeholder}

              <ActionButton list />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default ContributeKanbanBoard;
