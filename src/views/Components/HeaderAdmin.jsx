import React from "react";

// Api
import api from "../../Utils/api";

// Route
import { Route } from "react-router-dom"; 

//Styles
import withStyles from "@material-ui/core/styles/withStyles";
import headerAdminStyle from "../../assets/jss/material-kit-react/views/landingPageSections/HeaderAdmin.jsx";

//Components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Header from "../../components/Header/Header.jsx";
import Button from "../../components/CustomButtons/Button.jsx";

class HeaderAdmin extends React.Component {
    constructor(props) {
      super(props);
      this.updateDimensions = this.updateDimensions.bind(this);
      this.state = {
        windowSize: 1280,
        changePage: props.changePage
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
    changePage(page){
      this.state.changePage(page);
    }
    async logOut(history) {
      await api.delete('/api/usersAdmin/login/logout');
      history.push('/');
    }
    render() {
      const { classes } = this.props;
      const { windowSize } = this.state;
      const listButtons = <ListItem className={classes.listItem}>                  
          <Button
            color="transparent"
            onClick={() => this.changePage("News")}
          >
            Notícias                    
          </Button>
          <Button
            color="transparent"
            onClick={() => this.changePage("Contacts")}
          >
            Contatos                    
          </Button>                 
          <Button
            color="transparent"
            onClick={() => this.changePage("Adopt")}
          >
            Adoções
          </Button>                 
          {/* <Button
            color="transparent"
            onClick={() => this.changePage("Partners")}
          >
            Sócios
          </Button>                  */}
          <Button
            color="transparent"
            onClick={() => this.changePage("Company")}
          >
            Parceiros
          </Button>                 
          <Button
            color="transparent"
            onClick={() => this.changePage("Users")}
          >
            Usuários
          </Button>
        </ListItem>;
      return (  
        <Header 
          color="white"
          fixed
          leftLinks={ windowSize >= 780 ? <List className={classes.list}>{listButtons}</List> : null }
          rightLinks={
            <List className={classes.list}>
              { windowSize < 780 ? <List className={classes.list}>{listButtons}</List> : null }
              <ListItem className={classes.listItem}>
                <Route render={({ history }) => (
                  <Button 
                    color="transparent"
                    onClick={() => this.logOut(history)}
                  >
                      LogOut
                  </Button>
                )} />
              </ListItem>
            </List>
          }
        />
      )
    }
}

export default withStyles(headerAdminStyle)(HeaderAdmin);