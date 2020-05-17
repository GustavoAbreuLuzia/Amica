import React from 'react'
import { Route } from "react-router-dom";  
import StackGrid from "react-stack-grid";
import GridItem from "../../components/Grid/GridItem.jsx";
import InfoArea from "../../components/InfoArea/InfoArea.jsx";
import Info from "@material-ui/icons/Info";
import FilterVintage from "@material-ui/icons/FilterVintage";
import Warning from "@material-ui/icons/Warning";
import Favorite from "@material-ui/icons/Favorite";
import classNames from "classnames";

class News extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            News: props.News, 
            columnWidth: props.columnWidth, 
            windowSize: props.windowSize,
            home: props.home
        }
    }   
    newsDetailed(id, history) {
        history.push('/News/' + id);
    }
    render() {
        const { classes } = this.props;
        return (
        <StackGrid monitorImagesLoaded={true} gridRef={grid => this.props.grid(grid)} columnWidth={this.state.columnWidth}>
            {this.state.News.map((notice, index) => {
            const descriptionCut = notice.description.length > 200 ? notice.description.substring(0, 145) + '...' : notice.description;
            const hasimage = notice.imgSrc !== '';
            let icon = null;
            let iconColor = "";

            switch (notice.type[0]) {
                case "Info": 
                    icon = Info;
                    iconColor = "danger";
                    break;
                case "Warning": 
                    icon = Warning;
                    iconColor = "warning";
                    break;
                case "AdoptDog": 
                    icon = Favorite;
                    iconColor = "success";
                    break;
                case "AdoptCat": 
                    icon = FilterVintage;
                    iconColor = "success";
                    break;
            }   

            return <GridItem key={index} id={notice._id} xs>
                <Route render={({ history }) => (
                    <InfoArea
                    title={notice.title}
                    description={
                        <span>
                            <span onClick={() => this.newsDetailed(notice._id, history)} className={this.state.windowSize ? classNames(classes.hoverUnderline, classes.spanVerMais) : classNames(classes.hoverUnderline, classes.spanVerMais, classes.spanVerMaisMobile)}>Ver Mais</span>
                            {hasimage ? <img width={"100%"} src={notice.imgSrc}></img> : ""} 
                            <label className={classes.descriptionNews}>
                                {descriptionCut}
                            </label>
                        </span>}
                    icon={icon}
                    iconColor={iconColor}
                    vertical={false}
                    />
                )} /> 
            </GridItem>
            })}
        </StackGrid>
        )
    }
};

export default News