import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const ServiceCard = ({ icon, title, description }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        elevation: 3,
        borderRadius: 2,
        padding: 2,
        textAlign: "center",
        backgroundColor: "#fff",
        "&:hover": { color: "orange", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)" },
      }}
    >
      <CardMedia
        component="div"
        sx={{
          width: "100px",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: -3,
        }}
      >
        {icon}
      </CardMedia>
      <CardContent sx={{ "&:hover": { color: "orange" } }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ "&:hover": { color: "orange" } }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
