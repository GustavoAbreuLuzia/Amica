import React from "react";

// Api
import api from "../../Utils/api";

//Styles
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import AdminCompanyDetailsStyle from "../../assets/jss/material-kit-react/views/AdminCompanyDetails.jsx";

//Components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Card from "../../components/Card/Card.jsx";    
import Button from '../../components/CustomButtons/Button.jsx';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

// Icons
import Delete from "@material-ui/icons/Delete";
import CloseIcon from '@material-ui/icons/Close';

class AdminCompanyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseCompanyMessageSuccess = this.handleCloseCompanyMessageSuccess.bind(this);  
        this.handleCloseCompanyMessageFailure = this.handleCloseCompanyMessageFailure.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);  
        this.state = {
            id: null,
            name: "",
            description: "",
            imgSrc: "",
            nameFilled: true,
            descriptionFilled: true,
            imageFilled: true,
            showSaveSuccess: false,
            showSaveFailure: false,
            windowSize: 1280,
            windowHeight: 800
        };
    }
    componentDidMount(){
        window.scrollTo(0,0);
        window.addEventListener("resize", this.updateDimensions);
        window.addEventListener("orientationchange", this.updateDimensions);
        const dataObject = this.props.dataObject;
        
        if(dataObject !== undefined){
            this.setState({
                id: dataObject._id,
                name: dataObject.name, 
                description: dataObject.description,
                imgSrc: dataObject.imgSrc
            });
        }
    }
    componentWillMount() {
      this.updateDimensions();
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
    updateInputState(stateName, newValue){
        this.setState({
            [stateName]: newValue.currentTarget.value
        });
    }
    deleteImage(){
        this.setState({imgSrc: ""});
    }
    async uploadImage(event) {
        const imageFiles = event.target.files[0];
        if (imageFiles !== null) {
            const formData = new FormData();
            formData.append('image', imageFiles);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            const CompanyImageUpload = await api.post('/api/company/admin/upload', formData, config);
            this.setState({imgSrc: `/images/company/${CompanyImageUpload.data.filename}`});
        }
    }
    clickUploadImage(){
        this.uploadInput.click();
    }
    async saveCompany(){
        let fullFilled = true;
        if(this.state.name === ""){
            fullFilled = false;
            this.setState({nameFilled: false});
        }
        else {
            this.setState({nameFilled: true});
        }

        if(this.state.description === ""){
            fullFilled = false;
            this.setState({descriptionFilled: false});
        }
        else {
            this.setState({descriptionFilled: true});
        }

        if(this.state.image === ""){
            fullFilled = false;
            this.setState({imageFilled: false});
        }
        else {
            this.setState({imageFilled: true});
        }

        if(fullFilled){
            const _this = this;
            const Company = {
                name: this.state.name,
                description: this.state.description,
                imgSrc: this.state.imgSrc
            }
            
            if(this.state.id === null){
                // Insert
                const CompanyInserted = await api.post('/api/company', Company)                
                .then((item) => {
                    _this.setState({id: item.data._id, showCompanySuccess: true});
                })
                .catch(() => {
                    _this.setState({showCompanySuccess: true});
                })
            }
            else {
                // Update
                Company._id = this.state.id;

                const CompanyUpdated = await api.put(`/api/company/${this.state.id}`, Company)                
                .then(() => {
                    _this.setState({showCompanySuccess: true});
                })
                .catch(() => {
                    _this.setState({showCompanyFailure: true});
                })
            }
        }
    }
    handleCloseCompanyMessageSuccess(){
      if(this.state.showCompanySuccess){
        this.setState({showCompanySuccess: false});
      }
    }
    handleCloseCompanyMessageFailure(){
      if(this.state.showCompanyFailure){
        this.setState({showCompanyFailure: false});
      }
    }
    render() {
        const { classes } = this.props;
        const windowSizeDesktop = this.state.windowSize > 780;
        const windowHeightDesktop = this.state.windowHeight > 500;
        return (
            <div className={classes.container}>
                <div className={classes.section}>
                    <GridContainer xs={12} className={windowSizeDesktop ? "" : classes.containerMobile}>
                        <GridItem xs={12} className={classNames(classes.titleWrning, classes.title)}>
                            <h3>Editar Parceiro</h3>
                        </GridItem>
                        <GridItem xs={12}>
                            <CustomInput
                                labelText="Título"
                                id="name"
                                error={!this.state.nameFilled}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: evt => this.updateInputState("name", evt),
                                    maxlength: 100,
                                    value: this.state.name
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12}>
                            <CustomInput
                                labelText="Descrição"
                                id="description"
                                error={!this.state.descriptionFilled}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    multiline: true,
                                    onChange: evt => this.updateInputState("description", evt),
                                    value: this.state.description
                                }}
                            />
                        </GridItem>
                        {
                            this.state.imgSrc !== "" ?
                            <GridItem xs={!windowSizeDesktop && windowHeightDesktop ? 12 : !windowHeightDesktop ? 6 : 2}>
                                <Card>
                                    <img className={classes.imageGalery} src={this.state.imgSrc}></img>
                                    <Delete onClick={() => this.deleteImage()} className={classes.deleteIcon}/>
                                </Card>
                            </GridItem> : null 
                        }
                        <GridItem xs={12} className={!windowSizeDesktop && windowHeightDesktop ? classes.contactSendMessageMobile : classes.contactSendMessage}>
                            <Button className={classes.buttonContactSendMessage} onClick={() => this.clickUploadImage()} type="button" color="primary">
                                <input id={"btn_image"} type="file" name={"image"} ref={input => this.uploadInput = input} className={classes.inputHidden} onChange={evt => this.uploadImage(evt)}/>
                                Adicionar Imagem
                            </Button>
                            <Button className={classes.buttonContactSendMessage} onClick={() => this.saveCompany()} type="button" color="primary">Salvar</Button>
                        </GridItem> 
                    </GridContainer>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.showCompanySuccess}
                    autoHideDuration={6000}
                    onClose={this.handleCloseCompanyMessageSuccess}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Parceiro atualizado com sucesso!</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleCloseCompanyMessageSuccess}
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
                    open={this.state.showCompanyFailure}
                    autoHideDuration={6000}
                    onClose={this.handleCloseCompanyMessageFailure}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Houve um erro ao atualizar o parceiro, tente novamente mais tarde.</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleCloseCompanyMessageFailure}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                    />
            </div>
        )
    }
}

export default withStyles(AdminCompanyDetailsStyle)(AdminCompanyDetails);