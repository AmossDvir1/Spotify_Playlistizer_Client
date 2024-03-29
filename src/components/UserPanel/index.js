import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Menu,
  Avatar,
  MenuItem,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { routes } from "../../constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { openSpotifyWindow } from "../../controllers/spotify/openSpotifyWindow";
import { UserContext } from "../../context/UserContext";
import "./UserPanel.css";
import { logout } from "../../controllers/user/logout";
import ErrorSnackBar from "../../generalComponents/ErrorSnackBar";

const UserPanel = ({ position, anchorEl, open, onClose, onClick }) => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [isErrorLoggingOut, setIsErrorLoggingOut] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogOut = async () => {
    const logoutRes = await logout({
      username: userContext?.username,
      password: userContext?.password,
    });
    if (logoutRes.data.success) {
      localStorage.removeItem("access_token");
      setUserContext((oldValues) => {});
      navigate(routes.home.url);
    } else {
      setIsErrorLoggingOut(true);
    }
  };
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={onClose}
        onClick={onClick}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: "20vw",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 2,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          sx={{ display: "flex", justifyContent: "center", cursor: "default" }}
          onClick={(e) => e.stopPropagation()}
        >
          <Box display="flex" justifyContent="center" marginY={2}>
            <Typography sx={{ cursor: "default", fontWeight: 400 }}>
              Hello {userContext?.firstName} {userContext?.lastName}
            </Typography>
          </Box>
        </MenuItem>
        <Divider />

        <MenuItem>
          <Avatar
            sx={{
              width: "26px !important",
              height: "26px !important",
              marginLeft: "2px !important",
            }}
          />
          <Typography fontWeight={300}>My Account</Typography>
        </MenuItem>

        {localStorage.getItem(userContext?.userId + "spotifyAccessToken") ? (
          <MenuItem
            onClick={(e) => e.stopPropagation()}
            sx={{ cursor: "default" }}
          >
            <ListItemIcon sx={{ cursor: "default" }}>
              <CheckCircleIcon fontSize="medium" sx={{ color: "green" }} />
            </ListItemIcon>
            <Typography sx={{ cursor: "default" }} fontWeight={300}>
              Spotify Account Connected
            </Typography>
          </MenuItem>
        ) : (
          <MenuItem onClick={() => openSpotifyWindow(userContext?.userId)}>
            <Avatar />
            <Typography fontWeight={300}>Connect Your Spotify</Typography>
          </MenuItem>
        )}

        <MenuItem component={Link} to={routes.settings.url}>
          <ListItemIcon>
            <Settings fontSize="medium" />
          </ListItemIcon>
          <Typography fontWeight={300}>Settings</Typography>
        </MenuItem>

        <Divider />
        <MenuItem onClick={onLogOut}>
          <ListItemIcon>
            <Logout fontSize="medium" />
          </ListItemIcon>
          <Typography fontWeight={300}>Log Out</Typography>
        </MenuItem>
      </Menu>
      <ErrorSnackBar
        open={isErrorLoggingOut}
        onClose={() => setIsErrorLoggingOut(false)}
        promptStr={"Error Occurred"}
      ></ErrorSnackBar>
    </>
  );
};

export default UserPanel;
