import React from "react";
import Main from "./Main";
import { Switch, Route } from "react-router-dom";
import Profile from "./profile/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import ProfileMain from "./profile/ProfileMain";
import Help from "./Help";
import Chat from "./chatbot/Chat"
import RequestLiveChatForm from "./dashboard/chat/RequestLiveChatForm";
import UserChatBox from "./dashboard/chat/UserChatBox";
import AdminDashboard from "./dashboard/admin";

const Home = (props) => {
  return (
    <div className="h-full">
      <Switch>

        <AdminRoute exact path="/admin/area" component={AdminDashboard}/>
        <AdminRoute exact path="/admin/area/*" component={AdminDashboard}/>
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/account/*" component={ProfileMain}/>
        <Route exact path="/help" component={Help}/>
        <Route exact path="/request-live-chat" component={RequestLiveChatForm}/>
        <Route exact path="/chat/:id/:name" component={UserChatBox}/>
        <Route exact path="/chatbot" component={Chat}/>
        <Route path="" component={Main} />
      </Switch>
    </div>
  );
};

export default Home;
