import React from "react";

// Api
import api from "../Utils/api";

// Styles
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import adoptPageStyle from "assets/jss/material-kit-react/views/adoptPage.jsx";

//Components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomHeader from "components/CustomTabs/CustomHeader.jsx";
import ListAdopt from 'views/Components/ListAdopt.jsx';

// Icons
import AllInclusive from "@material-ui/icons/AllInclusive";
import FilterVintage from "@material-ui/icons/FilterVintage";
import Favorite from "@material-ui/icons/Favorite";

class Adopt extends React.Component {
    constructor(props) {
      super(props);    
      this.updateDimensions = this.updateDimensions.bind(this);
      this.state = {
        petFilter: "",
        gridColumnWidth: "33.33%",
        windowSize: 1280,
        windowHeight: 800,
        listPets: null,
        grid: null
      };
    }
    componentWillMount() {
        this.updateDimensions();
    }
    async componentDidMount(){
        window.scrollTo(0,0);
        window.addEventListener("resize", this.updateDimensions);
        window.addEventListener("orientationchange", this.updateDimensions);

        const pets = await api.get('/adopt');

        this.setState({listPets: pets.data});
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
        this.setState({gridColumnWidth: columnWidth, windowSize: windowSize, windowHeight: window.innerHeight});
    }
    setTabState = (petFilter) => {
        this.setState({ petFilter });   
    }
    render() {
        const { classes } = this.props;
        const windowSizeDesktop = this.state.windowSize > 780;
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
                                tabIcon: AllInclusive,
                                value: ""
                                },
                                {
                                tabName: "Cães",
                                tabIcon: Favorite,
                                value: "Cão"
                                },
                                {
                                tabName: "Gatos",
                                tabIcon: FilterVintage,
                                value: "Gato"
                                }
                            ]}
                            setTabState={this.setTabState}
                        />
                        {
                            this.state.listPets !== null ?
                            <ListAdopt grid={(newGrid) => this.setState({grid: newGrid})} 
                                pets={this.state.listPets} 
                                columnWidth={this.state.gridColumnWidth} 
                                classes={classes} 
                                windowSize={windowSizeDesktop}
                                petFilter={this.state.petFilter}
                            />
                            : ""
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default  withStyles(adoptPageStyle)(Adopt);