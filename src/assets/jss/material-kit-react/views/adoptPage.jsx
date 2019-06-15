import { container, title, warningColor, primaryColor } from "assets/jss/material-kit-react.jsx";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.jsx";
import modalStyle from "assets/jss/material-kit-react/modalStyle.jsx";

const adoptPage = {
    container: {
        zIndex: "12",
        color: "#FFFFFF",
        ...container
    },
    main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
    minHeight: "Calc(100vh - 194px)"
    },
    mainRaised: {
    margin: "110px 30px 0px",
    borderRadius: "6px",
    boxShadow:
        "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    imgGrid: {
        maxWidth: "100%",
        cursor: "pointer",
        "&:hover": {
            boxShadow: "0 16px 24px 2px rgba(0, 0, 0, 0.3), 0 6px 30px 5px rgba(0, 0, 0, 0.3), 0 8px 10px -5px rgba(0, 0, 0, 0.3)"
        }
    },   
    title: {
        ...title,
        display: "inline-block",
        position: "relative",
        marginTop: "30px",
        minHeight: "32px",
        color: "#FFFFFF",
        textDecoration: "none"
    },
    titleWrning:{
        color: warningColor
    },   
    gridItemTitle:{
        textAlign: "center",
    },
    paddingBottom: {
        paddingBottom: "20px"
    },
    imageNone: {
        display: "none"
    },
    divCarousel: {
        textAlign: "center"
    },
    imgCarousel: {
        width: "40%",
        margin: "auto"
    },
    imgCarouselMobile: {
        width: "100%",
        margin: "auto"
    },    
    buttonContactSendMessage: {
        height: "40px",
        "&:hover": {
          backgroundColor: "#FF9800 !Important"
        }
    },
    ...imagesStyles,
    ...modalStyle
}

export default adoptPage;