import About from "../Components/About";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import { Box, Container } from '@mui/material';

function Home() {
  return (
    <Box>
      <Container maxWidth="xl">
        <Header />
        <Hero />
        <About />
      </Container>
    </Box>
  );
}

export default Home;
