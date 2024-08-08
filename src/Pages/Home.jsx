import About from "../Components/About";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import { Box, Container } from '@mui/material';
import Services from "../Components/Services";

function Home() {
  return (
    <Box>
      <Container maxWidth="xl">
        <Header />
        <Hero />
        <About />
        <Services/>
      </Container>
    </Box>
  );
}

export default Home;
