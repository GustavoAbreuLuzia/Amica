import React from "react";

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

//Components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Info from "components/Typography/Info.jsx";
import Muted from "components/Typography/Muted.jsx";
import Button from 'components/CustomButtons/Button.jsx';

class Contacts extends React.Component {
    constructor(props) {
      super(props);
      this.updateDimensions = this.updateDimensions.bind(this);
      this.state = {
        windowSize: 1280,
        windowHeight: 800
      };
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
      if(window.innerWidth !== this.state.windowSize){
        this.setState({windowSize:  window.innerWidth});
      }

      if(window.innerHeight !== this.state.windowHeight){
        this.setState({windowHeight: window.innerHeight});
      }
    }
    predefinedMessage(location){
      const path = location.pathname.split("/");

      if(path.length > 2){
        const message = "Gostaria de adotar o animalzinho chamado " + path.pop() + ", quando podemos marcar para encontrar ele?";
        return message;
      }
      else {
        return null;
      }
    }
    render() {
        const { classes, location } = this.props;
        return (  
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <div className={classes.section}>
                <GridContainer justify="center">
                  <GridItem className={classes.gridItemTitle} xs={12} sm={12} md={8}>
                    <h2 className={classNames(classes.titleWrning, classes.title)}>Contactos</h2>
                  </GridItem>
                </GridContainer>
                <GridContainer xs={12} className={this.state.windowSize > 780 ? "" : classes.containerMobile} justify={this.state.windowSize > 780 ? "" : "center"}>
                  <GridContainer  xs={this.state.windowSize > 780 ? 8 : 12}>
                    <GridItem xs={this.state.windowSize < 780 && this.state.windowHeight > 500 ? 12 : 6}>
                      <CustomInput
                        labelText="Nome"
                        id="material"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            endAdornment: (<InputAdornment position="end"><Person/></InputAdornment>)
                        }}
                      />
                    </GridItem>
                    <GridItem xs={this.state.windowSize < 780 && this.state.windowHeight > 500 ? 12 : 6}>
                      <CustomInput
                        labelText="Email"
                        id="material"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            endAdornment: (<InputAdornment position="end"><Mail/></InputAdornment>)
                        }}
                      />
                    </GridItem>
                    <GridItem xs={this.state.windowSize < 780 && this.state.windowHeight > 500 ? 12 : 6}>
                      <CustomInput
                        labelText="Telefone"
                        id="material"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            endAdornment: (<InputAdornment position="end"><Phone/></InputAdornment>)
                        }}
                      />
                    </GridItem>
                    <GridItem xs={this.state.windowSize < 780 && this.state.windowHeight > 500 ? 12 : 6}>
                      <CustomInput
                        labelText="Assunto"
                        id="material"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            endAdornment: (<InputAdornment position="end"><Subject/></InputAdornment>)
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12}>
                      <CustomInput
                        labelText="Mensagem"
                        id="float"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          value: this.predefinedMessage(location)
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} className={this.state.windowSize < 780 && this.state.windowHeight > 500 ? classes.contactSendMessageMobile : classes.contactSendMessage}>
                      <Button className={classes.buttonContactSendMessage} type="button" color="primary">Enviar Mensagem</Button>
                    </GridItem>                    
                  </GridContainer>
                  <GridContainer className={this.state.windowSize > 780 ? classes.otherContacts : classes.otherContactsMobile} xs={this.state.windowSize > 780 ? 4 : 12}>
                    <GridItem className={classes.contactAlign}>
                      <a className={classes.contactIconFacebook} target={"_blank"} href={"https://www.facebook.com/pg/Associação-Amicus-Canis-AMICA-248535658531716"}>
                        <i className={classNames(classes.socialIcons, classes.contactIconFacebook) + " fab fa-facebook"} />
                        Facebook
                      </a>
                    </GridItem>
                    <br/>
                    <GridItem className={classNames(classes.contactMail, classes.contactAlign)}>
                      <Info>AssociacaoAmica@hotmail.com</Info> 
                    </GridItem>
                    <br/>
                    <GridItem className={classNames(classes.contactAccount, classes.contactAlign)}>
                      <Muted><h6>Conta para Doações</h6><span className={classes.contactAccountSub}>IBAN:</span> PT50 0045 2216 4027 1549 63919<br/><span className={classes.contactAccountSub}>IBAN/SWIFT:</span> CCCMPTPL</Muted> 
                    </GridItem>
                  </GridContainer>
                </GridContainer>                
              </div>
            </div>
            <img className={this.state.windowSize < 780 && this.state.windowHeight > 500 ? classes.imgBackgroundMobile : classes.imgBackground} src={CatDog}></img>
          </div>
        )
    }
}

export default withStyles(ContactsStyle)(Contacts);