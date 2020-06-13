import React from 'react'

// Route
import { Route } from "react-router-dom"; 

//Style
import classNames from "classnames";

// Icons
import Close from "@material-ui/icons/Close";

//Components 
import StackGrid from "react-stack-grid";
import Carousel from "react-slick";
import Button from '../../components/CustomButtons/Button.jsx';
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from '@material-ui/core/DialogActions';

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

function generateModalIds(pets){
    let modalIds = [];
    pets.forEach((pet) => {
        modalIds[pet._id] = false;
    });
    return modalIds;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

class Pets extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            pets: shuffle(props.pets), 
            columnWidth: props.columnWidth, 
            windowSize: props.windowSize,
            modalOpen: generateModalIds(props.pets)
        }
        this.updateDimensions = this.updateDimensions.bind(this);
    }   
    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount(){
        window.addEventListener("resize", this.updateDimensions);
        window.addEventListener("orientationchange", this.updateDimensions);
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.updateDimensions);
        window.removeEventListener("orientationchange", this.updateDimensions);
    }  
    updateDimensions() {
        let columnWidth = "20%";
        const windowSize = window.innerWidth;

        if(windowSize > 1200) {
            columnWidth = "20%";
        }
        else if(windowSize > 780) {
            columnWidth = "33.33%";
        }
        else {
            columnWidth = "50%";
        }
        this.setState({columnWidth: columnWidth, windowSize: windowSize});
    }
    adopt(name, history) {
        history.push('/Contacts/' + name);
    }
    handleClickOpen(id){
        let modalIds = this.state.modalOpen;
        modalIds[id] = true;
        this.setState({modalOpen: modalIds});
    }
    handleClose(id){
        let modalIds = this.state.modalOpen;
        modalIds[id] = false;
        this.setState({modalOpen: modalIds});
    }
    render() {
        const { classes } = this.props;
        const windowSizeDesktop = this.state.windowSize > 780;
        return (
        <div>
            <StackGrid monitorImagesLoaded={true} gridRef={grid => this.props.grid(grid)} columnWidth={this.state.columnWidth}>
                {this.state.pets.map((pet, indexPet) => {
                    if (this.props.petFilter === pet.petType || this.props.petFilter === 0){
                        return <div key={indexPet}>
                            <img onClick={() => this.handleClickOpen(pet._id)} src={pet.imgSrc} alt={pet.name} className={classNames(classes.imgRounded, classes.imgRaised, classes.imgGrid)}/>
                            <Dialog
                                classes={{
                                    root: classes.center,
                                    paper: !windowSizeDesktop && pet.images.length === 1 ? classes.modalMobileUniqueImage : classes.modal
                                }}
                                open={this.state.modalOpen[pet._id]}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={() => this.handleClose(pet._id)}
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
                                        onClick={() => this.handleClose(pet._id)}>
                                        <Close className={classes.modalClose} />
                                    </IconButton>
                                    <h4 className={classNames(classes.modalTitle, classes.titleWrning)}>{`${pet.petType} para adoção`}</h4>
                                </DialogTitle>
                                <DialogContent
                                    id="modal-slide-description"
                                    className={windowSizeDesktop && pet.images.length === 1 ? classes.modalBodyUniqueImage : classes.modalBody}>
                                    <label className={classes.descriptionModal}>
                                        {pet.description}
                                    </label>
                                    {<Carousel {...{dots: false,
                                        arrows: windowSizeDesktop,
                                        infinite: true,
                                        speed: 500, 
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                        autoplay: true}}>
                                        {
                                            pet.images.map((image, index) => {
                                                return <div key={index} className={classes.divCarousel}>
                                                <img
                                                    src={image}
                                                    className={windowSizeDesktop ? classes.imgCarousel : classes.imgCarouselMobile}
                                                />
                                                </div>
                                            })
                                        }
                                    </Carousel>}
                                </DialogContent>
                                <DialogActions>
                                    <Route render={({ history }) => (
                                        <Button
                                            type='button'
                                            color="primary"
                                            className={classes.buttonContactSendMessage}
                                            onClick={() => this.adopt(pet.name, history)}
                                            >
                                            Adotar
                                        </Button>
                                    )} />                                
                            </DialogActions>
                            </Dialog>
                        </div>
                    }
                })}
            </StackGrid>
        </div>
        
        )
    }
};

export default Pets