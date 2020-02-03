import React from "react";

// Api
import api from "../Utils/api";

//Styles
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import ContactsStyle from "../assets/jss/material-kit-react/views/Contacts.jsx";

//Icons
import Person from "@material-ui/icons/Person";
import Mail from "@material-ui/icons/Mail";
import Phone from "@material-ui/icons/Phone";
import Subject from "@material-ui/icons/Subject";
import CatDog from "../assets/img/catDog.svg";
import CloseIcon from '@material-ui/icons/Close';

//Components
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import Info from "../components/Typography/Info.jsx";
import Muted from "../components/Typography/Muted.jsx";
import Button from '../components/CustomButtons/Button.jsx';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

class Contacts extends React.Component {
    constructor(props) {
      super(props);
      this.updateDimensions = this.updateDimensions.bind(this);
      this.handleCloseMailMessageSuccess = this.handleCloseMailMessageSuccess.bind(this);  
      this.handleCloseMailMessageFailure = this.handleCloseMailMessageFailure.bind(this);      
      this.state = {
        windowSize: 1280,
        windowHeight: 800,
        nameFilled: true,
        subjectFilled: true,
        messageFilled: true,
        name: "",
        mail: "",
        phone: "",
        subject: "",
        message: "",
        showMailSuccess: false,
        showMailFailure: false
      };
    }
    componentWillMount() {
      this.updateDimensions();
    }
    componentDidMount(){
      window.scrollTo(0,0);
      window.addEventListener("resize", this.updateDimensions);
      window.addEventListener("orientationchange", this.updateDimensions);

      this.predefinedMessage(this.props.location);
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
        this.setState({message: message});
      }
      else {
        this.setState({message: ""});
      }
    }
    updateInputState(stateName, newValue){
      this.setState({
        [stateName]: newValue.currentTarget.value
      });
    }
    async sendContact(){
      let fullFilled = true;

      if (this.state.name == undefined || this.state.name === ""){
        fullFilled = false;
        this.setState({nameFilled: false});
      }
      else {
        this.setState({nameFilled: true});
      }

      if (this.state.subject == undefined || this.state.subject === ""){
        fullFilled = false;
        this.setState({subjectFilled: false});
      }
      else {
        this.setState({subjectFilled: true});
      }

      if (this.state.message == undefined || this.state.message === ""){
        fullFilled = false;
        this.setState({messageFilled: false});
      }
      else {
        this.setState({messageFilled: true});
      }

      if(fullFilled){
        const _this = this;
        const mail = await api.post('/api/Contact', {
            name: this.state.name,
            mail: this.state.mail,
            phone: this.state.phone,
            subject: this.state.subject,
            message: this.state.message
          }
        )
        .then(() => {
          _this.setState({showMailSuccess: true});
        })
        .catch(() => {
          _this.setState({showMailFailure: true});
        })

        this.setState({name: "", mail: "", phone: "", subject: "", message: ""})
      }
    }
    handleCloseMailMessageSuccess(){
      if(this.state.showMailSuccess){
        this.setState({showMailSuccess: false});
      }
    }
    handleCloseMailMessageFailure(){
      if(this.state.showMailFailure){
        this.setState({showMailFailure: false});
      }
    }
    render() {
        const { classes } = this.props;
        const windowSizeDesktop = this.state.windowSize > 780;
        const windowHeightDesktop = this.state.windowHeight > 500;
        return (  
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <div className={classes.section}>
                <GridContainer justify="center">
                  <GridItem className={classes.gridItemTitle} xs={12} sm={12} md={8}>
                    <h2 className={classNames(classes.titleWrning, classes.title)}>Contactos</h2>
                  </GridItem>
                </GridContainer>
                <GridContainer xs={12} className={windowSizeDesktop ? "" : classes.containerMobile} justify={windowSizeDesktop ? "" : "center"}>
                  <GridContainer  xs={windowSizeDesktop ? 8 : 12}>
                    <GridItem xs={!windowSizeDesktop && windowHeightDesktop ? 12 : 6}>
                      <CustomInput
                        labelText="Nome"
                        id="material"
                        error={!this.state.nameFilled}
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            endAdornment: (<InputAdornment position="end"><Person/></InputAdornment>),
                            onChange: evt => this.updateInputState("name", evt),
                            maxLength: 100,
                            value: this.state.name
                        }}
                      />
                    </GridItem>
                    <GridItem xs={!windowSizeDesktop && windowHeightDesktop ? 12 : 6}>
                      <CustomInput
                        labelText="Email"
                        id="material"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            endAdornment: (<InputAdornment position="end"><Mail/></InputAdornment>),
                            onChange: evt => this.updateInputState("mail", evt),
                            maxLength: 100,
                            value: this.state.mail
                        }}
                      />
                    </GridItem>
                    <GridItem xs={!windowSizeDesktop && windowHeightDesktop ? 12 : 6}>
                      <CustomInput
                        labelText="Telefone"
                        id="material"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            endAdornment: (<InputAdornment position="end"><Phone/></InputAdornment>),
                            onChange: evt => this.updateInputState("phone", evt),
                            maxLength: 50,
                            value: this.state.phone
                        }}
                      />
                    </GridItem>
                    <GridItem xs={!windowSizeDesktop && windowHeightDesktop ? 12 : 6}>
                      <CustomInput
                        labelText="Assunto"
                        id="material"
                        error={!this.state.subjectFilled}
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            endAdornment: (<InputAdornment position="end"><Subject/></InputAdornment>),
                            onChange: evt => this.updateInputState("subject", evt),
                            maxLength: 50,
                            value: this.state.subject
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12}>
                      <CustomInput
                        labelText="Mensagem"
                        id="float"
                        error={!this.state.messageFilled}
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          onChange: evt => this.updateInputState("message", evt),
                          maxLength: 2500,
                          value: this.state.message
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} className={!windowSizeDesktop && windowHeightDesktop ? classes.contactSendMessageMobile : classes.contactSendMessage}>
                      <Button onClick={() => this.sendContact()} className={classes.buttonContactSendMessage} type="button" color="primary">Enviar Mensagem</Button>
                    </GridItem>                    
                  </GridContainer>
                  <GridContainer className={windowSizeDesktop ? classes.otherContacts : classes.otherContactsMobile} xs={windowSizeDesktop ? 4 : 12}>
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
                      <Muted>
                        <h6>Conta para Doações</h6>
                        <span className={classes.contactAccountSub}>IBAN:</span> 
                        PT50 0045 2216 4027 1549 63919
                        <br/>
                        <span className={classes.contactAccountSub}>IBAN/SWIFT:</span> 
                        CCCMPTPL
                      </Muted> 
                    </GridItem>
                  </GridContainer>
                </GridContainer>                
              </div>
            </div>
            <img className={!windowSizeDesktop && windowHeightDesktop ? classes.imgBackgroundMobile : classes.imgBackground} src={`${CatDog}`}></img>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.showMailSuccess}
              autoHideDuration={6000}
              onClose={this.handleCloseMailMessageSuccess}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Contato enviado com Sucesso!</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="close"
                  color="inherit"
                  className={classes.close}
                  onClick={this.handleCloseMailMessageSuccess}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.showMailFailure}
              autoHideDuration={6000}
              onClose={this.handleCloseMailMessageFailure}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Houve um erro ao enviar o contato, tente novamente mais tarde.</span>}
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
        )
    }
}

export default withStyles(ContactsStyle)(Contacts);