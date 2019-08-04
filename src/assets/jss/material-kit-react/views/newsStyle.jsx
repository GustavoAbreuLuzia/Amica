import { container, title, warningColor } from "assets/jss/material-kit-react.jsx";

const newsStyle = {
    container: {
    zIndex: "12",
    ...container
    },
    title: {
    ...title,
    margin: "1.75rem 0 1.75rem",
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
    },
    subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
    },
    gridItemTitle:{
    textAlign: "center",
    },  
    titleWrning:{
    color: warningColor
    },
    subTitleMarginLeft: {
      marginLeft: "15px"
    },
    main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
    minHeight: "Calc(100vh - 194px)"
    },
    mainRaised: {
    margin: "110px 30px 0px",
    paddingBottom: "25px",
    borderRadius: "6px",
    boxShadow:
        "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    contactIconFacebook:{
    fontSize: "2.3rem",
    color: "#4267b2",
    "&:hover": {
        color: "#4267b2",
        textDecoration: "underline"
    }
    },
    contactAlign:{
    margin: "auto",
    textAlign: "center"
    },
    contactMail: {
    fontSize: "1.5rem",
    marginTop: "20px"
    },
    contactAccount: {
    fontSize: "1.5rem",
    marginTop: "20px"
    },
    otherContacts:{
    position: "absolute",
    right: "0",
    paddingTop: "22px"
    },
    otherContactsMobile: {
    paddingTop: "10px",
    paddingBottom: "20px"
    },
    contactAccountSub:{
    fontWeight: "500"
    },
    contactSendMessage: {
    justifyContent: "flex-end",
    display: "flex",
    marginBottom: "10px"
    },
    contactSendMessageMobile: {
    justifyContent: "center",
    display: "flex",
    marginBottom: "10px"
    },
    buttonContactSendMessage: {
    "&:hover": {
        backgroundColor: "#FF9800 !Important"
    }
    },
    imgBackground:{
    width: "80px",
    right: "10px",
    bottom: "5px",
    position: "absolute"
    },
    imgBackgroundMobile: {
    width: "50px",
    right: "10px",
    bottom: "5px",
    position: "absolute"
    },
    containerMobile: {
    margin: "0",
    marginBottom: "40px"
    },
    newsParagraph: {
        textIndent: "2rem"
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
    spanVerMais: {
      bottom: "0",
      right: "0",
      position: "absolute",
      color: "#9c27b0",
      cursor: "pointer"
    },
    spanVerMaisMobile: {
      fontSize: "16px",
      textDecoration: "underline"
    },
    hoverUnderline: {
      "&:hover": {
        textDecoration: "underline"
      }
    },
    newsDate: {
      justifyContent: "flex-end",
      display: "flex",
      fontSize: "12px"
    }
};    

export default newsStyle;