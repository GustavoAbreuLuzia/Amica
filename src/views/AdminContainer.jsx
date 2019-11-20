import React from "react";

// Api
import api from "../Utils/api";

//Styles
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import AdminContainerStyle from "../assets/jss/material-kit-react/views/AdminContainer.jsx";

//Components
import HeaderAdmin from "../views/Components/HeaderAdmin.jsx";
import Protected from "../views/Components/Protected.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";
import AdminNews from "../views/Components/AdminNews.jsx";
import AdminContacts from "../views/Components/AdminContacts.jsx";
import AdminAdopt from "../views/Components/AdminAdopt.jsx";
import AdminPartner from "../views/Components/AdminPartner.jsx";
import AdminCompany from "../views/Components/AdminCompany.jsx";
import AdminUsers from "../views/Components/AdminUsers.jsx";
import AdminNewsDetails from "../views/Components/AdminNewsDetails.jsx";
import AdminAdoptDetails from "../views/Components/AdminAdoptDetails.jsx";
import AdminCompanyDetails from "../views/Components/AdminCompanyDetails.jsx";
import AdminUsersDetails from "../views/Components/AdminUsersDetails.jsx";

class AdminContainer extends React.Component {
    constructor(props) {
      super(props);    
      this.state = {
        listNews: [],
        currentPage: "News",
        dataObject: undefined
      };
      this.changeCurrentPage = this.changeCurrentPage.bind(this);
    }
    async componentDidMount(){
      window.scrollTo(0,0);

      const news = await api.get('/api/News', {
        params: {
          quantity: 100
        }
      });

      this.setState({listNews: news.data});
    }
    currentPage(){
      const currentPage = this.state.currentPage;
      
      if (currentPage === "News"){
        return <AdminNews changeCurrentPage={this.changeCurrentPage}/>;
      }
      else if (currentPage === "Contacts") {
        return <AdminContacts/>;
      }
      else if (currentPage === "Adopt") {
        return <AdminAdopt changeCurrentPage={this.changeCurrentPage}/>;
      }
      else if (currentPage === "Partners") {
        return <AdminPartner changeCurrentPage={this.changeCurrentPage}/>;
      }
      else if (currentPage === "Company") {
        return <AdminCompany changeCurrentPage={this.changeCurrentPage}/>;
      }
      else if (currentPage === "Users") {
        return <AdminUsers changeCurrentPage={this.changeCurrentPage}/>;
      }
      else if (currentPage === "NewsDetail") {
        return <AdminNewsDetails dataObject={this.state.dataObject}/>;
      }
      else if (currentPage === "AdoptDetail") {
        return <AdminAdoptDetails dataObject={this.state.dataObject}/>;
      }
      else if (currentPage === "CompanyDetail"){
        return <AdminCompanyDetails dataObject={this.state.dataObject}/>;
      }
      else if (currentPage === "UsersDetail"){
        return <AdminUsersDetails dataObject={this.state.dataObject}/>;
      }

      return <div/>;
    }
    changeCurrentPage(newPage, newDataObject) {
      if(this.state.currentPage !== newPage) {
        this.setState({currentPage: newPage});
      }      
      if(this.state.dataObject !== newDataObject) {
        this.setState({dataObject: newDataObject});
      }      
    }
    render() {
        const { classes } = this.props;
        return (  
          <Protected currentPage={
            <div className={classes.bottom}>
              <HeaderAdmin changePage={this.changeCurrentPage} />
              <div className={classNames(classes.main, classes.mainRaised)}>
                <GridContainer>
                  {this.currentPage()}
                </GridContainer>
              </div>
            </div>
          }
          />
        )
    }
}

export default withStyles(AdminContainerStyle)(AdminContainer);