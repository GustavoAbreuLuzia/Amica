import { container, title, warningColor } from "assets/jss/material-kit-react.jsx";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.jsx";
import modalStyle from "assets/jss/material-kit-react/modalStyle.jsx";

const landingPageStyle = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container
  },
  containerTitleMobile: {
    width: "100%",
    maxWidth: "100%"
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
  titleMobile: {
    ...title,
    display: "inline-block",
    position: "relative",
    margin: "18px 0 0 0",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  titleWrning:{
    color: warningColor
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
  },
  gridItemTitle:{
    textAlign: "center",
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    padding: "0 0 30px 0",
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  mainRaisedMobileHor: {
    padding: "0 0 30px 0",
    margin: "-5px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  mainRaisedMobileVer: {
    padding: "0 0 30px 0",
    margin: "-30px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  maxHeightText: {
    height: "200px",
    display: "inline-block",
    overflow: "hidden",
    position: "relative"
  },
  maxHeightTextImage: {
    height: "150px",
    overflow: "hidden",
    position: "relative"
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
  descriptionClassWrapper: {
    position: "relative"
  },
  imgModal: {
    margin: "auto",
    display: "block",
    width: "40%"
  },
  imgModalFull: {
    margin: "auto",
    display: "block",
    width: "90%"
  },
  ...imagesStyles, 
  ...modalStyle
};

export default landingPageStyle;
