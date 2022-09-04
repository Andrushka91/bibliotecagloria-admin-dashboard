import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  text: {
    fontFamily: 'Roboto,sans-serif',
    fontSize: 18
  },
  confirmButton: {
    textTransform: 'none',
    borderRadius: 35,
    color: 'white',
    backgroundColor: "black",
    padding: "14px 36px",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: 'rgba(102, 102, 102, 0.8)',
      color: 'white',
    },
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
  },
  cancelButton: {
    textTransform: 'none',
    borderRadius: 35,
    color: 'white',
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: 'rgba(102, 102, 102, 0.8)',
      color: "white",
    },
    padding: "14px 36px",
    fontSize: "16px",
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    backgroundColor: 'white',
    padding: 40,
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  },
  modalAddAccount: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    backgroundColor: 'white',
    padding: 40,
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  },
  modalDialog: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 'auto',
    backgroundColor: 'white',
    padding: 40,
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  }
}));
