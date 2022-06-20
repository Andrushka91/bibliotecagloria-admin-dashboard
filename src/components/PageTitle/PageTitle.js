
// styles
import useStyles from "./styles";

// components
import { BookList } from "../Wrappers";

export default function PageTitle(props) {
  var classes = useStyles();

  return (
    <div className={classes.pageTitleContainer}>
      <BookList className={classes.typo} variant="h1" size="sm">
        {props.title}
      </BookList>
      {props.button && props.button}
    </div>
  );
}
