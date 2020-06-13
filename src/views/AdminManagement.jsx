import React from "react";

// Api
import api from "../Utils/api";

// Route
import { Route } from "react-router-dom"; 

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import CloseIcon from '@material-ui/icons/Close';

// @material-ui/icons
import People from "@material-ui/icons/People";

// core components
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import Card from "../components/Card/Card.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import loginPageStyle from "../assets/jss/material-kit-react/views/loginPage.jsx";

import image from "../assets/img/Admin.jpg";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleCloseMailMessageFailure = this.handleCloseMailMessageFailure.bind(this);  
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      userName: '',
      password: '',
      userNameFilled: true,
      passwordFilled: true,
      showLoginFailed: false
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  updateInputState(stateName, newValue){
    this.setState({
      [stateName]: newValue.currentTarget.value
    });
  }
  handleEnterKey(e){
    if (e.key === 'Enter') {
      this.loginButton.click();
    }
  }
  login(history){
    let fullFilled = true;

    if (this.state.userName === undefined || this.state.userName === ""){
      fullFilled = false;
      this.setState({userNameFilled: false});
    } 
    else {
      this.setState({userNameFilled: true});
    }

    if (this.state.password === undefined || this.state.password === ""){
      fullFilled = false;
      this.setState({passwordFilled: false});
    } 
    else {
      this.setState({passwordFilled: true});
    }
    
    if(fullFilled){
      const _this = this;
      const login = api.post('/api/usersAdmin/login', {
        userName: this.state.userName,
        password: this.state.password
      })
      .then(() => {
        history.push('/AdminContainer');
      })
      .catch(() => {
        _this.setState({showLoginFailed: true});
      })
    }
  }
  handleCloseMailMessageFailure(){
    if(this.state.showLoginFailed){
      this.setState({showLoginFailed: false});
    }
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Login</h4>
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="User Name"
                        id="first"
                        error={!this.state.userNameFilled}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                          onChange: evt => this.updateInputState("userName", evt),
                          onKeyDown: evt => this.handleEnterKey(evt),
                          maxLength: 100,
                          value: this.state.userName
                        }}
                      />                      
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        error={!this.state.passwordFilled}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          onChange: evt => this.updateInputState("password", evt),
                          onKeyDown: evt => this.handleEnterKey(evt),
                          maxLength: 100,
                          value: this.state.password
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Route render={({ history }) => (
                        <Button simple color="primary" size="lg">
                          <span ref={input => this.loginButton = input} onClick={() => this.login(history)}>Entrar</span>
                        </Button>
                      )} /> 
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.showLoginFailed}
          autoHideDuration={6000}
          onClose={this.handleCloseMailMessageFailure}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Wrong user name or password!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={this.handleCloseMailMessageFailure}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
