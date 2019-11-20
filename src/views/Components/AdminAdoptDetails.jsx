import React from "react";

// Api
import api from "../../Utils/api";

//Styles
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import AdminAdoptDetailsStyle from "../../assets/jss/material-kit-react/views/AdminAdoptDetails.jsx";

//Components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Card from "../../components/Card/Card.jsx";    
import Button from '../../components/CustomButtons/Button.jsx';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

// Icons
import Delete from "@material-ui/icons/Delete";
import CloseIcon from '@material-ui/icons/Close';

class AdminAdoptDetails extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseAdoptMessageSuccess = this.handleCloseAdoptMessageSuccess.bind(this);  
        this.handleCloseAdoptMessageFailure = this.handleCloseAdoptMessageFailure.bind(this);  
        this.state = {
            id: null,
            name: "",
            description: "",
            images: [],
            petType: "Cão",
            petTypeSelected: false,
            nameFilled: true,
            descriptionFilled: true,
            showSaveSuccess: false,
            showSaveFailure: false
        };
    }
    componentDidMount(){
        const dataObject = this.props.dataObject;
        
        if(dataObject !== undefined){
            this.setState({
                id: dataObject._id,
                name: dataObject.name, 
                description: dataObject.description,
                petType: dataObject.petType,
                petTypeSelected: dataObject.petType === "Gato",
                images: dataObject.images
            });
        }
    }
    updateInputState(stateName, newValue){
        this.setState({
            [stateName]: newValue.currentTarget.value
        });
    }
    updatePetType(){
        const newPetType = !this.state.petTypeSelected;
        if(newPetType){
            this.setState({petType: "Gato"});
        }
        else {
            this.setState({petType: "Cão"});
        }
        this.setState({petTypeSelected: newPetType});
    }
    deleteImage(imageSrc) {
        let imageArray = this.state.images;
        const index = imageArray.indexOf(imageSrc);
 
        if (index > -1) {
            imageArray.splice(index, 1);
            this.setState({images: imageArray});
        }
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
            const adoptImageUpload = await api.post('/api/adopt/admin/upload', formData, config);
            let imagesUpdated = this.state.images;  
            imagesUpdated.push('images/adopt/' + adoptImageUpload.data.filename);
            this.setState({images: imagesUpdated})
        }
    }
    clickUploadImage(){
        this.uploadInput.click();
    }
    async saveAdopt(){
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

        if(fullFilled){
            const _this = this;
            const adopt = {
                name: this.state.name,
                description: this.state.description,
                petType: this.state.petType,
                imgSrc: this.state.images.length > 0 ? this.state.images[0] : "",
                images: this.state.images
            }
            
            if(this.state.id === null){
                // Insert
                const adoptInserted = await api.post('/api/adopt', adopt)                
                .then((item) => {
                    _this.setState({id: item.data._id, showAdoptSuccess: true});
                })
                .catch(() => {
                    _this.setState({showAdoptSuccess: true});
                })
            }
            else {
                // Update
                adopt._id = this.state.id;

                const adoptUpdated = await api.put(`/api/adopt/${this.state.id}`, adopt)                
                .then(() => {
                    _this.setState({showAdoptSuccess: true});
                })
                .catch(() => {
                    _this.setState({showAdoptSuccess: true});
                })
            }
        }
    }
    handleCloseAdoptMessageSuccess(){
      if(this.state.showAdoptSuccess){
        this.setState({showAdoptSuccess: false});
      }
    }
    handleCloseAdoptMessageFailure(){
      if(this.state.showAdoptFailure){
        this.setState({showAdoptFailure: false});
      }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.section}>
                    <GridContainer xs={12}>
                        <GridItem xs={12} className={classNames(classes.nameWrning, classes.name)}>
                            <h3>Editar Adoção</h3>
                        </GridItem>
                        <GridItem xs={10}>
                            <CustomInput
                                labelText="Nome"
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
                        <GridItem xs={2}>
                            <div className={classes.switchOptions}>
                                <h6 className={!this.state.petTypeSelected ? classes.optionPetType : classNames(classes.petTypeDisabled, classes.optionPetType)}>Cão</h6>
                                <FormControlLabel
                                    className={classes.containerMobile}
                                    control={
                                    <Switch
                                        checked={this.state.petTypeSelected}
                                        onChange={evt => this.updatePetType()}
                                        value={this.state.petType}
                                        classes={{
                                            switchBase: classes.switchBase,
                                            checked: classes.switchChecked,
                                            track: classes.switchBar
                                        }}
                                    />
                                    }
                                />
                                <h6 className={this.state.petTypeSelected ? classes.optionPetType : classNames(classes.petTypeDisabled, classes.optionPetType)}>Gato</h6>
                            </div>
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
                            this.state.images.map((image) => {
                                return <GridItem xs={2}>
                                        <Card>
                                            <img className={classes.imageGalery} src={image}></img>
                                            <Delete onClick={() => this.deleteImage(image)} className={classes.deleteIcon}/>
                                        </Card>
                                </GridItem>
                            })
                        }
                        <GridItem xs={12} className={classes.contactSendMessage}>
                            <Button className={classes.buttonContactSendMessage} onClick={() => this.clickUploadImage()} type="button" color="primary">
                                <input id={"btn_image"} type="file" name={"image"} ref={input => this.uploadInput = input} className={classes.inputHidden} onChange={evt => this.uploadImage(evt)}/>
                                Adicionar Imagem
                            </Button>
                            <Button className={classes.buttonContactSendMessage} onClick={() => this.saveAdopt()} type="button" color="primary">Salvar</Button>
                        </GridItem> 
                    </GridContainer>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.showAdoptSuccess}
                    autoHideDuration={6000}
                    onClose={this.handleCloseAdoptMessageSuccess}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Adoção atualizada com sucesso!</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleCloseAdoptMessageSuccess}
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
                    open={this.state.showAdoptFailure}
                    autoHideDuration={6000}
                    onClose={this.handleCloseAdoptMessageFailure}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Houve um erro ao atualizar a adoção, tente novamente mais tarde.</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleCloseAdoptMessageFailure}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                    />
            </div>
        )
    }
}

export default withStyles(AdminAdoptDetailsStyle)(AdminAdoptDetails);