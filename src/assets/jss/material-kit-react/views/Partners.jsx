import { container, title, warningColor, primaryColor } from "assets/jss/material-kit-react.jsx";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-kit-react/customCheckboxRadioSwitch.jsx";
import tooltipsStyle from "assets/jss/material-kit-react/tooltipsStyle.jsx";

const landingPageStyle = {
    container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container
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
    main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
    minHeight: "Calc(100vh - 194px)"
    },
    contactSendMessage: {
      justifyContent: "flex-end",
      display: "flex",
      marginBottom: "10px"
    },
    buttonContactSendMessage: {
      height: "40px",
      "&:hover": {
        backgroundColor: "#FF9800 !Important"
      }
    },
    mainRaised: {
    margin: "110px 30px 0px",
    borderRadius: "6px",
    boxShadow:
        "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    companyGrid: {
        marginTop: "40px",
        paddingBottom: "40px"
    },
    companyGridItem: {
        display: "flex"
    },
    companyImgContainer: {
        display: "inline-table",
        margin: "auto"
    },
    primaryColor: {
        color: primaryColor
    },
    contactAccountSub:{
        fontWeight: "500"
      },
    textCenter: {
        textAlign: "center"
    },
    textConditions: {
        fontSize: "14px"
    },
    termsMobile: {
        margin: 0
    },
    termsTitleMobile: {
        marginTop: "25px",
        paddingLeft: "20px"
    },
    textCenterMobile: {
        textAlign: "center"
    },
    containerMobile: {
      margin: "0"
    },
    companyGridMobile: {
        margin: "40px 0 0 0",
        paddingBottom: "40px"
    },
    companyGridItemMobile: {
        display: "flex",
        margin: "10px 0"
    },
    ...imagesStyles,
    ...customCheckboxRadioSwitch,
    ...tooltipsStyle
}

export default landingPageStyle;