import { useDispatch, useSelector } from "react-redux";
import ActionButton from "./ContributeKanbanBoard/ActionButton";
import List from "./ContributeKanbanBoard/List";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  addCard,
  addList,
  deleteCard,
  deleteList,
  sort,
  sortCard,
  sortCardInDiferentLists,
  sortList,
  updateCard,
  updateList,
} from "redux/actions/kanban";
import { useEffect, useState } from "react";

const ContributeKanbanBoard = ({ socketRef, roomID }) => {
  const { collaborate_room } = useSelector(
    (state) => state.collaborateRoomReducer
  );
  const { access_token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const onDragEnd = (result) => {
    // TODO: reordering logic
    console.log("element dragged");
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (type === "list") {
      dispatch(
        sortList({
          droppableIndexStart: source.index,
          droppableIndexEnd: destination.index,
        })
      );
      socketRef.current.emit("update list order", {
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        roomID: roomID,
        token: access_token,
      });

      return;
    }
    if (source.droppableId === destination.droppableId) {
      dispatch(
        sortCard({
          droppableIdStart: source.droppableId,
          droppableIndexStart: source.index,
          droppableIndexEnd: destination.index,
        })
      );
      socketRef.current.emit("update card order", {
        droppableIdStart: source.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        roomID: roomID,
        token: access_token,
      });
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      dispatch(
        sortCardInDiferentLists({
          droppableIdStart: source.droppableId,
          droppableIdEnd: destination.droppableId,
          droppableIndexStart: source.index,
          droppableIndexEnd: destination.index,
        })
      );
      socketRef.current.emit("update card between lists order", {
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        roomID: roomID,
        token: access_token,
      });
    }
  };
  const [firstRender, setFirstRender] = useState(0);
  useEffect(() => {
    if (firstRender > 0) {
      console.log(collaborate_room?.kanban);
    } else {
      setFirstRender((firstRender) => firstRender + 1);
    }
  }, [JSON.stringify(collaborate_room?.kanban)]);
  useEffect(() => {
    if (socketRef?.current) {
      socketRef.current.on("list order updated", (payload) => {
        console.log(payload);
        dispatch(sortList(payload));
      });
      socketRef.current.on("card order updated", (payload) => {
        console.log(payload);
        dispatch(sortCard(payload));
      });
      socketRef.current.on("card between lists order updated", (payload) => {
        console.log(payload);
        dispatch(sortCardInDiferentLists(payload));
      });
      socketRef.current.on("list added", (payload) => {
        console.log(payload);
        dispatch(addList(payload));
      });
      socketRef.current.on("card added", (payload) => {
        console.log(payload);
        dispatch(addCard(payload));
      });
      socketRef.current.on("list updated", (payload) => {
        console.log(payload);
        dispatch(updateList(payload));
      });
      socketRef.current.on("card updated", (payload) => {
        console.log(payload);
        dispatch(updateCard(payload));
      });
      socketRef.current.on("list deleted", (payload) => {
        console.log(payload);
        dispatch(deleteList(payload));
      });
      socketRef.current.on("card deleted", (payload) => {
        console.log(payload);
        dispatch(deleteCard(payload));
      });
    }
  }, [socketRef?.current]);
  return (
    <section className="overflow-auto block" style={{ minHeight: "40rem" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              className="inline-flex"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {collaborate_room?.kanban.map((list, index) => (
                <List
                  listID={list.id}
                  title={list.title}
                  cards={list.cards}
                  key={list.id}
                  index={index}
                  socketRef={socketRef}
                  roomID={roomID}
                />
              ))}
              <div style={{ visibility: "hidden", height: 0 }}>
                {provided.placeholder}
              </div>

              <ActionButton list roomID={roomID} socketRef={socketRef} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default ContributeKanbanBoard;
