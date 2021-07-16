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
        This project was built using <a href="http://raectjs.org">react</a> and <a href="http://tailwindcss.com">tailwind</a> css with an Api built by me using <a href="https://laravel.com">Laravel</a>.{" "}
        <a href="https://iamnuru.github.io" className="text-red-600">
          Explore
        </a>{" "}
        some of my works. Please consider hiring me if you deem it fit :). Email
        me via{" "}
        <a href="mailto:abdulainurudeentitiaka@gmail.com" className="text-purple-800">
          abdulainurudeentitiaka@gmail.com
        </a>
      </div>
    </>
  );
};

export default withRouter(Footer);
