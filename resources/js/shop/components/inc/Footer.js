import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const Footer = (props) => {

    useEffect(() => {
        window.scroll(0,0)
        return () => {
            window.scroll(0,0)
        }
    }, [props])


  return (
    <>
      <div className="sticky bg-black w-full z-50 text-white text-center py-4 text-md">
        This project was built using <a href="http://raectjs.org" className="text-purple-600">react</a> and <a href="http://tailwindcss.com" className="text-purple-600">tailwind</a> css. The back-end is built using <a href="https://laravel.com" className="text-purple-600">Laravel</a>.{" "}
        <a href="https://iamnuru.github.io" className="text-red-600">
          Explore
        </a>{" "}
        some of my works. Email me via{" "}
        <a href="mailto:abdulainurudeentitiaka@gmail.com" className="text-purple-800">
          abdulainurudeentitiaka@gmail.com
        </a>
      </div>
    </>
  );
};

export default withRouter(Footer);
