import React from "react";

// Api
import api from "../Utils/api";

//Styles
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import PartnersStyle from "../assets/jss/material-kit-react/views/Partners.jsx";

//Components
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import Button from '../components/CustomButtons/Button.jsx';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ListCompany from "../views/Components/ListCompany.jsx";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

//Icons
import Check from "@material-ui/icons/Check";
import CloseIcon from '@material-ui/icons/Close';

class Partners extends React.Component {
    constructor(props) {
      super(props);
      this.updateDimensions = this.updateDimensions.bind(this);
      this.handleCloseMailMessageSuccess = this.handleCloseMailMessageSuccess.bind(this);  
      this.handleCloseMailMessageFailure = this.handleCloseMailMessageFailure.bind(this);  
      this.state = {
          listCompany: null,
          checked: false,
          windowSize: 1280,
          windowHeight: 800,
          name: "",
          document: "",
          date: null,
          address: "",
          city: "",
          postalCode: "",
          mail: "",
          job: "",
          phone: "",
          nameFilled: true,
          documentFilled: true,
          addressFilled: true,
          cityFilled: true,
          postalCodeFilled: true,
          mailFilled: true,
          jobFilled: true,
          phoneFilled: true,
          showMailSuccess: false,
          showMailFailure: false
      }
    }
    componentWillMount() {
      this.updateDimensions();
    }
    async componentDidMount(){
      window.scrollTo(0,0);
      window.addEventListener("resize", this.updateDimensions);
      window.addEventListener("orientationchange", this.updateDimensions);

      const companies = await api.get('/api/company', {
        params: {
          quantity: 50
        }
      });

      this.setState({listCompany: companies.data});
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
    handleDateChange(date) {
        var x = [];
        x["date"] = date;
        this.setState(x);
    }
    handleToggle() {
        this.setState({checked: !this.state.checked});
    }
    updateInputState(stateName, newValue){
      this.setState({
        [stateName]: newValue.currentTarget.value
      });
    }
    async sendRegistry(){
        let fullFilled = true;

        if (this.state.name == undefined || this.state.name === ""){
            fullFilled = false;
            this.setState({nameFilled: false});
        }
        else {
            this.setState({nameFilled: true});
        }

        if (this.state.document == undefined || this.state.document === ""){
            fullFilled = false;
            this.setState({documentFilled: false});
        }
        else {
            this.setState({documentFilled: true});
        }

        if (this.state.date == undefined || this.state.date === ""){
            fullFilled = false;
            this.setState({dateFilled: false});
        }
        else {
            this.setState({dateFilled: true});
        }

        if (this.state.address == undefined || this.state.address === ""){
            fullFilled = false;
            this.setState({addressFilled: false});
        }
        else {
            this.setState({addressFilled: true});
        }

        if (this.state.city == undefined || this.state.city === ""){
            fullFilled = false;
            this.setState({cityFilled: false});
        }
        else {
            this.setState({cityFilled: true});
        }

        if (this.state.postalCode== undefined || this.state.postalCode === ""){
            fullFilled = false;
            this.setState({postalCodeFilled: false});
        }
        else {
            this.setState({postalCodeFilled: true});
        }

        if (this.state.mail == undefined || this.state.mail === ""){
            fullFilled = false;
            this.setState({mailFilled: false});
        }
        else {
            this.setState({mailFilled: true});
        }

        if (this.state.job == undefined || this.state.job === ""){
            fullFilled = false;
            this.setState({jobFilled: false});
        }
        else {
            this.setState({jobFilled: true});
        }

        if (this.state.phone == undefined || this.state.phone === ""){
            fullFilled = false;
            this.setState({phoneFilled: false});
        }
        else {
            this.setState({phoneFilled: true});
        }

        if(fullFilled){
            const _this = this;
            const mail = await api.post('/api/partner', {
                name: this.state.name,
                document: this.state.document,
                birthday: this.state.date,
                address: this.state.address,
                city: this.state.city,
                postalCode: this.state.postalCode,
                mail: this.state.mail,
                job: this.state.job,
                phone: this.state.phone
            })
            .then(() => {
                _this.setState({showMailSuccess: true});
            })
            .catch(() => {
                _this.setState({showMailFailure: true});
            })

            this.setState({name: "",
                document: "",
                date: null,
                address: "",
                city: "",
                postalCode: "",
                mail: "",
                job: "",
                phone: ""
            })
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
                                <h2 className={classNames(classes.titleWrning, classes.title)}>Ser Sócio</h2>
                            </GridItem>
                        </GridContainer>
                        <GridContainer xs={12} className={windowSizeDesktop ? "" : classes.containerMobile}>
                            <GridItem xs={12}>
                                <p className={classes.primaryColor}>
                                A Associação AMICA, esteriliza, alimenta e cuida de animais que tem ao seu cuidado, e dá os cuidados veterinários aos que deles carecem quando resgatados. Para isso, precisa de recursos monetários por vezes escassos. Mas pode ajudar a nossa causa!
                                <br/>
                                Ser sócio da AMICA dá-lhe um cartão com muitas vantagens!
                                <br/>
                                São 15 € por ano e o cartão tem validade anual. Com o cartão, tem acesso a descontos em várias empresas "amigas" dos animais.
                                </p>
                            </GridItem>
                            <GridItem xs={windowSizeDesktop ? 6 : 12}>
                                <CustomInput
                                    labelText="Nome"
                                    id="nome"
                                    error={!this.state.nameFilled}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: evt => this.updateInputState("name", evt),
                                        maxLength: 100,
                                        value: this.state.name
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={windowSizeDesktop ? 4 : 12}>
                                <CustomInput
                                    labelText="Número Contribuinte"
                                    id="numContribuinte"
                                    error={!this.state.documentFilled}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: evt => this.updateInputState("document", evt),
                                        maxLength: 100,
                                        value: this.state.document
                                    }}
                                />
                            </GridItem> 
                            <GridItem xs={windowSizeDesktop ? 2 : 12}>
                                <CustomInput
                                    datepicker={true}
                                    labelText="Data de Nascimento"
                                    id="dataNascimento"
                                    dateFormat="dd/MM/yyyy"
                                    valueDate={this.state.date}
                                    formControlProps={{
                                        fullWidth: true,
                                        value: this.state.date
                                    }}
                                    onChangeDate={date => this.handleDateChange(date)}
                                />
                            </GridItem>
                            <GridItem xs={windowSizeDesktop ? 6 : 12}>
                                <CustomInput
                                    labelText="Morada"
                                    id="morada"
                                    error={!this.state.addressFilled}
                                    formControlProps={{
                                        fullWidth: true                                        
                                    }}
                                    inputProps={{
                                        onChange: evt => this.updateInputState("address", evt),
                                        maxLength: 100,
                                        value: this.state.address
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={windowSizeDesktop ? 4 : 12}>
                                <CustomInput
                                    labelText="Localidade"
                                    id="localidade"
                                    error={!this.state.cityFilled}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: evt => this.updateInputState("city", evt),
                                        maxLength: 100,
                                        value: this.state.city
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={windowSizeDesktop ? 2 : 12}>
                                <CustomInput
                                    labelText="Código Postal"
                                    id="codigoPostal"
                                    error={!this.state.postalCodeFilled}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: evt => this.updateInputState("postalCode", evt),
                                        maxLength: 100,
                                        value: this.state.postalCode
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={windowSizeDesktop ? 6 : 12}>
                                <CustomInput
                                    labelText="Email"
                                    id="email"
                                    error={!this.state.mailFilled}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: evt => this.updateInputState("mail", evt),
                                        maxLength: 200,
                                        value: this.state.mail
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={windowSizeDesktop ? 4 : 12}>
                                <CustomInput
                                    labelText="Profissão"
                                    id="profissao"
                                    error={!this.state.jobFilled}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: evt => this.updateInputState("job", evt),
                                        maxLength: 100,
                                        value: this.state.job
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={windowSizeDesktop ? 2 : 12}>
                                <CustomInput
                                    labelText="Telefone"
                                    id="telefone"
                                    error={!this.state.phoneFilled}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: evt => this.updateInputState("phone", evt),
                                        maxLength: 100,
                                        value: this.state.phone
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={windowSizeDesktop ? 6 : 12} className={windowSizeDesktop ? classes.primaryColor : classNames(classes.primaryColor, classes.textCenterMobile)}> 
                                <p className={classes.contactAccountSub}>
                                    * Enviar comprovativo do depósito por e-mail<br/>{this.state.windowSize < 780 && windowHeightDesktop ? <br/> : ""}
                                    Email: AssociacaoAmica@hotmail.com<br/>{this.state.windowSize < 780 && windowHeightDesktop ? <br/> : ""}
                                    IBAN: PT50 0045 2216 4027 1549 63919<br/>{this.state.windowSize < 780 && windowHeightDesktop ? <br/> : ""}
                                    IBAN/SWIFT: CCCMPTPL<br/>{this.state.windowSize < 780 && windowHeightDesktop ? <br/> : ""}
                                    MBWAY: 926708103<br/>{this.state.windowSize < 780 && windowHeightDesktop ? <br/> : ""}
                                    PAYPAL: <a target="_blank" href="https://paypal.me/amicuscanis">paypal.me/amicuscanis</a> 
                                </p>
                            </GridItem>
                            <GridItem xs={windowSizeDesktop ? 4 : 6} className={classes.contactSendMessage}>
                                <div className={classNames(classes.checkboxAndRadio, classes.checkboxAndRadioHorizontal)}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                tabIndex={-1}
                                                onClick={() => this.handleToggle()}
                                                checkedIcon={<Check className={classes.checkedIcon} />}
                                                icon={<Check className={classes.uncheckedIcon} />}
                                                classes={{ checked: classes.checked }}
                                            />
                                        }
                                        classes={{ label: classes.label }}
                                        label="Aceito os termos"
                                    />
                                </div>
                            </GridItem>
                            <GridItem xs={windowSizeDesktop ? 2 : 6} className={classes.contactSendMessage}>
                                <Button className={classes.buttonContactSendMessage} onClick={() => this.sendRegistry()} type="button"  color="primary" disabled={!this.state.checked}>Registar</Button>
                            </GridItem>
                        </GridContainer>
                        <GridContainer xs={12} className={windowSizeDesktop ? "" : classes.containerMobile}>
                            <GridItem xs={12} className={classNames(classes.primaryColor, classes.textCenter)}>
                                <p><h5 className={windowSizeDesktop ? "" : classes.termsTitleMobile} >Termos e Condições:</h5></p>
                            </GridItem>
                            <GridItem xs={windowSizeDesktop ? 6 : 12} className={classes.primaryColor}>
                                <ul className={windowSizeDesktop ? classes.textConditions : classNames(classes.textConditions, classes.termsMobile)}> 
                                    <li>Mediante o pagamento da cota anual, o sócio recebe uma vinheta que será colada no cartão fornecido em espaço indicado;</li>
                                    <li>Os cartões e vinhetas são levantados no Posto Galp, Sacor, junto ao Polis, ou em local a combinar;</li>
                                    <li>Os parceiros com acordo em vigor são os indicados abaixo;</li>
                                </ul>
                            </GridItem>
                            <GridItem xs={windowSizeDesktop ? 6 : 12} className={classes.primaryColor}>
                                <ul className={windowSizeDesktop ? classes.textConditions : classNames(classes.textConditions, classes.termsMobile)}>
                                    <li>Com a apresentação do cartão nos estabelecimentos dos parceiros, e desde que a cota se encontre liquidada, os sócios têm direito aos descontos acordados;</li>    
                                    <li>O não pagamento de cota por 2 anos consecutivos implica a suspensão de associado.</li>
                                </ul>
                            </GridItem>
                        </GridContainer>
                        {
                            this.state.listCompany !== null ?
                            <ListCompany Companies={this.state.listCompany} classes={classes} windowSize={windowSizeDesktop} windowHeight={windowHeightDesktop}></ListCompany>
                            : ""
                        }
                    </div>
                </div>
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
                    message={<span id="message-id">Registro efetuado com Sucesso!</span>}
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
                    message={<span id="message-id">Houve um erro ao criar o registro, tente novamente mais tarde.</span>}
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

export default withStyles(PartnersStyle)(Partners);