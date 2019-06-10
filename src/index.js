import React from "react";

// Route
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";

// Style
import "assets/scss/material-kit-react.scss?v=1.4.0";

// Transitions
import {TransitionGroup, Transition} from "react-transition-group"
import { play, exit } from 'assets/js/transitions.js'

// Components
import HeaderComponent from "views/Components/Header";
import Footer from "components/Footer/Footer.jsx";

// Pages
import Home from "views/Home.jsx";
import Contacts from "views/Contacts.jsx";
import Adopt from "views/Adopt.jsx";
import Partner from "views/Partner.jsx";

ReactDOM.render(  
      <BrowserRouter>
        <div className="content">
          <Route render={({ location }) => {
            const { pathname, key } = location;
            return (
              <div>
              <HeaderComponent home={location.pathname === "/Amica" || location.pathname === "/Amica/" ? true : false}></HeaderComponent>
              <TransitionGroup component={null}>
                <Transition
                  key={key}
                  appear={true}
                  onEnter={(node, appears) => play(pathname, node, appears)}
                  onExit={(node, appears) => exit(node, appears)}
                  timeout={{enter: 750, exit: 150}}
                >
                  <Switch location={location}>
                    <Route exact path="/Amica" component={Home}/>
                    <Route path="/Amica/Contacts" render={(props) => <Contacts {...props}/>}/>
                    <Route path="/Amica/Adopt" component={Adopt}/>
                    <Route path="/Amica/Partner" component={Partner} />
                  </Switch>
                </Transition>
                <Transition
                  key={Math.random()}
                  appear={true}
                  onEnter={(node, appears) => play(pathname, node, appears)}
                  onExit={(node, appears) => exit(node, appears)}
                  timeout={{enter: 800, exit: 150}}
                >
                  <Footer /> 
                </Transition>
              </TransitionGroup>
              </div>
            )
          }}/>    
        </div>      
      </BrowserRouter>,
  document.getElementById("root")
);
