import React from "react";

// Router
import { NavLink } from "react-router-dom";  

//Styles
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
                  <Button
                    color="transparent"
                    className={
                      classes.navLink
                    }
                  >
                    <NavLink to="/Amica"
                      className={
                        classes.warningText + " " + 
                        classes.marginRight5 +
                        " fab"
                      }
                    >
                      <img width={100} src={require("../../assets/img/logoTransparent.png")}></img>
                    </NavLink>
                  </Button>
                </ListItem>
              </List>
            }
            rightLinks={
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <Button color="transparent">
                    <NavLink to="/Amica/Contacts"
                      className={
                        classes.textHeader +
                        " " +
                        classes.marginRight5
                      }
                    >
                      Contactos
                    </NavLink>
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button color="transparent" 
                    children={
                      <NavLink to="/Amica/Adopt"
                        className={
                          classes.textHeader +
                          " " +
                          classes.marginRight5
                        }
                      >
                        Adotar
                      </NavLink>
                    }
                  />
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button color="transparent" 
                    children={
                      <NavLink to="/Amica/Partner"
                        className={
                          classes.textHeader +
                          " " +
                          classes.marginRight5
                        }
                      >
                        Ser Sócio
                      </NavLink>
                    }
                  />
                </ListItem>
              </List>
            }
          />
        </div>
      )
    }
}

export default withStyles(productStyle)(HeaderComponent);