import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../../context/user/Context";
import ChatItem from "./ChatItem"

const ChatList = () => {
    const { loading, setLoading, user } = useContext(UserContext);
    const [chats, setChats] = useState(null);

    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*"
        }
    };

    //fetch requested chats
    useEffect(() => {
        axios
            .get(
                `${process.env.MIX_APP_API_URL}/fetch/all/requestedchats`,
                config
            )
            .then(res => {
                setChats(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    }, []);
    return (
        <div className="py-10 h-screen bg-gray-300 px-2">
            <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
                <div className="md:flex">
                    <div className="w-full p-4">
                        {/* 
                        // if loading is false
                        // if there is a user fetch
                        // if there chats
                        */}
                        {!loading ? (
                            <>
                                {chats !== null ? (
                                    <>
                                        {chats.length > 0 ? (
                                            <ul>
                                                {
                                                    chats.map((chat, i) =>{
                                                        return <ChatItem chat={chat} key={i} />
                                                    })
                                                }
                                                
                                            </ul>
                                        ) : (
                                            <div className="">
                                                No chats available
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="">loading Chats</div>
                                )}
                            </>
                        ) : (
                            <div className=""></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatList;
