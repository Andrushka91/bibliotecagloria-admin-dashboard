import { Box, IconButton, Link } from '@material-ui/core';
import Icon from '@mdi/react';
import classnames from "classnames";
import {
  Redirect, Route,
  Switch, withRouter
} from "react-router-dom";

//icons
import {
  mdiFacebook as FacebookIcon, mdiGithub as GithubIcon, mdiTwitter as TwitterIcon
} from '@mdi/js';

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages

import Charts from "../../pages/charts";
import Icons from "../../pages/icons";
import usersManagement from '../../pages/UsersManagement/UsersManagement';
import BookList from "../../pages/bookList/BookList";
import Orders from "../../pages/orders/Orders";
import AddBook from "../../pages/addBook/addBook";
// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/BookList" component={BookList} />
            <Route path="/app/AddBook" component={AddBook} />
            <Route path="/app/Orders" component={Orders} />
            <Route path="/app/UsersManagement" component={usersManagement} />
            <Route
              exact
              path="/app/ui"
              render={() => <Redirect to="/app/ui/icons" />}
            />
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />
          </Switch>
          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
          </Box>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
