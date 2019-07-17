import React from 'react'
import { Route } from "react-router-dom";  
import StackGrid from "react-stack-grid";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Info from "@material-ui/icons/Info";
import FilterVintage from "@material-ui/icons/FilterVintage";
import Warning from "@material-ui/icons/Warning";
import Favorite from "@material-ui/icons/Favorite";
import classNames from "classnames";

const News = ({ News, columnWidth, classes, windowSize }) => {
    return (
    <StackGrid columnWidth={columnWidth}>
        {News.map((notice) => {
        const descriptionCut = notice.description.length > 200 ? notice.description.substring(0, 145) + '...' : notice.description;
        const hasImage = notice.imgSrc !== '';
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

        return <GridItem id={notice._id} hasImage={hasImage} xs>
            <Route render={({ history }) => (
                <InfoArea
                title={notice.title}
                description={
                    <span>
                        <span onClick={() => this.newsDetailed(notice._id, history)} className={windowSize > 780 ? classNames(classes.hoverUnderline, classes.spanVerMais) : classNames(classes.hoverUnderline, classes.spanVerMais, classes.spanVerMaisMobile)}>Ver Mais</span>
                        {hasImage ? <img width={"100%"} src={notice.imgSrc}></img> : ""} 
                        <p>
                            {descriptionCut}
                        </p>
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
};

export default News