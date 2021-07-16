import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/Context";

const UserChatBox = props => {
    // const { user } = useContext(AuthContext);
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            "Access-Control-Allow-Origin": "*"
        }
    };

    const [id] = useState(props.match.params.id);
    const [username, setUsername] = useState(props.match.params.name);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [sent, setSent] = useState(false);
    const [chatInfo, setChatInfo] = useState(null);
    const [from, setFrom] = useState(null);
    const [closeChatting, setCloseChatting] = useState(false);

    const onChange = e => {
        setMessage(e.target.value);
    };

    //find if chat user exist
    useEffect(() => {
        
        const getChatUser = async () => {
            await axios
                .get(
                    `${process.env.MIX_APP_API_URL}/find/chat/user/${id}`,
                    config
                )
                .then(res => {
                    setChatInfo(res.data);
                    setFrom(res.data.user_id)
                })
                .catch(err => {
                    setChatInfo(null);
                });
        };
        
        getChatUser();

        /* return () => {
            setChatInfo(null);
        }; */
    }, [sent]);

    useEffect(() => {
        const fetchMessages = async () => {
            await axios
                .get(
                    `${process.env.MIX_APP_API_URL}/messages/${id}/${from && from}`,
                    config
                )
                .then(res => {
                    setMessages(res.data);
                    setSent(false);
                })
                .catch(err => {
                    console.log("non");
                });
        };

        fetchMessages();
        Echo.channel("shop").listen("MessageSent", e => {
            messages.push({ message: e.message });
            //setMessages({message: [...message , e.message]})
            if (e.message.message === "The chat session is closed") {
                setCloseChatting(true);
            }
        });

        // eslint-disable-next-line
    }, [sent, from]);

    const sendMessage = e => {
        e.preventDefault();
        setSent(true);
        const data = { message: message };
        axios
            .post(
                `${process.env.MIX_APP_API_URL}/message/from/user/${id}/${from}`,
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
                            <span className="text-xs capitalize font-medium text-gray-300 ml-1">
                                {username && username}
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
                        {messages.length > 0 ? (
                            messages.map((m, i) => {
                                return (
                                    <div key={i}>
                                        {id && id == m.to_id ? (
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
                                                    {/* <span
                                                        className="text-sm text-gray-400 pl-1"
                                                        style={{
                                                            fontSize: "10px"
                                                        }}
                                                    >
                                                        {m.created_at.toString() &&
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
                                                    </span> */}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex justify-end pt-2 pl-10">
                                                <span className="text-md bg-green-900 h-auto text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end ">
                                                    {m.message}
                                                    {/* <span
                                                        className="text-gray-400 pl-1"
                                                        style={{
                                                            fontSize: "10px"
                                                        }}
                                                    >
                                                        {m.created_at.toString()  &&
                                                            new Date(
                                                                m.created_at
                                                            ).toLocaleTimeString(
                                                                [],
                                                                {
                                                                    hour:
                                                                        "2-digit",
                                                                    minutes:
                                                                        "2-digit"
                                                                }
                                                            )}
                                                    </span> */}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center">
                                <div className="">
                                    Connecting you to an agent
                                </div>
                                <div className="">Please wait ...</div>
                            </div>
                        )}
                        {chatInfo !== null && chatInfo.active == 1 && (
                            <div className="block text-center">
                                <div
                                    className="text-gray-500 pt-4"
                                    style={{ fontSize: "11px" }}
                                >
                                    Your are now connected with an agent
                                </div>
                            </div>
                        )}
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
                        {chatInfo !== null &&
                            chatInfo.user_id !== null &&
                            chatInfo.active == 0 && (
                                <div className="block text-center">
                                    <div
                                        className="text-gray-500 pt-4"
                                        style={{ fontSize: "11px" }}
                                    >
                                        Chat Closed
                                    </div>
                                    <Link
                                        to="/request-live-chat"
                                        className="text-purple-600 pt-4"
                                        style={{ fontSize: "12px" }}
                                    >
                                        Start new session
                                    </Link>
                                </div>
                            )}
                    </div>

                    <div className="flex justify-between items-center p-1 ">
                        <form
                            onSubmit={sendMessage}
                            className="w-full flex justify-between items-center mx-4"
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

export default UserChatBox;
