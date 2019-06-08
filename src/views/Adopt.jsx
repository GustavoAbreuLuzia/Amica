import React from "react";

// Styles
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import adoptPageStyle from "assets/jss/material-kit-react/views/adoptPage.jsx";

// Router
import { Route } from "react-router-dom";  

//Components
import StackGrid from "react-stack-grid";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomHeader from "components/CustomTabs/CustomHeader.jsx";
import Carousel from "react-slick";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Button from 'components/CustomButtons/Button.jsx';
import DialogActions from '@material-ui/core/DialogActions';

// Icons
import Close from "@material-ui/icons/Close";
import AllInclusive from "@material-ui/icons/AllInclusive";
import FilterVintage from "@material-ui/icons/FilterVintage";
import Favorite from "@material-ui/icons/Favorite";

// Images
import alf from "assets/img/alf.jpg"
import gatinha from "assets/img/gatinha (2).jpg"
import gato1 from "assets/img/Gato1.jpg"
import gatoBranco from "assets/img/GatoBranco.jpg"
import pepe from "assets/img/Pepe.jpg"
import sky from "assets/img/Sky.jpg"
import collie from "assets/img/Collie.jpg"
import julieta from "assets/img/Julieta.jpg"
import foxy from "assets/img/Foxy.jpg"
import gatinha1 from "assets/img/gatinha (1).jpg";
import gatinha2 from "assets/img/gatinha (2).jpg";
import gatinha3 from "assets/img/gatinha (3).jpg";
import alf1 from "assets/img/alf (1).jpg";
import alf2 from "assets/img/alf (2).jpg";
import alf3 from "assets/img/alf (3).jpg";
import sky1 from "assets/img/sky (1).jpg";
import sky2 from "assets/img/sky (2).jpg";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class Adopt extends React.Component {
    constructor(props) {
      super(props);    
      this.state = {
        modalAlf: false,
        modalSky: false,
        modalGatinha: false,
        value: 0
      }  
    }
    componentDidMount(){
      window.scrollTo(0,0);      
    }
    setTabState = (value) => {
        this.setState({ value });   
    }
    updateGridLayout = () => {
        if (this.grid !== undefined) {
            this.grid.updateLayout();
        } 
    }
    handleClickOpen(modal) {
      var x = [];
      x[modal] = true;
      this.setState(x);
    }
    handleClose(modal) {
      var x = [];
      x[modal] = false;
      this.setState(x);
    }
    adopt(name, history) {
        history.push('/Contacts/' + name);
    }
    render() {
        const { classes } = this.props;
        const animals = [
                <img animal={1} onClick={() => this.handleClickOpen("modalAlf")} src={alf} alt="Last slide" className={classNames(classes.imgRounded, classes.imgRaised, classes.imgGrid)}/>,
                <img animal={2} onClick={() => this.handleClickOpen("modalGatinha")} src={gatinha} alt="Last slide" className={classNames(classes.imgRounded, classes.imgRaised, classes.imgGrid)}/>,
                <img animal={2} src={gato1} alt="Last slide" className={classNames(classes.imgRounded, classes.imgRaised, classes.imgGrid)}/>,
                <img animal={2} src={gatoBranco} alt="Last slide" className={classNames(classes.imgRounded, classes.imgRaised, classes.imgGrid)}/>,
                <img animal={1} src={pepe} alt="Last slide" className={classNames(classes.imgRounded, classes.imgRaised, classes.imgGrid)}/>,
                <img animal={1} onClick={() => this.handleClickOpen("modalSky")} src={sky} alt="Last slide" className={classNames(classes.imgRounded, classes.imgRaised, classes.imgGrid)}/>,
                <img animal={1} src={collie} alt="Last slide" className={classNames(classes.imgRounded, classes.imgRaised, classes.imgGrid)}/>,
                <img animal={1} src={julieta} alt="Last slide" className={classNames(classes.imgRounded, classes.imgRaised, classes.imgGrid)}/>,
                <img animal={1} src={foxy} alt="Last slide" className={classNames(classes.imgRounded, classes.imgRaised, classes.imgGrid)}/>
        ];
        const animalsToRender = animals.map((item) => {
            if(item.props.animal === this.state.value || this.state.value === 0){
                return item;
            }
        });
        return (
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div className={classes.paddingBottom}>
                        <GridContainer justify="center">
                            <GridItem className={classes.gridItemTitle} xs={12} sm={12} md={8}>
                                <h2 className={classNames(classes.titleWrning, classes.title)}>Adote</h2>
                            </GridItem>
                        </GridContainer>
                        <CustomHeader
                            headerColor="primary"
                            tabs={[
                                {
                                tabName: "Todos",
                                tabIcon: AllInclusive
                                },
                                {
                                tabName: "Cães",
                                tabIcon: Favorite
                                },
                                {
                                tabName: "Gatos",
                                tabIcon: FilterVintage
                                }
                            ]}
                            setTabState={this.setTabState}
                        />
                        <StackGrid gridRef={grid => this.grid = grid} columnWidth={"20%"}>
                            {
                                animalsToRender
                            }                            
                        </StackGrid>
                        <Dialog
                            classes={{
                                root: classes.center,
                                paper: classes.modal
                            }}
                            open={this.state.modalAlf}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => this.handleClose("modalAlf")}
                            aria-labelledby="modal-slide-title"
                            aria-describedby="modal-slide-description">
                            <DialogTitle
                                id="classic-modal-slide-title"
                                disableTypography
                                className={classes.modalHeader}>
                                <IconButton
                                className={classes.modalCloseButton}
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={() => this.handleClose("modalAlf")}>
                                <Close className={classes.modalClose} />
                                </IconButton>
                                <h4 className={classNames(classes.modalTitle, classes.titleWrning)}>Cão para adoção</h4>
                            </DialogTitle>
                            <DialogContent
                                id="modal-slide-description"
                                className={classes.modalBody}>
                                <label className={classes.descriptionModal}>
                                Para adoção responsável ou F.A.T.! (Bragança)
                                Cão muito meigo, esterilizado. Dá-se bem com outros animais. Está sociabilizado.
                                </label>
                                {<Carousel {...{dots: false,
                                    arrows: true,
                                    infinite: true,
                                    speed: 500, 
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    autoplay: true}}>
                                    <div className={classes.divCarousel}>
                                        <img
                                            src={alf}
                                            alt="First slide"
                                            className={classes.imgCarousel}
                                        />
                                    </div>
                                    <div className={classes.divCarousel}>
                                    <img
                                        src={alf1}
                                        alt="Second slide"
                                        className={classes.imgCarousel}
                                    />
                                    </div>
                                    <div className={classes.divCarousel}>
                                        <img
                                            src={alf2}
                                            alt="slide"
                                            className={classes.imgCarousel}
                                        />
                                    </div>
                                    <div className={classes.divCarousel}>
                                        <img
                                            src={alf3}
                                            alt="Last slide"
                                            className={classes.imgCarousel}
                                        />
                                    </div>
                                </Carousel>}
                            </DialogContent>
                            <DialogActions>
                                <Route render={({ history }) => (
                                    <Button
                                        type='button'
                                        color="primary"
                                        className={classes.buttonContactSendMessage}
                                        onClick={() => this.adopt("Alf", history)}
                                        >
                                        Adotar
                                    </Button>
                                )} />                                
                            </DialogActions>
                            </Dialog>
                            <Dialog
                            classes={{
                                root: classes.center,
                                paper: classes.modal
                            }}
                            open={this.state.modalSky}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => this.handleClose("modalSky")}
                            aria-labelledby="modal-slide-title"
                            aria-describedby="modal-slide-description">
                            <DialogTitle
                                id="classic-modal-slide-title"
                                disableTypography
                                className={classes.modalHeader}>
                                <IconButton
                                className={classes.modalCloseButton}
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={() => this.handleClose("modalSky")}>
                                <Close className={classes.modalClose} />
                                </IconButton>
                                <h4 className={classNames(classes.modalTitle, classes.titleWrning)}>Para adoção responsável</h4>
                            </DialogTitle>
                            <DialogContent
                                id="modal-slide-description"
                                className={classes.modalBody}>
                                <label className={classes.descriptionModal}>
                                    Cadela muito meiga. Sociabilizada com outros animais.
                                    Está esterilizada. Cão ideal para uma família com crianças e de preferência com espaço exterior!❤️❤️❤️
                                </label>
                                {<Carousel {...{dots: false,
                                    arrows: true,
                                    infinite: true,
                                    speed: 500, 
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    autoplay: true}}>
                                    <div className={classes.divCarousel}>
                                    <img
                                        src={sky}
                                        alt="First slide"
                                        className={classes.imgCarousel}
                                    />
                                    </div>
                                    <div className={classes.divCarousel}>
                                    <img
                                        src={sky1}
                                        alt="Second slide"
                                        className={classes.imgCarousel}
                                    />
                                    </div>
                                    <div className={classes.divCarousel}>
                                    <img
                                        src={sky2}
                                        alt="Last slide"
                                        className={classes.imgCarousel}
                                    />
                                    </div>
                                </Carousel>}
                            </DialogContent>
                            <DialogActions>
                                <Route render={({ history }) => (
                                    <Button
                                        type='button'
                                        color="primary"
                                        className={classes.buttonContactSendMessage}
                                        onClick={() => this.adopt("Sky", history)}
                                        >
                                        Adotar
                                    </Button>
                                )} />                                
                            </DialogActions>
                            </Dialog>
                            <Dialog
                            classes={{
                                root: classes.center,
                                paper: classes.modal
                            }}
                            open={this.state.modalGatinha}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => this.handleClose("modalGatinha")}
                            aria-labelledby="modal-slide-title"
                            aria-describedby="modal-slide-description">
                            <DialogTitle
                                id="classic-modal-slide-title"
                                disableTypography
                                className={classes.modalHeader}>
                                <IconButton
                                className={classes.modalCloseButton}
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={() => this.handleClose("modalGatinha")}>
                                <Close className={classes.modalClose} />
                                </IconButton>
                                <h4 className={classNames(classes.modalTitle, classes.titleWrning)}>Gatinha para adoção</h4>
                            </DialogTitle>
                            <DialogContent
                                id="modal-slide-description"
                                className={classes.modalBody}>
                                <label className={classes.descriptionModal}>
                                Gatinha recolhida da rua à procura de uma família que a ame e cuide para sempre.
                                É um poço de ternura.
                                Se estiver interessado envie mensagem, caso não possa divulgue e partilhe para encontrar um lar a esta princesa ❤🐾
                                </label>
                                {<Carousel {...{dots: false,
                                    arrows: true,
                                    infinite: true,
                                    speed: 500, 
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    autoplay: true}}>
                                    <div className={classes.divCarousel}>
                                    <img
                                        src={gatinha1}
                                        alt="First slide"
                                        className={classes.imgCarousel}
                                    />
                                    </div>
                                    <div className={classes.divCarousel}>
                                    <img
                                        src={gatinha2}
                                        alt="Second slide"
                                        className={classes.imgCarousel}
                                    />
                                    </div>
                                    <div className={classes.divCarousel}>
                                    <img
                                        src={gatinha3}
                                        alt="Last slide"
                                        className={classes.imgCarousel}
                                    />
                                    </div>
                                </Carousel>}
                            </DialogContent>
                            <DialogActions>
                                <Route render={({ history }) => (
                                    <Button
                                        type='button'
                                        color="primary"
                                        className={classes.buttonContactSendMessage}
                                        onClick={() => this.adopt("Mia", history)}
                                        >
                                        Adotar
                                    </Button>
                                )} />                                
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        )
    }
}

export default  withStyles(adoptPageStyle)(Adopt);