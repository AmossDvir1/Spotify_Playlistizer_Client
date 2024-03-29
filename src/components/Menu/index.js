import React, { useState, useEffect, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import { Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoginDrawerOpen } from "../../model/globalStateSlice";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import LoginIcon from "@mui/icons-material/Login";
import Drawer from "../../generalComponents/Drawer";
import SignIn from "../SignIn";
import { routes } from "../../constants";
import { styled } from "@mui/material/styles";
import UserPanel from "../UserPanel";
import AddIcon from "@mui/icons-material/Add";
import ScienceIcon from '@mui/icons-material/Science';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import { UserContext } from "../../context/UserContext";
import useVerifyUser from "../../controllers/user/useVerifyUser";

const StyleTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: `rgb(100,100,100,${
    theme.palette.mode === "dark" ? 0.2 : 0.7
  })`,
  ...theme.typography.body2,
height:"fit-content",
  textAlign: "center",
  justifyItems: "center",
  display: "flex",
  alignItems: "center",
}));

const Menu = () => {
  const [userContext, setUserContext] = useContext(UserContext)
  const userVerified = useVerifyUser();

  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.globalState.value);
  const [value, setValue] = useState(routes.home.url);
  const [anchorElUserSettings, setAnchorElUserSettings] = useState(null);

  const onMenuItemClick = (event, newValue) => {
    setValue(newValue);
  };

  const onUserSettingsOpen = (event) => {
    setAnchorElUserSettings(event.currentTarget);
  };

  const onUserSettingsClose = () => {
    setAnchorElUserSettings(null);
  };

  useEffect(() => setValue(window.location.pathname));
  const renderUserMenuItems = () => {
    return !userVerified? (
      <div>
        <Drawer
          direction="right"
          open={globalState.loginDrawerOpen}
          setOpen={(open) => dispatch(setLoginDrawerOpen(open))}
        >
          <SignIn></SignIn>
        </Drawer>
        <StyleTabs
          value={value}
          onChange={onMenuItemClick}
          aria-label="icon label tabs example"

          sx={{
            "& .MuiTabs-flexContainer": {
              flexWrap: "wrap",
            },
          }}
        >
          <Tab
            icon={<FavoriteIcon sx={{width:"25px"}}/>}
            label=""
            component={Link}
            to={routes.home.url}
            value={routes.home.url}
            sx={{ minWidth:'65px', paddingX:'0px', fontSize:'14px'}}
          />
          <Tab
                      sx={{ minWidth:'65px', paddingX:'0px', fontSize:'14px'}}

            icon={<AddIcon sx={{width:"25px"}}/>}
            label="Create"
            component={Link}
            to={routes.create.url}
            value={routes.create.url}
          />

          <Tab
            icon={<LoginIcon sx={{width:"25px"}}/>}
            label="Sign In"
            component={Link}
            onClick={() =>
              dispatch(setLoginDrawerOpen(!globalState.loginDrawerOpen))
            }
            sx={{ right: "0px", position: "absolute", minWidth:'65px', paddingX:'0px', fontSize:'14px' }}
          />
          <Tab
            icon={<PersonPinIcon sx={{width:"25px"}} />}
            label="Sign Up"
            component={Link}
            to={routes.signUp.url}
            value={routes.signUp.url}
            sx={{ right: "7vh", position: "absolute", minWidth:'65px', paddingX:'0px', fontSize:'14px' }}
          />
        </StyleTabs>
      </div>
    ) : (
      <div>
        <Drawer
          direction="right"
          open={globalState.loginDrawerOpen}
          setOpen={(open) => dispatch(setLoginDrawerOpen(open))}
        >
          <SignIn></SignIn>
        </Drawer>
        <StyleTabs
        sx={{paddingX:'0px', marginX:'0px', width: "100%"}}
          value={value}
          onChange={onMenuItemClick}
          aria-label="icon label tabs example"
        >
          <Tab
          sx={{minWidth:'65px', paddingX:'0px', fontSize:'14px'}}
            icon={<FavoriteIcon sx={{width:"25px"}} />}
            label=""
            component={Link}
            to={routes.home.url}
            value={routes.home.url}
          />
          <Tab
            sx={{minWidth:'65px', paddingX:'0px', fontSize:'14px'}}
            icon={<AddIcon  sx={{width:"25px"}} />}
            label="Create"
            component={Link}
            to={routes.create.url}
            value={routes.create.url}
          />
          <Tab
          sx={{minWidth:'65px', paddingX:'0px', fontSize:'14px'}}
            icon={<ScienceIcon sx={{width:"25px"}} />}
            label="Analyze"
            component={Link}
            to={routes.analyzer.url}
            value={routes.analyzer.url}
          />
          <Tab
          sx={{minWidth:'65px', paddingX:'0px', fontSize:'14px'}}
            icon={<NightlifeIcon  sx={{width:"25px"}} />}
            label="Artist Tinder"
            component={Link}
            to={routes.artistTinder.url}
            value={routes.artistTinder.url}
          />
          <Tab
            value={routes.settings.url}
            onClick={onUserSettingsOpen}
            sx={{ minWidth:'fit-content', paddingX:'0px', fontSize:'5px', right: "0vh", position: "absolute", cursor: "default" }}
            icon={
              <Tooltip title="Account settings">
                <IconButton
                  size="medium"
                  // sx={{ ml: 2 }}
                  aria-controls={
                    Boolean(anchorElUserSettings) ? "account-menu" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={
                    Boolean(anchorElUserSettings) ? "true" : undefined
                  }
                >
                  <Avatar sx={{fontSize:'15px', width: 25, height: 25 }}>
                    {userContext?.firstName?.length > 0 ? userContext?.firstName[0]?.toUpperCase() : ""}
                  </Avatar>
                </IconButton>
              </Tooltip>
            }
          ></Tab>

          <Tab
            icon={<AudiotrackIcon sx={{width:"25px"}}  />}
            sx={{minWidth:'fit-content', paddingX:'0px', fontSize:'14px', right: "5vh",position: "absolute"}}
            label="My Playlists"
            component={Link}
            to={routes.playlistView.url}
            value={routes.playlistView.url}
          />
        </StyleTabs>
        <UserPanel
          anchorEl={anchorElUserSettings}
          open={Boolean(anchorElUserSettings)}
          onClose={onUserSettingsClose}
          onClick={onUserSettingsClose}
        ></UserPanel>
      </div>
    );
  };

  return renderUserMenuItems();
};

export default Menu;
