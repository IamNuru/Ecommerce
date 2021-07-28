import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../../context/user/Context";
import axios from "axios";

const ChatBox = props => {
    const { user, acceptC } = useContext(UserContext);
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*"
        }
    };
    const configs = {
        headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };

    const [to_id] = useState(props.match.params.id);
    //const [to_id] = useState(props.match.params.to_id);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [sent, setSent] = useState(false);
    const [fromName, setFromName] = useState(false);
    const [acceptChat, setAcceptChat] = useState(false);

    const onChange = e => {
        setMessage(e.target.value);
    };

    //accept chat
    const accept = () => {
        axios
            .post(
                `${process.env.MIX_APP_API_URL}/acceptchat/${props && props.match.params.id}`,
                "",
                config
            )
            .then(acc => {
                setAcceptChat(true);
            })
            .catch(err => {
                setAcceptChat(false);
            });
    };

    useEffect(() => {
        axios
            .get(
                `${process.env.MIX_APP_API_URL}/find/chat/user/${to_id}`,
                config
            )
            .then(res => {
                setFromName(res.data.name);
            })
            .catch(err => {});
    }, [props]);



    useEffect(() => {
        const fetchMessages = async () => {
            await axios
                .get(`${process.env.MIX_APP_API_URL}/messages/${user && user.id}/${to_id}`,
                    config
                )
                .then(res => {
                    setMessages(res.data);
                    setSent(false);
                })
                .catch(err => {});
        };
        fetchMessages();
        Echo.channel("shop").listen("MessageSent", e => {
            messages.push({ message: e.message.message });
            setSent(true)
            /* setSent(e.message); */
        });
    }, [sent, user]);



    const sendMessage = e => {
        e.preventDefault();
        setSent(true);
        const data = { message: message };
        axios
            .post(`${process.env.MIX_APP_API_URL}/message/${user.id}/${to_id}`, data, config)
            .then(res => {
                setSent(false);
                setMessage("");
            }).catch(err => {
                setSent(false);
            });
    };

    const sendButtonMessage = mes => {
        setSent(true);
        const data = { message: mes };
        axios
            .post(
                `${process.env.MIX_APP_API_URL}/message/${user.id}/${to_id}`,
                data,
                config
            )
            .then(res => {
                setSent(false);
                setMessage("");
            })
            .catch(err => {
                setSent(false);
            });
    };

    //message to send when button is clicked
    const buttonMessage = mes => {
        sendButtonMessage(mes);
    };
    //close conversation
    const closeChat = async mes => {
        await sendButtonMessage(mes);
        await axios
            .get(`${process.env.MIX_APP_API_URL}/close/chat/${to_id}`, config)
            .then(res => {
                setSent(false);
            }).catch(err => {
                setSent(false);
            });
        Echo.channel("shop").listen("MessageSent", e => {});
    };


    
    return (
        <div className="mt-1 h-full pt-2 px-4 pb-28">
            <div className="flex justify-center items-center h-full ">
                <div className="w-full md:w-96 h-full bg-white rounded shadow-2xl">
                    <nav className="w-full h-10 bg-gray-900 rounded-tr rounded-tl flex justify-between items-center">
                        <div className="flex justify-center items-center">
                            <i className="mdi mdi-arrow-left font-normal text-gray-300 ml-1"></i>
                            <img
                                src="https://i.imgur.com/IAgGUYF.jpg"
                                className="rounded-full ml-1"
                                width="25"
                                height="25"
                            />
                            <span className="text-xs font-medium text-gray-300 ml-1">
                                Chatting with{" "}
                                <span className="text-pink-600 capitalize font-semibold">
                                    {fromName && fromName}
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center">
                            <i className="mdi mdi-video text-gray-300 mr-4"></i>
                            <i className="mdi mdi-phone text-gray-300 mr-2"></i>
                            <i className="mdi mdi-dots-vertical text-gray-300 mr-2"></i>
                        </div>
                    </nav>
                    <div
                        className="h-full max-h-screen overflow-auto px-1 py-1"
                        id="journal-scroll"
                        style={{ minHeight: "300px" }}
                    >
                        {user !== null
                            ? messages.length > 0 &&
                              messages.map((m, i) => {
                                  return (
                                      <div key={i}>
                                          {to_id && to_id == m.from_id ? (
                                              <div className="flex items-center pt-2 pr-10">
                                                  <img
                                                      src="https://i.imgur.com/IAgGUYF.jpg"
                                                      className="rounded-full shadow-xl"
                                                      width="15"
                                                      height="15"
                                                      style={{ boxShadow: "" }}
                                                  />
                                                  <span className="text-md flex ml-1 h-auto bg-gray-900 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end">
                                                      {m.message}
                                                      <span
                                                          className="text-sm text-gray-400 pl-1"
                                                          style={{
                                                              fontSize: "10px"
                                                          }}
                                                      >
                                                          {m.created_at &&
                                                              new Date(
                                                                  m.created_at
                                                              ).toLocaleTimeString(
                                                                  [],
                                                                  {
                                                                      hour:
                                                                          "2-digit",
                                                                      minute:
                                                                          "2-digit"
                                                                  }
                                                              )}
                                                      </span>
                                                  </span>
                                              </div>
                                          ) : (
                                              <div className="flex justify-end pt-2 pl-10">
                                                  <span className="text-md bg-green-900 h-auto text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end ">
                                                      {m.message}
                                                      <span
                                                          className="text-gray-400 pl-1"
                                                          style={{
                                                              fontSize: "10px"
                                                          }}
                                                      >
                                                          {m.created_at &&
                                                              new Date(
                                                                  m.created_at
                                                              ).toLocaleTimeString(
                                                                  [],
                                                                  {
                                                                      hour:
                                                                          "2-digit",
                                                                      minute:
                                                                          "2-digit"
                                                                  }
                                                              )}
                                                      </span>
                                                  </span>
                                              </div>
                                          )}
                                      </div>
                                  );
                              })
                            : "hi"}

                        {/* <div className="flex justify-center">
                            
                            <span
                                className="text-gray-500 text-xs pt-4"
                                style={{ fontSize: "8px" }}
                            >
                                Call started at 02:33 am
                            </span>
                        </div>
                        <div className="flex justify-center">
                            
                            <span
                                className="text-gray-500 text-xs"
                                style={{ fontSize: "8px" }}
                            >
                                Call ended at 02:33 am
                            </span>
                        </div> */}
                    </div>
                    <div className="block p-1">
                        <div className="flex items-center flex-wrap w-full">
                            <button
                                onClick={() =>
                                    buttonMessage(
                                        `Hi ${fromName}, Sorry for keeping you waiting. My name is ${user.first_name ? user.first_name: user.last_name}, How can I help you`
                                    )
                                }
                                className="m-1 bg-purple-600 text-white px-6 text-md text-center py-1"
                            >
                                welcome
                            </button>
                            <button
                                onClick={() =>
                                    buttonMessage("Please hold on for me")
                                }
                                className="m-1 bg-green-600 text-white px-6 text-md text-center py-1"
                            >
                                Pause
                            </button>
                            <button
                                onClick={() => accept()}
                                className="m-1 bg-green-800 text-white px-6 text-md text-center py-1"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() =>
                                    closeChat("The chat session is closed")
                                }
                                className="m-1 bg-pink-600 text-white px-6 text-md text-center py-1"
                            >
                                Close
                            </button>
                        </div>
                        <form
                            onSubmit={sendMessage}
                            className="w-full flex justify-between items-center"
                        >
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    onChange={onChange}
                                    required
                                    value={message}
                                    autoComplete="off"
                                    className="text-md rounded-full pl-6 pl-4 pr-6 py-2 w-full focus:outline-none h-auto placeholder-gray-100 bg-gray-400 text-white"
                                    placeholder="Type a message..."
                                />
                            </div>
                            <div className="w-7 h-7 rounded-full bg-gray-400 text-center items-center flex justify-center hover:bg-gray-900 hover:text-white">
                                <i className="fa fa-microphone "></i>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-gray-400 text-center items-center flex justify-center">
                                <button className="w-7 h-7 text-purple-800 rounded-full text-center items-center flex justify-center focus:outline-none hover:bg-gray-900 hover:text-white">
                                    <i className="fa fa-paper-plane  "></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
