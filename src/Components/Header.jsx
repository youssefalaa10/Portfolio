import { AppBar, Toolbar, Button, Box } from "@mui/material";
import LogoSVG from "./LogoSvg";

const Header = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        padding: { xs: "10px 20px", md: "10px 40px" },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* SVG Logo */}
        <Box
          sx={{
            width: { xs: 190, md: 190 },
            height: "auto",
            pointerEvents: "cursor",
          }}
        >
          <LogoSVG width="100%" height="100%" color="orange" />
        </Box>

        <Box
          sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}
        >
          <Button
            color="inherit"
            sx={{
              textTransform: "capitalize",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "orange",
                color: "#fff",
              },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            sx={{
              textTransform: "capitalize",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "orange",
                color: "#fff",
              },
            }}
          >
            About Me
          </Button>
          <Button
            color="inherit"
            sx={{
              textTransform: "capitalize",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "orange",
                color: "#fff",
              },
            }}
          >
            Services
          </Button>
          <Button
            color="inherit"
            sx={{
              textTransform: "capitalize",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "orange",
                color: "#fff",
              },
            }}
          >
            Projects
          </Button>
          <Button
            color="inherit"
            sx={{
              textTransform: "capitalize",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "orange",
                color: "#fff",
              },
            }}
          >
            Contact
          </Button>
          <Button
            variant="contained"
            color="warning"
            sx={{
              padding: { xs: "6px 12px", md: "8px 16px" },
              fontWeight: "bold",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "orange",
                color: "#fff",
              },
            }}
          >
            Download CV
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
