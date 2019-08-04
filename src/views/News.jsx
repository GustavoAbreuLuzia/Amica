import React from "react";

// Api
import api from "../Utils/api";

//Style
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import newsStyle from "assets/jss/material-kit-react/views/newsStyle.jsx";

//Components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Carousel from "react-slick";
import ListNews from 'views/Components/ListNews.jsx';

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridColumnWidth: "33.33%",
            windowSize: 1280,
            windowHeight: 800,
            id: props.match.params.id,
            news: {
                title: "Carregando...",
                description: "",
                images: []
            },
            listNews: null,
            grid: null
        }
        this.updateDimensions = this.updateDimensions.bind(this);
    }
    componentWillMount() {
        this.updateDimensions();
    }
    async componentDidMount(){
        window.scrollTo(0,0);
        window.addEventListener("resize", this.updateDimensions);
        window.addEventListener("orientationchange", this.updateDimensions);

        if (this.state.news.title === "Carregando..."){
            const news = await api.get(`/news/${this.state.id}`);
            this.setState({news: news.data});
        }

        if (this.state.listNews === null){
            const news = await api.get('/News', {
                params: {
                    quantity: 5
                }
            });        
            this.setState({listNews: news.data});
        }
    }
    componentDidUpdate(){
        if(this.state.grid !== null){
            const _grid = this.state.grid;
            setTimeout(function () {
                _grid.updateLayout();
            });
        }
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
    formatDate(date) {
        const datetime = new Date(date);

        return `Publicado em ${datetime.getDate()}-${("0" + (datetime.getMonth() + 1)).slice(-2)}-${datetime.getFullYear()} ${datetime.getHours()}:${datetime.getMinutes()}`
    }
    render() {
        const { classes } = this.props;
        const windowSizeDesktop = this.state.windowSize > 780;
        const windowHeightDesktop = this.state.windowHeight > 500;
        return (  
            <div className={classNames(classes.main, classes.mainRaised)}>
              <div className={classes.container}>
                <div className={classes.section}>
                  <GridContainer justify="center">
                    <GridItem className={classes.gridItemTitle} xs={12} sm={12} md={8}>
                      <h2 className={classNames(classes.titleWrning, classes.title)}>{this.state.news.title}</h2>
                    </GridItem>
                  </GridContainer>
                  <GridContainer xs={12} className={classes.containerMobile} justify={windowSizeDesktop ? "" : "center"}>
                    <GridItem xs={this.state.news.imgSrc !== "" ? 6 : 12}>
                        <p className={classes.newsParagraph}>
                            {this.state.news.description}
                        </p>
                        <label className={classes.newsDate}>
                            {this.formatDate(this.state.news.Created_Date)}
                        </label>
                    </GridItem>
                    {
                        this.state.news.imgSrc !== "" ?
                        <GridItem xs={this.state.news.imgSrc !== "" ? 6 : 12}>
                            <Carousel {...{dots: false,
                                    arrows: windowSizeDesktop,
                                    infinite: true,
                                    speed: 500, 
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    autoplay: true}}>
                                {
                                    this.state.news.images.map((image) => {
                                        return <div className={classes.divCarousel}>
                                            <img
                                                src={`../${image}`}
                                                className={windowSizeDesktop ? classes.imgCarousel : classes.imgCarouselMobile}
                                            />
                                        </div>
                                    })
                                }
                            </Carousel>
                        </GridItem>
                        : ""
                    }
                </GridContainer>
                <h4 className={classNames(classes.title, classes.titleWrning, classes.subTitleMarginLeft)}>Últimas Notícias</h4>
                {
                    this.state.listNews !== null ?
                        <ListNews grid={(newGrid) => this.setState({grid: newGrid})} News={this.state.listNews} columnWidth={this.state.gridColumnWidth} classes={classes} windowSize={windowSizeDesktop} home={false}></ListNews>
                    : ""
                }
                </div>
            </div>
        </div>
        )
    }
}

export default  withStyles(newsStyle)(News);