import { Box, Typography } from "@mui/material";
import CertificationCard from "./CertificationCard";

function Certifications() {
  const certifications = [
    {
      title: "The Complete Flutter & Dart Development Course [Arabic]",
      details:
        "Flutter , Dart , firebase create many apps like (shop app - news app - soical app)",
    },
    {
      title: "web development using React",
      details: "Use Custom Hooks and firebase",
    },
    {
      title: " Flutter Advanced Course Bloc and MVVM Pattern",
      details: " Use Bloc and MVVM Pattern for create app",
    },
  ];

  return (
    <Box p={4}>
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        textAlign="center"
        mb={4}
        sx={{
          marginBottom: "2rem",
          fontWeight: "bold",
          "&:hover": { color: "orange" },
        }}
      >
        Certifications
      </Typography>
      {certifications.map((cert, index) => (
        <CertificationCard
          key={index}
          title={cert.title}
          details={cert.details}
        />
      ))}
    </Box>
  );
}

export default Certifications;
