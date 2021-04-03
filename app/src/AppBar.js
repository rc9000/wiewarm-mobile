import React, {  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    searchinput: {
        width: "100%",
        flexGrow: 1,
    },
}));



export default function ButtonAppBar({searchInput, handleSearchInput}) {

    const handleSearchClick = (event) => {
        console.log("search click:", event)
    };

    /*
    const handleSearchInput = (event) => {
        console.log("search input:", event.target.value);
        setSearchInput(event.target.value);
    };
    */

    const classes = useStyles();
    //const [searchInput, setSearchInput] = useState("");

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>h&auml;ndy.wiewarm.ch</Typography>
                    <IconButton onClick={handleSearchClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <SearchIcon />
                    </IconButton>
                </Toolbar>

                <form className={classes.searchinput} noValidate autoComplete="off">
                    <TextField spellCheck="false" id="outlined-basic" label="Sueche..." variant="outlined"  value={searchInput} onChange={handleSearchInput} />
                </form>
            </AppBar>
        </div>
        );
    }
    