import { Box, Typography, Button, Container, Avatar, IconButton } from "@mui/material";
import { LinkedIn, GitHub, Email } from "@mui/icons-material";

const Hero = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column-reverse", md: "row" }}
      justifyContent="space-between"
      alignItems="center"
      p={4}
      sx={{ borderRadius: "10px", mt: 4 }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <Box textAlign={{ xs: "center", md: "left" }} mt={{ xs: 4, md: 8 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Hi, I am
          </Typography>
          <Typography variant="h3" color="orange" sx={{ mb: 1 }}>
            Youssef Alaa
          </Typography>
          <Typography variant="h2" component="h1" fontWeight="bold" sx={{ mb: 3, fontSize: { xs: "2rem", md: "3rem" } }}>
            Front-End Developer
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: { xs: "1rem", md: "1.25rem" } }}>
            Front-end developer with Flutter & React.js
          </Typography>
          <Button
            variant="contained"
            color="warning"
            sx={{
              padding: { xs: "8px 16px", md: "10px 20px" },
              fontWeight: "bold",
              fontSize: { xs: "0.875rem", md: "1rem" },
              "&:hover": {
                backgroundColor: "orange",
                color: "#fff",
              },
            }}
          >
            Hire Me
          </Button>
        </Box>
      </Container>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          alt="Youssef Alaa"
          src="/assets/youssef.jpg"
          sx={{
            width: { xs: 200, md: 300 },
            height: { xs: 200, md: 300 },
            border: "5px solid orange",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            mt: { xs: 4, md: 0 },
          }}
        />
        <Box mt={2} display="flex" gap={{ xs: 1, md: 2 }}>
          <IconButton
            href="https://linkedin.com/in/youssef-alaa10"
            sx={{
              color: "default",
              "&:hover": { color: "#0077B5" },
            }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            href="https://github.com/youssefalaa10"
            sx={{
              color: "default",
              "&:hover": { color: "#333" },
            }}
          >
            <GitHub />
          </IconButton>
          <IconButton
            href="mailto:youssefalaacj@gmail.com"
            sx={{
              color: "default",
              "&:hover": { color: "#D44638" },
            }}
          >
            <Email />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
