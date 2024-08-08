import { Box, Typography, Slider, Container, Avatar } from '@mui/material';

const About = () => {
  const skills = [
    { label: 'Flutter', value: 90 },
    { label: 'React.js', value: 80 },
    { label: 'Problem Solving', value: 70 },
    { label: 'API', value: 85 },
  ];

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems="flex-start"
      p={4}
      sx={{ borderRadius: '10px', mt: 4, gap: { xs: 4, md: 8 } }}
    >
      <Avatar
        alt="Youssef Alaa"
        src="/assets/aboutme.jpg" 
        sx={{
          width: { xs: 150, md: 380 },
          height: { xs: 150, md: 380 },
          border: '5px solid orange',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          mb: { xs: 4, md: 0 }
        }}
      />
      <Container maxWidth="lg" sx={{ mt: { xs: 2, md: 0 } }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          About Me
        </Typography>
        <Typography variant="body1" mb={4}>
          Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa nibh lectus netus in.
        </Typography>
        {skills.map((skill) => (
          <Box key={skill.label} mb={4}>
            <Typography variant="subtitle1" fontWeight="bold">{skill.label}</Typography>
            <Slider value={skill.value} aria-label={skill.label} disabled color='orange'  />
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default About;
