import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { primaryColor } from "../../assets/jss/material-kit-react.jsx";

import customInputStyle from "../../assets/jss/material-kit-react/components/customInputStyle.jsx";

function CustomInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    datepicker,
    valueDate,
    onChangeDate,
    dateFormat
  } = props;

  const theme = createMuiTheme({
    palette: {
      primary: {main: primaryColor},
    },
  });
  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white
  });
  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }
  return (
    <ThemeProvider theme={theme}>
      <FormControl {...formControlProps} className={formControlClasses}>
        {labelText !== undefined && datepicker ? (
          <InputLabel
            className={classes.labelRoot + " " + labelClasses}
            htmlFor={id}
            shrink={datepicker && valueDate ? true : false}
            {...labelProps}
          >
            {labelText}
          </InputLabel>
        ) : null}
        {labelText !== undefined && !datepicker ? (
          <InputLabel
            className={classes.labelRoot + " " + labelClasses}
            htmlFor={id}
            {...labelProps}
          >
            {labelText}
          </InputLabel>
        ) : null}
        {datepicker ? 
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
              autoOk
              disableFuture
              clearable
              id={id}
              openTo="year"
              value={valueDate}
              onChange={onChangeDate}
              format={dateFormat}
              views={["year", "month", "date"]}
              className={inputClasses + " " + marginTop + " " + classes.disabled + " " + underlineClasses}            
          />
        </MuiPickersUtilsProvider>
        : 
        <Input
          classes={{
            input: inputClasses,
            root: marginTop,
            disabled: classes.disabled,
            underline: underlineClasses
          }}
          id={id}
          {...inputProps}
          inputProps={inputProps !== undefined && inputProps.maxLength !== undefined ? {
            maxLength: inputProps.maxLength // MaxLength do not work directly on {...inputProps}
          } : {}}       
        />}
      </FormControl> 
    </ThemeProvider>
  );
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool
};

export default withStyles(customInputStyle)(CustomInput);
