import React from "react";
import { Link } from "react-router-dom";

const HelpLink = () => {
  return (
    <div className="fixed bottom-0 right-0 mb-24 z-50 mb-4">
      <Link to="/help">
        <i
          title="Help"
          className="fa fa-question-circle text-red-400 text-5xl shadow-2xl"
        ></i>
      </Link>
    </div>
  );
};

export default HelpLink;
