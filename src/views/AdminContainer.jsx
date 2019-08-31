import React from "react";

// Api
import api from "../Utils/api";

//Styles
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import ContactsStyle from "assets/jss/material-kit-react/views/Contacts.jsx";

//Icons
import Person from "@material-ui/icons/Person";
import Mail from "@material-ui/icons/Mail";
import Phone from "@material-ui/icons/Phone";
import Subject from "@material-ui/icons/Subject";
import CatDog from "assets/img/catDog.svg";
import CloseIcon from '@material-ui/icons/Close';

//Components
import HeaderAdmin from "views/Components/HeaderAdmin";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import MaterialTable from "material-table";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Info from "components/Typography/Info.jsx";
import Muted from "components/Typography/Muted.jsx";
import Button from 'components/CustomButtons/Button.jsx';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

class AdminContainer extends React.Component {
    constructor(props) {
      super(props);
      this.updateDimensions = this.updateDimensions.bind(this);     
      this.state = {
        windowSize: 1280,
        windowHeight: 800,
        listNews: []
      };
    }
    componentWillMount() {
      this.updateDimensions();
    }
    async componentDidMount(){
      window.scrollTo(0,0);
      window.addEventListener("resize", this.updateDimensions);
      window.addEventListener("orientationchange", this.updateDimensions);

      const news = await api.get('/News', {
        params: {
          quantity: 100
        }
      });

      this.setState({listNews: news.data});
    }
    componentWillUnmount(){
      window.removeEventListener("resize", this.updateDimensions);
      window.removeEventListener("orientationchange", this.updateDimensions);
    } 
    updateDimensions() {
      if(window.innerWidth !== this.state.windowSize){
        this.setState({windowSize:  window.innerWidth});
      }

      if(window.innerHeight !== this.state.windowHeight){
        this.setState({windowHeight: window.innerHeight});
      }
    }
    render() {
        const { classes } = this.props;
        const windowSizeDesktop = this.state.windowSize > 780;
        const windowHeightDesktop = this.state.windowHeight > 500;
        return (  
          <div>
            <HeaderAdmin />
            <div className={classNames(classes.main, classes.mainRaised)}>
              <GridContainer>
                <MaterialTable
                  title="Notícias"
                  columns={[
                    { title: 'Título', field: 'title' },
                    { title: 'Descrição', field: 'description' }
                  ]}
                  data={this.state.listNews}        
                  actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Editar',
                      onClick: (event, rowData) => alert("You saved " + rowData.title)
                    }
                  ]}
                  localization={{
                    header: {
                      actions: "Ações"
                    }
                  }}
                />
              </GridContainer>
            </div>
          </div>
        )
    }
}

export default withStyles(ContactsStyle)(AdminContainer);