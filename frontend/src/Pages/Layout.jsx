import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { isUserSignedIn, signUserOut } from "../Tools/userTools";
import "./Layout.css";
import Button from "@mui/material/Button";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Layout() {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            variant="h4"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, cursor: "pointer", userSelect: "none" }}
            onClick={() => navigate("/")}
          >
            Quiz.io
          </Typography>

          {isUserSignedIn() && location.pathname !== "/profile" ? (
            <>
              <nav>
                <Button
                  variant="outlined"
                  sx={{ my: 1, mx: 1.5 }}
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </Button>
              </nav>
              <nav>
                <Button
                  variant="outlined"
                  sx={{ my: 1, mx: 1.5 }}
                  onClick={() => {
                    signUserOut();
                    navigate("/login");
                  }}
                >
                  Sign out
                </Button>
              </nav>
            </>
          ) : isUserSignedIn() ? (
            <>
              <nav>
                <Button
                  variant="outlined"
                  sx={{ my: 1, mx: 1.5 }}
                  onClick={() => {
                    signUserOut();
                    navigate("/login");
                  }}
                >
                  Sign out
                </Button>
              </nav>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
