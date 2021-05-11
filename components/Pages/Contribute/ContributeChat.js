import React from "react";
import Message from "components/Pages/ContributeRoom/Message";
import Editor from "components/Editor/Editor";
import { useSelector } from "react-redux";
import VisibilitySensor from "react-visibility-sensor";
import { useDispatch } from "react-redux";
import { fetchMoreRoomMessages } from "redux/actions/roomMessages";
import ContributeRoomChatEditor from "components/Editor/ContributeRoomChatEditor";

const ContributeChat = ({
  handleSendMessage,
  handleChangeMessage,
  message,
}) => {
  const dispatch = useDispatch();
  const handleFetchMoreMessages = () => {
    dispatch(fetchMoreRoomMessages());
  };
  function onChangeVisibility(isVisible) {
    console.log("isVisible", isVisible);
    if (isVisible) handleFetchMoreMessages();
  }

  const roomMessagesReducer = useSelector((state) => state.roomMessagesReducer);
  const authReducer = useSelector((state) => state.authReducer);
  return (
    <section aria-labelledby="notes-title" className="">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 dark:bg-gray-700 shadow sm:rounded-lg sm:overflow-hidden">
        <div className=" ">
          <div className="px-4 py-5 sm:px-6"></div>
          <div className="">
            <ul className="p-4  overflow-y-auto bg-gray-100 dark:bg-gray-800 flex flex-col-reverse content-container">
              {roomMessagesReducer.messages.results.map((message) =>
                message?.sent_by?.id == authReducer.user?.id ? (
                  <Message message={message} myMessage key={message?.id} />
                ) : (
                  <Message message={message} key={message?.id} />
                )
              )}
              {roomMessagesReducer.messages.results.length > 0 &&
                roomMessagesReducer.messages.next && (
                  <VisibilitySensor onChange={onChangeVisibility}>
                    <div
                      className="p-3 flex justify-center"
                      onClick={handleFetchMoreMessages}
                    >
                      <span className="text-gray-500 dark:text-gray-100 text-sm cursor-pointer">
                        Load more messages
                      </span>
                    </div>
                  </VisibilitySensor>
                )}
            </ul>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-6 sm:px-6">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              {authReducer.user?.picture ? (
                <img
                  className="h-10 w-10 rounded-full"
                  src={
                    new RegExp(
                      `${process.env.HOST}|https://freelanium.s3.amazonaws.com`
                    ).test(authReducer.user?.picture)
                      ? authReducer.user?.picture
                      : process.env.HOST + authReducer.user?.picture
                  }
                  alt=""
                ></img>
              ) : (
                <span className="bg-gray-100 rounded-full overflow-hidden h-10 w-10">
                  <svg
                    className="text-gray-300 bg-gray-100 rounded-full h-10 w-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1 relative">
              <form onSubmit={handleSendMessage}>
                <div>
                  <label htmlFor="comment" className="sr-only">
                    About
                  </label>
                  <ContributeRoomChatEditor
                    message={message}
                    handleSendMessage={handleSendMessage}
                    handleChangeMessage={handleChangeMessage}
                  />
                </div>
                <div className="mt-3 sm:flex items-center justify-end">
                  <div className="mt-4 sm:mt-0 flex items-center justify-end">
                    {/* <button
                      type="submit"
                      className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-orange-500 dark:text-gray-100 bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        ></path>
                      </svg>
                    </button> */}
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-3xl shadow-sm  text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContributeChat;
