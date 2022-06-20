import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";

// components
import { BookList } from "../Wrappers";

export default function UserAvatar({ color = "primary", ...props }) {
  var classes = useStyles();
  var theme = useTheme();

  var letters = props.name
    .split(" ")
    .map(word => word[0])
    .join("");

  return (
    <div
      className={classes.avatar}
      style={{ backgroundColor: theme.palette[color].main }}
    >
      <BookList className={classes.text}>{letters}</BookList>
    </div>
  );
}
