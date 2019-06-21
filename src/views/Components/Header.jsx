import React from "react";

// Router
import { NavLink } from "react-router-dom";  

//Styles
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

//Components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Header from "components/Header/Header.jsx";
import Button from "components/CustomButtons/Button.jsx";

class HeaderComponent extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      const { classes, home } = this.props;
      if(home){
        window.scrollTo(0,0);
      }      
      return (            
        <div>
          <Header
            color={home ? "transparent" : "white"}
            fixed
            changeColorOnScroll={{
              height: 100,
              color: "white"
            }}
            leftLinks={
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <NavLink to={"/"}
                    className={
                      classes.warningText + " " + 
                      classes.marginRight5 +
                      " fab"
                    }
                  >
                    <Button
                      color="transparent"
                      className={
                        classes.navLink
                      }
                    >
                      <img width={100} src={require("../../assets/img/logoTransparent.png")}></img>                    
                    </Button>
                  </NavLink>
                </ListItem>
              </List>
            }
            rightLinks={
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <NavLink to={"/Contacts"}
                    className={classNames(classes.textHeader, classes.marginRight5)}
                  >
                    <Button color="transparent">
                        Contactos
                    </Button>
                  </NavLink>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <NavLink to={"/Adopt"}
                    className={classNames(classes.textHeader, classes.marginRight5)}
                  >
                    <Button color="transparent">
                      Adotar
                    </Button>
                  </NavLink>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <NavLink to={"/Partner"}
                    className={classNames(classes.textHeader, classes.marginRight5)}
                  >
                    <Button color="transparent">
                      Ser Sócio
                    </Button>
                  </NavLink>
                </ListItem>
              </List>
            }
          />
        </div>
      )
    }
}

export default withStyles(productStyle)(HeaderComponent);