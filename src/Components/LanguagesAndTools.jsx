import { Box, Typography, Container } from "@mui/material";
import Slider from "react-slick";
import { FaGitAlt, FaGithub, FaReact } from "react-icons/fa";
import { IoLogoJavascript, IoLogoCss3 } from "react-icons/io5";
import { RiFlutterFill } from "react-icons/ri";
import { SiDart, SiPostman } from "react-icons/si";

// Import the slick-carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const toolIcons = [
  { icon: <SiDart size={50} color="#0175C2" />, label: "Dart" },
  { icon: <RiFlutterFill size={50} color="rgb(79 168 242)" />, label: "Flutter" },
  { icon: <FaReact size={50} color="#61DAFB" />, label: "React" },
  { icon: <IoLogoJavascript size={50} color="#F7DF1E" />, label: "JavaScript" },
  { icon: <IoLogoCss3 size={50} color="#1572B6" />, label: "CSS3" },
  { icon: <FaGitAlt size={50} color="#F05032" />, label: "Git" },
  { icon: <FaGithub size={50} color="#181717" />, label: "GitHub" },
  { icon: <SiPostman size={50} color="#FF6C37" />, label: "Postman" },
];

const ToolIconSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 2,
    transition: "transform 0.3s ease-in-out",
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {toolIcons.map((tool, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 2,
            p: 2,
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.1)" },
          }}
        >
          {tool.icon}
          <Typography variant="body2" sx={{ mt: 1, color: "white" }}>
            {tool.label}
          </Typography>
        </Box>
      ))}
    </Slider>
  );
};

const LanguagesAndTools = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8, margin: "8px auto" }}>
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            marginBottom: "2rem",
            fontWeight: "bold",
            "&:hover": { color: "orange" },
          }}
        >
          Languages and Tools
        </Typography>
      </Box>
      <ToolIconSlider />
    </Container>
  );
};

export default LanguagesAndTools;
