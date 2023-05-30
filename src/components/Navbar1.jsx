import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { TextField, Autocomplete, Button } from "@mui/material";

import { AuthContext } from "../contexts/AuthContext";
const SearchField = styled(TextField)({
  "& label.Mui-focused": {},
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--textSecondary)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--textPrimary)",
      borderRadius: "2rem",
    },
    "&:hover fieldset": {
      borderColor: "var(--textSecondary)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--textSecondary)",
    },
  },
});
export default function PrimarySearchAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { auth , setAuth , setUserToken , setType } = useContext(AuthContext);
  const [mnavOptions, setNavOptions] = useState(() => {});
  useEffect(() => {
    setNavOptions(props.navOptions);
  }, []);
 const handleSearch = (courseObj) => {
    const { _id } = courseObj;
    sessionStorage.setItem("courseId", _id);
  };
  const handleLogout = () => {
    setAuth(false);
    setUserToken(null);
    setType(null);
    sessionStorage.clear();
    localStorage.clear();
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {auth && (
        <>
        <Link to="/user/profile">
          <MenuItem onClick={handleMenuClose}>Your account</MenuItem>
        </Link>
          <Button
            variant="outlined"
            sx={{
              color: "var(--textSecondary)",
              marginInline: "10px",
              borderColor: "var(--textSecondary)",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
 
        </>
      )}
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {auth && 
      <><MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Link to="/user/profile">
          <p>Profile</p>
        </Link>
          <Button
            variant="outlined"
            sx={{
              color: "var(--textSecondary)",
              marginInline: "10px",
              borderColor: "var(--textSecondary)",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
 
 
      </MenuItem>
      </>}

      {!auth && <MenuItem>
        <Link to="/login">
          <Button
            variant="outlined"
            sx={{
              color: "var(--textSecondary)",
              marginInline: "10px",
              borderColor: "var(--textSecondary)",
            }}
          >
            Login
          </Button>
        </Link>
      </MenuItem>}
      {!auth && <MenuItem>
        <Link to="/signup">
          <Button
            variant="outlined"
            sx={{
              color: "var(--textSecondary)",
              marginInline: "10px",
              borderColor: "var(--textSecondary)",
            }}
          >
            Signup
          </Button>
        </Link>
      </MenuItem>
}
    </Menu>
  );
 const defaultProps = mnavOptions;
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h4"
              noWrap
              component="div"
              color={"black"}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <span style={{ color: "var(--textSecondary)" }}>U</span>Learn
            </Typography>
          </Link>
          <Autocomplete
            sx={{ width: "350px", marginLeft: "100px" }}
            options={props.navOptions}
            getOptionLabel={(options) => options.courseTitle}
            renderInput={(params) => (
              <>
                <SearchField {...params} label="Search courses..." />
              </>
            )}
            onChange={(event, newValue) => {
              console.log(newValue.title);
              sessionStorage.setItem("courseId", newValue._id);
              navigate(`/course/`);
            }}
          ></Autocomplete>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}
          >
            {/* <ShoppingCartIcon
              sx={{
                color: "var(--textSecondary)",
                "&:hover": { cursor: "pointer" },
              }}
              titleAccess="Your purchases"
            /> */}
            {!auth && <Link to="/login">
              <Button
                variant="outlined"
                sx={{
                  color: "var(--textSecondary)",
                  marginInline: "10px",
                  borderColor: "var(--textSecondary)",
                }}
              >
                Login
              </Button>
            </Link>}

            {!auth && <Link to="/signup">
              <Button
                variant="outlined"
                sx={{
                  color: "var(--textSecondary)",
                  marginInline: "10px",
                  borderColor: "var(--textSecondary)",
                }}
              >
                Signup
              </Button>
            </Link>}
            {auth && 
            <><IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle sx={{ color: "black" }} />
            </IconButton>
          <Button
            variant="outlined"
            sx={{
              color: "var(--textSecondary)",
              marginInline: "10px",
              borderColor: "var(--textSecondary)",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
 
            </>}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
