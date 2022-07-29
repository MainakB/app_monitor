import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Spinner = ({
  show,
  backdropInvisible,
  size,
  showCounter,
}: {
  show: boolean;
  backdropInvisible?: boolean;
  size?: "large" | "medium" | "regular" | "small";
  showCounter?: boolean;
}) => {
  const [open, setOpen] = React.useState(show || false);
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const getSize = (value?: string) => {
    switch (value) {
      case "small":
        return 30;
      case "regular":
        return 40;
      case "medium":
        return 50;
      case "large":
        return 60;
      default:
        return 40;
    }
  };

  return (
    <div>
      <Backdrop
        invisible={backdropInvisible || false}
        // sx={{
        //   color: (theme) => theme.palette.action.active,
        //   zIndex: (theme) => theme.zIndex.drawer + 1,
        // }}
        sx={{
          color: (theme) => theme.palette.action.active,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
        onClick={handleClose}
      >
        {showCounter ? (
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              value={progress}
              variant="determinate"
              size={getSize(size)}
              color="inherit"
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >{`${Math.round(progress)}%`}</Typography>
            </Box>
          </Box>
        ) : (
          <CircularProgress size={getSize(size)} color="inherit" />
        )}
      </Backdrop>
    </div>
  );
};
