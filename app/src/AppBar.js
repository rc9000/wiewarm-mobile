import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import BuildIcon from '@material-ui/icons/Build';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';

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
    dp_none: {
        display: "none",
    },
    dp_block: {
        display: "block",
    },
}));



export default function ButtonAppBar({searchInput, handleSearchInput, handleSortInput}) {

    const classes = useStyles();
    const [showSearch, setShowSearch] = useState("dp_none");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { t, i18n } = useTranslation();

    const handleSearchClick = (event) => {
        console.log("search click:", event, classes)

        if (showSearch === "dp_none"){
            setShowSearch("dp_block");
        }else{
            setShowSearch("dp_none");
        }
    };

    const handleLang  = (event) => {
        i18n.changeLanguage(event.currentTarget.dataset.lng);
        setAnchorEl(null);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = (event) => {
        console.log("mclose", event.currentTarget.dataset.sort);
        setAnchorEl(null);
        handleSortInput(event.currentTarget.dataset.sort);
    };

    /*
    const handleSearchInput = (event) => {
        console.log("search input:", event.target.value);
        setSearchInput(event.target.value);
    };
    */

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title }>{t('AppTitle')}</Typography>
                    <IconButton onClick={handleSearchClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <SearchIcon />
                    </IconButton>
                    <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <BuildIcon />
                    </IconButton>

                    <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
                        <MenuItem data-sort="SORT_DIST" onClick={handleClose}>{t("Sortiere nach Dischtanz")}</MenuItem>
                        <MenuItem data-sort="SORT_DATE" onClick={handleClose}>{t("Sortiere nach Datum")}</MenuItem>
                        <hr/>
                        <MenuItem data-lng="chBE" onClick={handleLang}>Sproch Bärndütsch</MenuItem>
                        <MenuItem data-lng="de" onClick={handleLang}>Sprache Deutsch</MenuItem>
                    </Menu>
                </Toolbar>

                <form className={classes.searchinput + " " + showSearch} noValidate autoComplete="off">
                    <TextField className={showSearch} autoFocus spellCheck="false" id="outlined-basic" label={t("Sueche...")} 
                        variant="outlined" value={searchInput} onChange={handleSearchInput} />
                </form>
            </AppBar>
        </div>
        );
    }
    