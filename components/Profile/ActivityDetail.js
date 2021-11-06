import React from "react";
import {
  Dialog,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  AppBar,
  Button,
  Backdrop,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import axios from "axios";
import { baseUrl } from "../../utils/config";
import Cookies from "js-cookie";
import { makeStyles } from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ActivityDetail = (props) => {
  const { handleClose, open, activity, moodHistory } = props;
  const [loading, setLoading] = React.useState(false);
  const [doneMessage, setDoneMessage] = React.useState(null);
  const token = Cookies.get("token");
  const classes = useStyles();

  const handleDone = () => setDoneMessage(null);

  const handleSelect = async () => {
    console.log(moodHistory._id);
    setLoading(true);
    try {
      const res = await axios.patch(
        `${baseUrl}/api/user/mood-history/${moodHistory._id}`,
        { activity: activity._id },
        { headers: { "auth-token": token } }
      );
      setDoneMessage("Activity added to your history");
    } catch (err) {
      setDoneMessage("Could not add activity. Try again");
    }
    setLoading(false);
  };

  return (
    activity !== null && (
      <Dialog
        fullScreen
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <AppBar style={{ background: "rgb(0, 125, 254)" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">{activity.name}</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <div>
            <ActivityDetailImage
              src="data:image/jpeg;base64,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"
              alt={activity.name}
            />
            <TitleContainer>
              <Typography variant="h3" color="inherit">
                {activity.name}
              </Typography>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSelect}
              >
                Select
              </Button>
            </TitleContainer>
            <ActivityDescription>{activity.description}</ActivityDescription>
          </div>
        </Container>
        <Backdrop open={loading} className={classes.backdrop}>
          <CircularProgress color="primary" />
        </Backdrop>
        <Snackbar
          open={doneMessage !== null ? true : false}
          autoHideDuration={6000}
          onClose={handleDone}
        >
          <Alert onClose={handleDone} severity="success">
            {doneMessage}
          </Alert>
        </Snackbar>
      </Dialog>
    )
  );
};

export default ActivityDetail;

const Container = styled.div`
  padding: 6rem 2rem;
`;

const ActivityDetailImage = styled.img`
  width: 100%;
  height: 400px;
  margin-bottom: 1rem;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ActivityDescription = styled.p`
  margin-top: 1rem;
  margin-left: 1rem;
`;
