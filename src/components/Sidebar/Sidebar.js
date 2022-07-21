import { Drawer, IconButton, List } from "@material-ui/core";
import {
  ArrowBack as ArrowBackIcon, FilterNone as UIElementsIcon,
  List as ListIcon, HelpOutline as FAQIcon, Home as HomeIcon,
  LibraryBooks as LibraryIcon, NotificationsNone as NotificationsIcon,
  QuestionAnswer as SupportIcon
} from "@material-ui/icons";

import MenuBookIcon from '@mui/icons-material/MenuBook';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

// components
import Dot from "./components/Dot";
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  toggleSidebar, useLayoutDispatch, useLayoutState
} from "../../context/LayoutContext";

const structure = [
  { id: 0, type: "title", label: "NAVIGARE" },
  {
    id: 1,
    label: "Bibliotecă",
    link: "/app/BookList",
    icon: <LibraryBooksIcon />,
  },
  { id: 2, label: "Adăugare carte", link: "/app/AddBook", icon: <MenuBookIcon /> },
  { id: 3, label: "Listă Comenzi", link: "/app/Orders", icon: <ListIcon /> },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
