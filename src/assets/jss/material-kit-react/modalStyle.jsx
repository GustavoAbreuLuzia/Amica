const modalStyle = {
  modal: {
    borderRadius: "6px"
  },
  modalMobileUniqueImage: {
    borderRadius: "6px",
    minWidth: "Calc(100% - 60px)"
  },
  modalHeader: {
    borderBottom: "none",
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "0",
    paddingLeft: "24px",
    minHeight: "16.43px"
  },
  modalTitle: {
    margin: "0",
    lineHeight: "1.42857143"
  },
  modalCloseButton: {
    color: "#999999",
    marginTop: "-12px",
    WebkitAppearance: "none",
    padding: "0",
    cursor: "pointer",
    background: "0 0",
    border: "0",
    fontSize: "inherit",
    opacity: ".9",
    textShadow: "none",
    fontWeight: "700",
    lineHeight: "1",
    float: "right"
  },
  modalClose: {
    width: "16px",
    height: "16px"
  },
  modalBody: {
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "16px",
    paddingLeft: "24px",
    position: "relative",
    scrollbarWidth: "none", /* Firefox */
    msOverflowStyle: "none",  /* IE 10+ */
    "&::-webkit-scrollbar": {
      width: 0,
      height: 0
    }
  },
  modalBodyUniqueImage: {
    minWidth: "600px",
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "16px",
    paddingLeft: "24px",
    position: "relative",
    scrollbarWidth: "none", /* Firefox */
    msOverflowStyle: "none",  /* IE 10+ */
    "&::-webkit-scrollbar": {
      width: 0,
      height: 0
    }
  },
  modalFooter: {
    padding: "15px",
    textAlign: "right",
    paddingTop: "0",
    margin: "0"
  },
  descriptionModal: {
    marginBottom: "10px",
    display: "block"
  },
  modalFooterCenter: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  containerModal: {
    minWidth: "600px"
  }
};

export default modalStyle;
