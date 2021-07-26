import React, { useState } from "react";
import axios from "axios";

const RequestLiveChatForm = (props) => {
    const [data, setData] = useState({
        username:"",
        message:""
    });
    const [errorMsg, setErrorMsg] = useState("");

    const { username, message } = data;

    const onChange = e => {
        setData({...data, [e.target.name]:e.target.value});
    };

    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*"
        }
    };

    const requestLiveChat = e => {
        e.preventDefault();
        if (username === "" || message==="") {
            setErrorMsg("The name field is required");
            return false;
        } else if (username.length < 3 || message.length < 3) {
            setErrorMsg("Your Name and message must be at least 3 characters");
            return false;
        } else if (username.length > 15) {
            setErrorMsg("Your Name must be between 3 and 15 characters");
            return false;
        } else {
            console.log(data)
                axios.post(
                    `${process.env.MIX_APP_API_URL}/request-live-chat`,
                    data,
                    config
                )
                .then(res => {
                    props.history.push(`/chat/${res.data.id}/${res.data.name}`);
                    
                })
                .catch(err => {
                    //set error message to server error message
                    setErrorMsg(Object.values(err.response.data.errors)[0])
                });
        }
    };
    return (
        <div className="pt-8 md:pt-32 max-w-xs m-auto">
            <form onSubmit={requestLiveChat} className="shadow-2xl bg-white p-4 h-96">
                <div className="block">
                    <label>
                        Your Name
                        <input
                            type="text"
                            name="username"
                            onChange={onChange}
                            value={username}
                            placeholder="Your Name"
                            className="outline-none pl-2 py-1.5 mt-2.5 w-full border border-gray-400 focus:border-purple-300"
                        />
                    </label>
                    <label className="mt-8">
                        Message
                        <textarea
                            type="text"
                            name="message"
                            onChange={onChange}
                            value={message}
                            placeholder="What do you want"
                            className="outline-none pl-2 py-1.5 mt-2.5 w-full border border-gray-400 focus:border-purple-300"
                        >
                            </textarea>
                    </label>
                </div>
                {errorMsg !== null && (
                    <div className="w-full text-red-600 text-sm py-2 px-4 my-1">
                        {errorMsg}
                    </div>
                )}
                <div className="w-full text-center">
                    <button
                        type="submit"
                        className="w-48 bg-purple-600 rounded-md text-white text-md font-bold text-center py-1"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RequestLiveChatForm;
