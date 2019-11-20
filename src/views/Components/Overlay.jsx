import React from "react";

//Styles
import withStyles from "@material-ui/core/styles/withStyles";
import overlayStyle from "../assets/jss/material-kit-react/components/overlayStyle.jsx";

class OverlayComponent extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      const { classes } = this.props;
      return ( 
        <div className={classes.maxGridOverlay}></div>
      )
    }
}

export default withStyles(overlayStyle)(OverlayComponent);