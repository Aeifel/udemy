import * as React from "react";
import { useState ,useEffect} from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from '@mui/material/InputAdornment';
import { TextField, Autocomplete, Button } from "@mui/material";
import {Link} from "react-router-dom"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { allCoursesApi } from "../api/coursesApi";
const SearchField = styled(TextField)({
  "& label.Mui-focused": {
  },
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
  const [mnavOptions , setNavOptions] = useState(() => {
 });
  useEffect(()=> {
    console.log("useEffect called");
    const fetchFun = async() =>{
      return await allCoursesApi();
    }
   fetchFun().then((response) => {
 let temp = response.data.map((ele) =>  
    {
      const {courseId , courseTitle} = ele;
      return {courseId , courseTitle};
    }
    );
    setNavOptions(temp);
    });
  },[]);
  const handleSearch = (courseObj) => {
    const {courseId} = courseObj;
    window.location.href = `http://localhost:3000/course/${courseId}`
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
      <MenuItem onClick={handleMenuClose}>{localStorage.getItem("userName") ? localStorage.getItem("userName"):"Your account"}</MenuItem>
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
     <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
      <Link to="/user/login">
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
            </MenuItem>
            <MenuItem>
            <Link to="user/signup">
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
    </Menu>
  );
  //must get these values from the db
//  const defaultProps = {
//     options: mnavOptions,
//     getOptionLabel: (option) => option.courseTitle,
//   };
const defaultProps = mnavOptions;
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Link to="/" style={{textDecoration:'none'}}>
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
            options={mnavOptions}
            getOptionLabel={(options) => options.courseTitle}
            renderInput={(params) => (
              <>
                <SearchField 
                {...params} label="Search courses..."
                />
              </>
            )}
            onChange = { (event,newValue) =>{console.log(newValue.title);handleSearch(newValue);}}
          >
          </Autocomplete>
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
            <Link to="user/login">
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
            <Link to="user/signup">
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
            <IconButton
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
