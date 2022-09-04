import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({

    verticalContainer: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column'
    },
    horizontalContainer: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row'
    },
    tableOverflow: {
        overflow: 'auto'
    }

}));