import React from "react";
import HelpSign from "../images/help.svg";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="block mt-8 md:w-2/3 px-8">
      <Link to="/" className="text-purple-600 mb-4">
        <i className="fa fa-arrow-left px-2"></i>
        <span>Back Home</span>
      </Link>
      <div className="h-56 w-full py-4 text-center">
        <img src={HelpSign} alt="help" className="w-56 h-full m-auto" />
      </div>
      <div className="flex">
        <div className="icon w-8 h-8 rounded-full fa fa-user"></div>
        <Link
          to="/chatbot"
          className="text-purple-600 hover:text-pink-600 transition duration-500"
        >
          Head over to our Live Chat Bot
        </Link>
      </div>
      <div className="flex">
        <div className="icon w-8 h-8 rounded-full fa fa-users"></div>
        <Link
          to="/request-live-chat"
          className="text-purple-600 hover:text-pink-600 transition duration-500"
        >
          Request to chat with agent
        </Link>
      </div>
      <div className="flex">
        <div className="icon w-8 h-8 rounded-full fa fa-phone"></div>
        <p className="">+233543027058</p>
      </div>
      <div className="flex">
        <div className="icon w-8 h-8 rounded-full fa fa-twitter"></div>
        <p className="">twitter</p>
      </div>
      <div className="flex">
        <div className="icon w-8 h-8 rounded-full fa fa-facebook"></div>
        <p className="">facebook</p>
      </div>
    </div>
  );
};

export default Help;
