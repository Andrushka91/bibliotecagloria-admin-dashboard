import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  widgetWrapper: {
    display: "flex",
    minHeight: "100%",
  },
  widgetHeader: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  widgetRoot: {
    boxShadow: theme.customShadows.widget,
  },
  widgetBody: {
    paddingBottom: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  noPadding: {
    padding: 0,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "auto",
  },
  moreButton: {
    margin: -theme.spacing(1),
    padding: 0,
    width: 40,
    height: 40,
    color: theme.palette.text.hint,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "rgba(255, 255, 255, 0.35)",
    },
  },
  noWidgetShadow: {
    boxShadow: 'none'
  },
  orderTablerHeader: {
    cursor: 'pointer',
    color: 'white',
    padding: 16,
    font: '"Roboto","Helvetica","Arial",sans-serif;',
  },
  buttonModal: {
    textTransform: 'none',
    backgroundColor: '#000000',
    color: '#fff',
    fontSize: "16px",
    borderRadius: 35,
    padding: "14px 36px",
    '&:hover': {
      backgroundColor: '#000000',
      color: '#fff',
    }
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
    width: 600,
    backgroundColor: 'white',
    padding: 40,
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  }

}));
