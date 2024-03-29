import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getPlayerName, isUserSignedIn, signUserOut } from "../Tools/userTools";
import "./Layout.css";
import Button from "@mui/material/Button";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Layout() {
  const navigate = useNavigate();

  const location = useLocation();

  const playerName = getPlayerName();

  const welcomeWords = [
    "Hello",
    "Hola",
    "Ciao",
    "Bonjour",
    "Guten Tag",
    "Hej",
    "Hallo",
    "Hei",
    "Aloha",
    "Salam",
    "Namaste",
    "Sawubona",
    "Sveiki",
    "Szia",
    "Kamusta",
    "Salamatak",
    "Salam aleikum",
    "Sawadee ka",
    "Privet",
    "Merhaba",
    "Konnichiwa",
    "Annyeonghaseyo",
    "Ni hao",
    "Zdravstvuyte",
    "Asalaam alaikum",
  ];

  function randomGreeting() {
    return welcomeWords[Math.floor(Math.random() * welcomeWords.length)];
  }

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography component="span" 
            variant="h4"
            color="inherit"
            noWrap
            sx={{
              cursor: "pointer",
              userSelect: "none",
              flexGrow: 1,
            }}
            onClick={() => navigate("/")}
          >
            Quiz.io
          </Typography>

          {isUserSignedIn() && location.pathname !== "/profile" ? (
            <>
              <Typography component="span" 
                variant="h4"
                color="inherit"
                noWrap
                sx={{ userSelect: "none", flexGrow: 1 }}
              >
                {randomGreeting()} {playerName}!
              </Typography>
              <nav>
                <Button
                  variant="outlined"
                  sx={{ mx: 1.5, flexGrow: 0.5 }}
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
                  sx={{ mx: 1.5, flexGrow: 0.5 }}
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
              <Typography component="span" 
                variant="h4"
                color="inherit"
                noWrap
                sx={{ userSelect: "none", flexGrow: 1 }}
              >
                {randomGreeting()} {playerName}!
              </Typography>
              <nav>
                <Button
                  variant="outlined"
                  sx={{ mx: 1.5, flexGrow: 1 }}
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
                sx={{ mx: 1.5 }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                sx={{ my: 1 }}
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
