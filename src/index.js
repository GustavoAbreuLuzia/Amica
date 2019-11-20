import "@babel/polyfill";
import React from "react";

// Route
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";

// Style
import "./assets/scss/material-kit-react.scss?v=1.4.0";

// Transitions
import {TransitionGroup, Transition} from "react-transition-group"
import { play, exit } from './assets/js/transitions.js'

// Components
import HeaderComponent from "./views/Components/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Pages
import Home from "./views/Home.jsx";
import Contacts from "./views/Contacts.jsx";
import Adopt from "./views/Adopt.jsx";
import Partner from "./views/Partner.jsx";
import News from "./views/News.jsx";
import AdminManagement from "./views/AdminManagement.jsx";
import AdminContainer from "./views/AdminContainer.jsx"
import Us from "./views/Us.jsx"

ReactDOM.render(  
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="content">
          <Route render={({ location }) => {
            const { pathname, key } = location;
            return (
              <div>
                <HeaderComponent admin={pathname.indexOf("Admin") >= 0} home={pathname === "/" ? true : false}></HeaderComponent>
                <TransitionGroup component={null}>
                  <Transition
                    key={key}
                    appear={true}
                    onEnter={(node, appears) => play(pathname, node, appears)}
                    onExit={(node, appears) => exit(node, appears)}
                    timeout={{enter: 750, exit: 150}}
                  >
                    <Switch location={location}>
                      <Route exact path={"/"} component={Home}/>
                      <Route path={"/Contacts"} render={(props) => <Contacts {...props}/>}/>
                      <Route path={"/Adopt"} component={Adopt}/>
                      <Route path={"/Partner"} component={Partner} />
                      <Route path={"/News/:id"} component={News} />
                      <Route path={"/AdminManagement"} component={AdminManagement} />  
                      <Route path={"/AdminContainer"} component={AdminContainer} />  
                      <Route path={"/Us"} component={Us} />  
                    </Switch>
                  </Transition>
                </TransitionGroup>
                
                <Footer admin={pathname.indexOf("Admin") >= 0} /> 
              </div>
            )
          }}/>    
        </div>      
      </BrowserRouter>,
  document.getElementById("root")
);
