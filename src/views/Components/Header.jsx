import React from "react";

// Router
import { NavLink } from "react-router-dom";  

//Styles
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import productStyle from "../../assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

//Components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Header from "../../components/Header/Header.jsx";
import Button from "../../components/CustomButtons/Button.jsx";

class HeaderComponent extends React.Component {
    constructor(props) {
      super(props);
      this.updateDimensions = this.updateDimensions.bind(this);
      this.state = {
        windowSize: 1280,
        home: false
      }
    }
    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount(){
        window.scrollTo(0,0);
        window.addEventListener("resize", this.updateDimensions);
        window.addEventListener("orientationchange", this.updateDimensions);
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.updateDimensions);
        window.removeEventListener("orientationchange", this.updateDimensions);
    } 
    updateDimensions() {
        this.setState({windowSize: window.innerWidth});
    }
    render() {
      const { classes, home } = this.props;
      if(home && !this.state.home){
        window.scrollTo(0,0);
      }      
      if (home !== this.state.home){
        this.setState({home: home});
      }
      return (            
        this.props.admin ? null :
        <div>
          <Header
            color={home ? "transparent" : "white"}
            fixed
            changeColorOnScroll={{
              height: this.state.windowSize > 780 ? 100 : 20,
              color: "white"
            }}
            leftLinks={
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <NavLink to={"/"}
                    onClick={() => window.scrollTo(0,0)}
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