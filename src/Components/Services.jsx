import { Box, Typography, Grid } from "@mui/material";
import WebhookIcon from "@mui/icons-material/Webhook";
import AndroidIcon from "@mui/icons-material/Android";
import ServiceCard from "./ServiceCard";
import ApiIcon from "@mui/icons-material/Api";

const Services = () => {
  const servicesData = [
    {
      icon: <AndroidIcon sx={{ fontSize: 60 }} />,
      title: "Flutter Development",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      icon: <WebhookIcon sx={{ fontSize: 60 }} />,
      title: "Web Design",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      icon: <ApiIcon sx={{ fontSize: 60 }} />,
      title: "Rest Api",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: { xs: "1.5rem", md: "3rem" },
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        sx={{ marginBottom: "2rem", fontWeight: "bold", "&:hover": { color: "orange" }, }} 
      >
        Our Services
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {servicesData.map((service, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <ServiceCard {...service} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
