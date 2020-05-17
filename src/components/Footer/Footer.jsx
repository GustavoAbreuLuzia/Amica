/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { List, ListItem, withStyles } from "@material-ui/core";

// Router
import { NavLink } from "react-router-dom";  

// Components
import Button from "../../components/CustomButtons/Button.jsx";

import footerStyle from "../../assets/jss/material-kit-react/components/footerStyle.jsx";

function Footer({ ...props }) {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.labelAsA]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    props.admin ? null :
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.facebook.com/Associa%C3%A7%C3%A3o-Amicus-Canis-AMICA-248535658531716/"
                className={classNames(classes.block, classes.a)}
                target="_blank"
              >
                About us
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://animalife.com.pt"
                className={classNames(classes.block, classes.a)}
                target="_blank"
              >
                Animalife
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classNames(classes.right, classes.block)}>
          &copy; {1900 + new Date().getYear()} , Created by{" "}
          <NavLink to={"/Us"}>
            <label className={aClasses}>
                Us
            </label>
          </NavLink>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
