import React from "react";
import Main from "./Main";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import Help from "./Help";
import Chat from "./chatbot/Chat"
import RequestLiveChatForm from "./dashboard/admin/chat/RequestLiveChatForm";
import UserChatBox from "./dashboard/admin/chat/UserChatBox";
import AdminDashboard from "./dashboard/admin";
import ProfileMain from "./dashboard/profile/ProfileMain";
import Profile from "./dashboard/profile/Profile";
import Dashboard from "./adminDashboard/pages/Dashboard";


const Home = (props) => {
  return (
    <div className="h-full min-h-full">
      <Switch>
        <AdminRoute exact path="/admin/area" component={Dashboard} />
        <AdminRoute exact path="/admin/area/*" component={Dashboard} />
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
