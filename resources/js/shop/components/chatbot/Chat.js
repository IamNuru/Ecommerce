import React from "react";
import Chatbot from "react-simple-chatbot";
import CheckOrderStatus from "./CheckOrderStatus";
import { ThemeProvider } from "styled-components";
import "../../styles/chat/style.css";
import { Link } from "react-router-dom";

const Chat = () => {
  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#EF6C00",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#EF6C00",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };
  return (
    <ThemeProvider theme={theme}>
      <Link to="/" className="text-purple-600 mt-4 mb-2">
        <i className="fa fa-arrow-left px-2"></i>
        <span>Back Home</span>
      </Link>
      <div className="text-center w-full md:w-2/3 m-auto px-4 md:px-8">
        <Chatbot
          headerTitle="Chat with us"
          className="text-gray-800"
          steps={[
            {
              id: "1",
              message: "Please provide some basic info about your self",
              trigger: "2",
            },
            {
              id: "2",
              message: "What is Your name?",
              trigger: "entername",
            },
            {
              id: "entername",
              user: true,
              placeholder: "Please Enter your name",
              validator: (value) => {
                if (value === "") {
                  return "Name cannot be empty";
                }
                return true;
              },
              trigger: "enteremail",
            },
            {
              id: "enteremail",
              message: "Enter Your Email?",
              trigger: "3",
            },
            {
              id: "3",
              placeholder: "Please Enter your email",
              user: true,
              validator: (value) => {
                if (value === "") {
                  return "Email cannot be empty";
                }
                return true;
              },
              trigger: "4",
            },
            {
              id: "4",
              message: "Good",
              trigger: "5",
            },
            {
              id: "5",
              message: "Please What help do you need from us?",
              trigger: "6",
            },
            {
              id: "5",
              options: [
                {
                  value: 1,
                  label: "Check order status",
                  trigger: "order_number",
                },
                {
                  value: 2,
                  label: "How to Place an Order",
                  trigger: "how_to_place_order",
                },
                { value: 3, label: "Our Contacts", trigger: "our_contacts" },
              ],
            },

            /** Check about my order */
            {
              id: "order_number",
              message: "Please Enter Order Number",
              trigger: "order_num",
            },
            {
              id: "order_num",
              user: true,
              validator: (value) => {
                if (isNaN(value)) {
                  return "value should be a number";
                }
                return true;
              },
              trigger: "order_status",
            },
            {
              id: "order_status",
              component: <CheckOrderStatus previousStep />,
              trigger: "5",
            },
            {
              id: "7",
              message: "What else?",
              trigger: "8",
            },
            {
              id: "8",
              options: [
                { value: 1, label: "Start Over", trigger: "5" },
                {
                  value: 2,
                  label: "Check Another Order",
                  trigger: "order_number",
                },
              ],
            },

            /**Placing an Order */

            {
              id: "how_to_place_order",
              message:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores a modi, ullam nulla ut similique exercitationem dolor. Reprehenderit vel doloribus minima quis magnam sunt commodi similique, provident voluptate aperiam libero ducimus blanditiis laboriosam modi nulla pariatur itaque repellendus voluptates, cupiditate sit laborum porro at. Ipsum?",
              trigger: "5",
            },

            /** Our contacts */

            {
              id: "our_contacts",
              message:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores a modi, ullam nulla ut similique exercitationem dolor. Reprehenderit vel doloribus minima quis magnam sunt commodi similique, provident voluptate aperiam libero ducimus blanditiis laboriosam modi nulla pariatur itaque repellendus voluptates, cupiditate sit laborum porro at. Ipsum?",
              trigger: "5",
            },
          ]}
        />
      </div>
    </ThemeProvider>
  );
};

export default Chat;
