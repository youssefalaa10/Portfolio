import { Typography, Box, Container } from '@mui/material';
import FilterButtons from '../Components/FilterButtons';
import ProjectsGrid from '../Components/ProjectCard';

const Projects = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3"
        component="h2"
        gutterBottom
        sx={{ marginBottom: "2rem", fontWeight: "bold", "&:hover": { color: "orange" }, }} >
          My Projects
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
          Lorem ipsum dolor sit amet consectetur. Mollis erat duis
       
        </Typography>
      </Box>
      <Box mb={4}>
        <FilterButtons />
      </Box>
      <ProjectsGrid />
    </Container>
  );
};

export default Projects;
