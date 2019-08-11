import React from 'react'

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Tooltip from "@material-ui/core/Tooltip";


class Companies extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            Companies: props.Companies, 
            windowSize: props.windowSize,
            windowHeight: props.windowHeight
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
        let columnWidth = "";
        const windowSize = window.innerWidth;

        if(this.state.home) {
            if(windowSize > 1200) {
                columnWidth = "33.33%";
            }
            else if(windowSize > 780) {
                columnWidth = "50%";
            }
            else {
                columnWidth = "100%";
            }
        }
        else {
            if(windowSize > 1200) {
                columnWidth = "20%";
            }
            else if(windowSize > 780) {
                columnWidth = "33.33%";
            }
            else {
                columnWidth = "50%";
            }
        }
        this.setState({columnWidth: columnWidth, windowSize: windowSize});
    }
    render() {
        const { classes } = this.props;
        const windowSizeDesktop = this.state.windowSize > 780;
        const windowHeightDesktop = this.state.windowHeight > 500;
        return (
            <GridContainer xs={12} className={windowSizeDesktop ? classes.companyGrid : classes.companyGridMobile}>
            {this.state.Companies.map((company) => {
                return <GridItem xs={windowSizeDesktop ? 2 : (windowHeightDesktop ? 6 : 4)} className={windowSizeDesktop ? classes.companyGridItem : classes.companyGridItemMobile}>
                    <Tooltip
                        id={`${company.name}Tooltip`}
                        title={company.description}
                        placement="auto"
                        classes={{ tooltip: classes.tooltip }}
                        enterTouchDelay={0}
                    >
                        <div className={classes.companyImgContainer}>
                            <img src={company.imgSrc} alt="Last slide" className={classes.imgFluid}/>
                        </div>
                    </Tooltip>
                </GridItem>
            })}
            </GridContainer>
        )
    }
};

export default Companies