import React from "react";

//Styles
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import UsStyle from "../assets/jss/material-kit-react/views/Us.jsx";

//Icons
import CatDog from "../assets/img/catDog.svg";
import HomeImg from "../assets/img/header.jpg";
import AdminImg from "../assets/img/Admin.jpg";

//Components
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";

class Us extends React.Component {
    constructor(props) {
      super(props);
      this.updateDimensions = this.updateDimensions.bind(this);     
      this.state = {
        windowSize: 1280,
        windowHeight: 800
      };
    }
    componentWillMount() {
      this.updateDimensions();
    }
    componentDidMount(){
      window.scrollTo(0,0);
      window.addEventListener("resize", this.updateDimensions);
      window.addEventListener("orientationchange", this.updateDimensions);
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
    render() {
        const { classes } = this.props;
        const windowSizeDesktop = this.state.windowSize > 780;
        const windowHeightDesktop = this.state.windowHeight > 500;
        return (  
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <div className={classNames(classes.paddingBottomContainer, classes.section)}>
                <GridContainer justify="center">
                  <GridItem className={classes.gridItemTitle} xs={12} sm={12} md={8}>
                    <h2 className={classNames(classes.titleWrning, classes.title)}>Direitos Autorais</h2>
                  </GridItem>
                </GridContainer>
                <h4 className={classNames(classes.title, classes.titleWrning, classes.subTitleMarginLeft)}>Desenvolvedores</h4>
                <GridContainer xs={12} className={windowSizeDesktop ? "" : classes.containerMobile} justify={windowSizeDesktop ? "" : "center"}>
                  <GridItem xs={12}>
                    <ul className={classes.developerList}>
                      <li><a className={classes.link} target={"_blank"} href="https://www.linkedin.com/in/gustavo-luzia/">Gustavo de Abreu Luzia</a></li>
                    </ul>
                  </GridItem>
                </GridContainer>
                <h4 className={classNames(classes.title, classes.titleWrning, classes.subTitleMarginLeft)}>Fotos</h4>
                <GridContainer xs={12} className={windowSizeDesktop ? "" : classes.containerMobile} justify={windowSizeDesktop ? "" : "center"}>
                  <GridItem xs={!windowSizeDesktop && windowHeightDesktop ? 12 : 4}>
                    <img src={HomeImg} width={"100%"}></img>
                    <span className={classes.authorText}>Foto por <a className={classes.link} target={"_blank"} href="https://unsplash.com/@adventure_yuki?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Yuki Dog</a> em <a className={classes.link} target={"_blank"} href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
                  </GridItem>                   
                  <GridItem xs={!windowSizeDesktop && windowHeightDesktop ? 12 : 4}>
                    <img src={AdminImg} width={"100%"}></img>
                    <span className={classes.authorText}>Foto por <a className={classes.link} target={"_blank"} href="https://unsplash.com/@svechnikov?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Stas Svechnikov</a> em <a className={classes.link} target={"_blank"} href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
                  </GridItem>
                </GridContainer>   
                <h4 className={classNames(classes.title, classes.titleWrning, classes.subTitleMarginLeft)}>Imagens</h4> 
                <GridContainer xs={12} className={windowSizeDesktop ? "" : classes.containerMobile} justify={windowSizeDesktop ? "" : "center"}>                
                  <GridItem xs={!windowSizeDesktop && windowHeightDesktop ? 6 : 2}>
                    <img src={CatDog} width={"100%"}></img>
                    <span className={classes.authorText}>Imagem por <a className={classes.link} target={"_blank"} href="https://pixabay.com/users/Leunert-2332372/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1517090">Elisabeth Leunert</a> em <a className={classes.link} target={"_blank"} href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1517090">Pixabay</a></span>
                  </GridItem>
                </GridContainer>   
                <h4 className={classNames(classes.title, classes.titleWrning, classes.subTitleMarginLeft)}>Template</h4>          
                <GridContainer xs={12} className={windowSizeDesktop ? "" : classes.containerMobile} justify={windowSizeDesktop ? "" : "center"}>                
                  <GridItem xs={12}>
                    <span className={classes.templateText}>Template inicial por <a className={classes.link} target={"_blank"} href="https://www.creative-tim.com/">Creative Tim</a> no produto <a className={classes.link} target={"_blank"} href="https://www.creative-tim.com/product/material-kit-react#">Material Kit React</a></span>
                  </GridItem>
                </GridContainer> 
              </div>
            </div>
          </div>
        )
    }
}

export default withStyles(UsStyle)(Us);