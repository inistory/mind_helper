import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Introduction from "./components/Intro";
import PersonalData from "./components/PersonalData";
import Psychometry from "./components/Psychometry";
import Result from "./components/Result";
import Recommend from "./components/Recommend";
import CounselorLogin from "./components/CounselorLogin";
import CounselorSignup from "./components/CounselorSignup";
import ChatCounselor from "./components/ChatCounselor";
import ChatUser from "./components/ChatUser";
import Chat from "./components/Chat/Chat";
import Search from "./components/map/SearchPlace";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Introduction} />
          <Route exact path="/personaldata" component={PersonalData} />
          <Route exact path="/psychometry" component={Psychometry} />
          <Route exact path="/result/:id" component={Result} />
          <Route exact path="/recommend" component={Recommend} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/counselorlogin" component={CounselorLogin} />
          <Route exact path="/counselorsignup" component={CounselorSignup} />
          <Route exact path="/chatcounselor" component={ChatCounselor} />
          <Route exact path="/chatuser" component={ChatUser} />
          <Route exact path="/chat" component={Chat} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
