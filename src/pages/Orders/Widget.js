import {
  List as OptionList, IconButton,
  Menu,
  MenuItem, Paper, Button
} from "@material-ui/core";
import { MoreVert as MoreIcon } from "@material-ui/icons";
import classnames from "classnames";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// styles
import useStyles from "./styles";

export default function Widget({
  processOrder,
  orderCancelation,
  children,
  title,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  noHeaderPadding,
  headerClass,
  style,
  noWidgetShadow,
  ...props
}) {
  var classes = useStyles();

  // local
  var [moreButtonRef, setMoreButtonRef] = useState(null);
  var [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
  const [cancelOrder, setCancelOrder] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const orderCancel = () => {
    handleClose();
    orderCancelation();
  }

  const orderProcess = () => {
    handleClose();
    processOrder();
  }
  return (
    <div className={classes.widgetWrapper} style={style && { ...style }}>
      <Paper className={classes.paper} classes={{
        root: classnames(classes.widgetRoot, {
          [classes.noWidgetShadow]: noWidgetShadow
        })
      }}>
        <div className={classnames(classes.widgetHeader, {
          [classes.noPadding]: noHeaderPadding,
          [headerClass]: headerClass
        })}>
          {header ? (
            header
          ) : (
            <React.Fragment>
              <OptionList variant="h5" color="textSecondary" nowrap="true">
                {title}
              </OptionList>
              {!disableWidgetMenu && (
                <IconButton
                  color="primary"
                  classes={{ root: classes.moreButton }}
                  aria-owns="widget-menu"
                  aria-haspopup="true"
                  onClick={() => setMoreMenuOpen(true)}
                  ref={setMoreButtonRef}
                >
                  <MoreIcon />
                </IconButton>
              )}
            </React.Fragment>
          )}
        </div>
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box className={classes.modal}>
            <h2 id="parent-modal-title"> Esti sigur că vrei sa continui?</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Button className={classes.confirmButton} onClick={() => { cancelOrder ? orderCancel() : orderProcess() }}>Confirmare</Button>
              <Button className={classes.cancelButton} onClick={handleClose}>Anulare</Button>
            </div>
          </Box>
        </Modal>
        <div style={{ display: 'flex', position: 'relative', width: '100%', margin: '0 auto', justifyContent: 'space-between' }}>
          <div style={{ width: 200, padding: 24 }}>
            <Button
              onClick={() => { setCancelOrder(false); handleOpen() }}
              className={classes.confirmButton}
              variant="contained"
            >
              Procesare
            </Button>
          </div>
          <div style={{ width: 200, padding: 24, marginRight: 10 }}>
            <Button
              onClick={() => { setCancelOrder(true); handleOpen() }}
              className={classes.cancelButton}
              variant="contained"
            >
              Anulare
            </Button>
          </div>
        </div>
      </Paper >

      <Menu
        id="widget-menu"
        open={isMoreMenuOpen}
        anchorEl={moreButtonRef}
        onClose={() => setMoreMenuOpen(false)}
        disableAutoFocusItem
      >
        <MenuItem>

        </MenuItem>
        <MenuItem>

        </MenuItem>
      </Menu>
    </div >
  );
}
