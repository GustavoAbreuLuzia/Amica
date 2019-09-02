import React from "react";

// Route
import { Redirect } from 'react-router'    

// Api
import api from "../../Utils/api";

class ProtectedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginChecked: null
    }
  }
  //State login
  //componentDidMount call api to verify login
  //check state login on render
  //loading if login === null
  componentDidMount(){
    this.checkProtectedArea();
  }
  async checkProtectedArea(){
    const _this = this;
    const response = await api.get('/usersAdmin/login/check')
    .then((responseLogin) => {
      _this.setState({loginChecked: responseLogin.data.auth})
    })
    .catch((error) => {
      _this.setState({loginChecked: false})
    })
  }
  render() {
    if (this.state.loginChecked === null){
      return null;
    }
    else if (this.state.loginChecked){
      return this.props.currentPage;
    }
    else {
      return <Redirect
        to={{
          pathname: "/"
        }}
      />;
    }
  } 
}

export default ProtectedComponent;