import React from "react";

//Styles
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import headerAdminStyle from "assets/jss/material-kit-react/views/landingPageSections/HeaderAdmin.jsx";

//Components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Header from "components/Header/Header.jsx";
import Button from "components/CustomButtons/Button.jsx";

class HeaderAdmin extends React.Component {
    constructor(props) {
      super(props);
      this.updateDimensions = this.updateDimensions.bind(this);
      this.state = {
        windowSize: 1280
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
      const { classes } = this.props;
      return (  
        <Header 
          color="white"
          fixed
          leftLinks={
            <List className={classes.list}>
              <ListItem className={classes.listItem}>                  
                <Button
                  color="transparent"
                >
                  Notícias                    
                </Button>
                <Button
                  color="transparent"
                >
                  Contatos                    
                </Button>                 
                <Button
                  color="transparent"
                >
                  Adoções
                </Button>                 
                <Button
                  color="transparent"
                >
                  Sócios
                </Button>                 
                <Button
                  color="transparent"
                >
                  Parceiros
                </Button>
              </ListItem>
            </List>
          }
          rightLinks={
            <List className={classes.list}>
              <ListItem className={classes.listItem}>
                <Button color="transparent">
                    LogOut
                </Button>
              </ListItem>
            </List>
          }
        />
      )
    }
}

export default withStyles(headerAdminStyle)(HeaderAdmin);