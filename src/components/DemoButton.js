import DemoButton from "@mui/material/DemoButton";

const DemoButton = () => {
  return (
    <Button
      variant="contained"
      sx={{
        ":hover": {
          bgcolor: "#AF5",
          color: "white"
        }
      }}
    >
      My Button
    </Button>
  );
};

export default DemoButton