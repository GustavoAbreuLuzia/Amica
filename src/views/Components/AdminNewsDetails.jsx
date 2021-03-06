import React from "react";

// Api
import api from "../../Utils/api";

//Styles
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import AdminNewsDetailsStyle from "../../assets/jss/material-kit-react/views/AdminNewsDetails.jsx";

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

class AdminNewsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseNewsMessageSuccess = this.handleCloseNewsMessageSuccess.bind(this);  
        this.handleCloseNewsMessageFailure = this.handleCloseNewsMessageFailure.bind(this);  
        this.updateDimensions = this.updateDimensions.bind(this);
        this.state = {
            id: null,
            title: "",
            description: "",
            images: [],
            titleFilled: true,
            descriptionFilled: true,
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
                title: dataObject.title, 
                description: dataObject.description,
                images: dataObject.images
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
    deleteImage(imageSrc) {
        let imageArray = this.state.images;
        const index = imageArray.indexOf(imageSrc);
 
        if (index > -1) {
            imageArray.splice(index, 1);
            this.setState({images: imageArray});
        }
    }
    async uploadImage(event) {
        const imageFiles = event.target.files;
        if (imageFiles !== null) {
            const formData = new FormData();
            for (let index = 0; index < imageFiles.length; index++) {
                const element = imageFiles[index];
                formData.append('image', element);    
            }
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            const newsImageUpload = await api.post('/api/news/admin/upload', formData, config);
            let imagesUpdated = this.state.images;  
            newsImageUpload.data.filesName.forEach(fileName => imagesUpdated.push('/images/news/' + fileName));
            this.setState({images: imagesUpdated})
        }
    }
    clickUploadImage(){
        this.uploadInput.click();
    }
    async saveNews(){
        let fullFilled = true;
        if(this.state.title === ""){
            fullFilled = false;
            this.setState({titleFilled: false});
        }
        else {
            this.setState({titleFilled: true});
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
            const news = {
                title: this.state.title,
                description: this.state.description,
                type: ["Info"],
                imgSrc: this.state.images.length > 0 ? this.state.images[0] : "",
                images: this.state.images
            }
            
            if(this.state.id === null){
                // Insert
                const newsInserted = await api.post('/api/news', news)                
                .then((item) => {
                    _this.setState({id: item.data._id, showNewsSuccess: true});
                })
                .catch(() => {
                    _this.setState({showNewsSuccess: true});
                })
            }
            else {
                // Update
                news._id = this.state.id;

                const newsUpdated = await api.put(`/api/news/${this.state.id}`, news)                
                .then(() => {
                    _this.setState({showNewsSuccess: true});
                })
                .catch(() => {
                    _this.setState({showNewsSuccess: true});
                })
            }
        }
    }
    handleCloseNewsMessageSuccess(){
      if(this.state.showNewsSuccess){
        this.setState({showNewsSuccess: false});
      }
    }
    handleCloseNewsMessageFailure(){
      if(this.state.showNewsFailure){
        this.setState({showNewsFailure: false});
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
                            <h3>Editar Notícia</h3>
                        </GridItem>
                        <GridItem xs={12}>
                            <CustomInput
                                labelText="Título"
                                id="title"
                                error={!this.state.titleFilled}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: evt => this.updateInputState("title", evt),
                                    maxLength: 100,
                                    value: this.state.title
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
                            this.state.images.map((image) => {
                                return <GridItem xs={!windowSizeDesktop && windowHeightDesktop ? 12 : !windowHeightDesktop ? 6 : 2}>
                                        <Card>
                                            <img className={classes.imageGalery} src={image}></img>
                                            <Delete onClick={() => this.deleteImage(image)} className={classes.deleteIcon}/>
                                        </Card>
                                </GridItem>
                            })
                        }
                        <GridItem xs={12} className={!windowSizeDesktop && windowHeightDesktop ? classes.contactSendMessageMobile : classes.contactSendMessage}>
                            <Button className={classes.buttonContactSendMessage} onClick={() => this.clickUploadImage()} type="button" color="primary">
                                <input id={"btn_image"} type="file" name={"image"} ref={input => this.uploadInput = input} className={classes.inputHidden} onChange={evt => this.uploadImage(evt)} multiple/>
                                Adicionar Imagem
                            </Button>
                            <Button className={classes.buttonContactSendMessage} onClick={() => this.saveNews()} type="button" color="primary">Salvar</Button>
                        </GridItem> 
                    </GridContainer>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.showNewsSuccess}
                    autoHideDuration={6000}
                    onClose={this.handleCloseNewsMessageSuccess}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Notícia atualizada com sucesso!</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleCloseNewsMessageSuccess}
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
                    open={this.state.showNewsFailure}
                    autoHideDuration={6000}
                    onClose={this.handleCloseNewsMessageFailure}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Houve um erro ao atualizar a notícia, tente novamente mais tarde.</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleCloseNewsMessageFailure}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                    />
            </div>
        )
    }
}

export default withStyles(AdminNewsDetailsStyle)(AdminNewsDetails);