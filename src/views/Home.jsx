import React from "react";

// Api
import api from "../Utils/api";

//Style
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import landingPageStyle from "../assets/jss/material-kit-react/views/landingPage.jsx";

//Components
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import Parallax from "../components/Parallax/Parallax.jsx";
import ListNews from "../views/Components/ListNews.jsx";

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.updateDimensions = this.updateDimensions.bind(this);
      this.state = {
        gridColumnWidth: "33.33%",
        windowSize: 1280,
        windowHeight: 800,
        listNews: null,
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

      const news = await api.get('/api/News', {
        params: {
          quantity: 15
        }
      });

      this.setState({listNews: news.data});
    }
    componentWillUnmount(){
      window.removeEventListener("resize", this.updateDimensions);
      window.removeEventListener("orientationchange", this.updateDimensions);
    } 
    updateDimensions() {
      let columnWidth = "33.33%";
      const windowSize = window.innerWidth;
      if(windowSize > 1200) {
        columnWidth = "33.33%";
      }
      else if(windowSize > 780) {
        columnWidth = "50%";
      }
      else {
        columnWidth = "100%";
      }
      this.setState({gridColumnWidth: columnWidth, windowSize: windowSize, windowHeight: window.innerHeight});
    }
    render() {
        const { classes } = this.props;
        const windowSizeDesktop = this.state.windowSize > 780;
        const windowHeightDesktop = this.state.windowHeight > 500;
        return (
            <div>
              <Parallax filter image={windowSizeDesktop ? require("../assets/img/header.jpg") : require("../assets/img/headerMobile.jpg")}>
                <div className={!windowSizeDesktop && !windowHeightDesktop ? classNames(classes.containerTitleMobile, classes.container) : classes.container}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      {
                        !windowSizeDesktop && !windowHeightDesktop ?
                        <div>
                          <h3 className={classes.title}>A felicidade tem uma forma!</h3>
                          <h5>
                          A Associação Amicus Canis – AMICA, é uma organização sem fins lucrativos, sediada em Bragança, que tem como objetivo principal promover o bem-estar animal.
                          <br/>
                          É constituída por voluntários que emprestam o seu tempo por um bem maior. Trata de resgatar, recuperar, esterilizar e dar os animais para adoção responsável. Procede também, à captura, esterilização e devolução de animais à rua, nomeadamente, gatos, para evitar a sua proliferação.
                          <br/>
                          Dá voz aos direitos dos animais!
                          </h5>
                        </div> :
                        <div>
                          <h1 className={classes.title}>A felicidade tem uma forma!</h1>
                          <h4>
                          A Associação Amicus Canis – AMICA, é uma organização sem fins lucrativos, sediada em Bragança, que tem como objetivo principal promover o bem-estar animal.
                          <br/>
                          É constituída por voluntários que emprestam o seu tempo por um bem maior. Trata de resgatar, recuperar, esterilizar e dar os animais para adoção responsável. Procede também, à captura, esterilização e devolução de animais à rua, nomeadamente, gatos, para evitar a sua proliferação.
                          <br/>
                          Dá voz aos direitos dos animais!
                          </h4>
                        </div>
                      }
                    </GridItem>
                  </GridContainer>
                </div>
              </Parallax>
              <div className={windowHeightDesktop && windowSizeDesktop ? classNames(classes.main, classes.mainRaised) : classNames(classes.main, classes.mainRaisedMobileVer)}>
                <div className={classes.container}>
                  <div className={classes.section}>
                    <GridContainer justify="center">
                      <GridItem className={classes.gridItemTitle} xs={12} sm={12} md={8}>
                        <h2 className={windowHeightDesktop ? classNames(classes.titleWrning, classes.title) : classNames(classes.titleWrning, classes.titleMobile)}>Vamos falar sobre os animais?</h2>
                      </GridItem>
                    </GridContainer>
                    {
                      this.state.listNews !== null ?
                      <ListNews grid={(newGrid) => this.setState({grid: newGrid})} News={this.state.listNews} columnWidth={this.state.gridColumnWidth} classes={classes} windowSize={windowSizeDesktop} home={true}></ListNews>
                      : ""
                    }
                  </div>
                </div>
              </div>            
            </div>
        )
    }
}

export default  withStyles(landingPageStyle)(Home);