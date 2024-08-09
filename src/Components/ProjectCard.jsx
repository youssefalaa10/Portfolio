import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";

const ProjectCard = ({ image, title, category }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        m: 2,
        boxShadow: 3,
        transition: "transform 0.3s ease-in-out",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <CardMedia component="img" height="200" image={image} alt={title} />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {category}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

const ProjectsGrid = () => {
  const projects = [
    {
      image: "/assets/instaimage.png",
      title: "AirCalling Landing Page Design",
      category: "Web Design",
    },
    {
      image: "/assets/instaimage.png",
      title: "Business Landing Page Design",
      category: "Web Design",
    },
    {
      image: "/assets/instaimage.png",
      title: "Ecommerce Web Page Design",
      category: "Web Design",
    },
  ];

  return (
    <Box my={4} sx={{ px: 2 }}>
      <Grid container spacing={4} justifyContent="center">
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={project.title}>
            <ProjectCard
              image={project.image}
              title={project.title}
              category={project.category}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectsGrid;
