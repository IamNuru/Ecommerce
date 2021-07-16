import React, { Fragment } from "react";
import img from "../../images/unauthorised.svg";
import { Link } from "react-router-dom";

const UnAuthorisedPage = () => {
  return (
    <Fragment>
      <div className="block w-full mt-16">
        <img
          src={img}
          alt="Pge Not Found"
          className="text-center w-full h-2/3 md:w-96 m-auto"
        />
        <p className="mt-4 text-center">
          You are not authorised to visit that page{" "}
          <Link to="/" className="px-1 text-xl text-purple-800">
            <i className="fa fa-home px-1"></i>Home
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

export default UnAuthorisedPage;
