import {
  List as OptionList, IconButton,
  Menu,
  MenuItem, Paper, Button
} from "@material-ui/core";
import { MoreVert as MoreIcon } from "@material-ui/icons";
import classnames from "classnames";
import React, { useState } from "react";

// styles
import useStyles from "./styles";

export default function Widget({
  deleteOrder,
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

        <div style={{ display: 'flex', position: 'relative', width: '100%', margin: '0 auto', justifyContent: 'space-between' }}>
          <div style={{ width: 200, padding: 24 }}>
            <Button
            onClick={() => deleteOrder()}
              style={{
                textTransform: 'none',
                borderRadius: 35,
                color: 'white',
                backgroundColor: "red",
                padding: "14px 36px",
                fontSize: "16px",
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
              }}
              variant="contained"
            >
              Anulează
            </Button>
          </div>

          <div style={{ width: 200, padding: 24, marginRight: 24 }}>
            <Button
              style={{
                textTransform: 'none',
                borderRadius: 35,
                color: 'white',
                backgroundColor: "black",
                padding: "14px 36px",
                fontSize: "16px",
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
              }}
              variant="contained"
            >
              Procesează
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
