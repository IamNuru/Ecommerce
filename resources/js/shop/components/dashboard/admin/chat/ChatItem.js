import React from "react";
import { Link } from "react-router-dom";

const ChatItem = props => {
    return (
        <>
            <Link to={`/admin/area/chat/${props && props.chat.id}/${props && props.chat.name}`}>
                <li className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                    <div className="flex ml-2">
                        <img
                            src="https://i.imgur.com/aq39RMA.jpg"
                            width="40"
                            height="40"
                            className="rounded-full"
                        />
                        <div className="flex flex-col ml-2">
                            <span className="font-medium text-black">
                                {props ? props.chat.name : "wait..."}
                            </span>
                            <span className="text-sm text-gray-400 truncate w-32">
                                Hey, Joel, I here to help you out please tell me
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-gray-300">
                            {props
                                ? new Date(
                                      props.chat.created_at
                                  ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit"
                                  })
                                : "Wait..."}
                        </span>
                        <i className="fa fa-star text-green-400"></i>
                    </div>
                </li>
            </Link>
        </>
    );
};

export default ChatItem;
