import { Button, Box } from '@mui/material';

const FilterButtons = () => {
  return (
    <Box display="flex" justifyContent="center" my={2} flexWrap="wrap" >
      {['All', 'React', 'Web Design', 'App Design', 'Flutter'].map((filter) => (
        <Button variant="outlined" sx={{ m: 1 ,borderColor: "black",border:1, color: "grey","&:hover": { transform: "scale(1.05)" ,backgroundColor: "orange", color: "white" , border: "none"} }} key={filter}>
          {filter}
        </Button>
      ))}
    </Box>
  );
};

export default FilterButtons;
