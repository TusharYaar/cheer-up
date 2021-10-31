import { useState } from "react";
import styled from "styled-components";
import {
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
} from "@material-ui/core";
import ActivityList from "./ActivityList";
import Router from "next/router";

//Landing screen of patient
const User = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handlePress = async () => {
    setLoading(true);
    Router.push({ pathname: "/user/activities", query: { text } });
    setLoading(false);
  };

  return (
    <Section>
      <Grid container spacing={6} justifyContent="center" className="cont">
        <Grid item xs={12} lg={6} sm={12}>
          <div>
            <div>
              <Typography variant="h4">Hello, Ritik</Typography>
              <Typography variant="h5">How do you feel today?</Typography>
            </div>
            <InputArea>
              <Typography variant="subtitle1" color="textSecondary">
                Say what's in your mind and find things to do to make you feel
                better
              </Typography>
              <TextArea
                rows="12"
                cols="50"
                name="text"
                onChange={handleChange}
              ></TextArea>
              <SubmitButton
                type="submit"
                variant="contained"
                color="primary"
                onClick={handlePress}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : (
                  "Submit"
                )}
              </SubmitButton>
            </InputArea>
          </div>
        </Grid>

        <Grid item xs={12} lg={5} sm={12}>
          <GridBox>
            <ActivityList />
          </GridBox>
        </Grid>
      </Grid>
    </Section>
  );
};

export default User;

const InputArea = styled.div`
  margin-top: 1.5rem;
  position: relative;
`;

const Section = styled.div`
  margin-top: 1rem;
`;

const TextArea = styled.textarea`
  border-radius: 1rem;
  border: 5px solid rgb(216, 216, 216);
  padding: 1rem;
  outline: none;
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-size: 1.2rem;

  &:focus {
    border: 5px solid rgb(0, 125, 254);
  }
`;

const GridBox = styled(Box)`
  max-height: 75vh;
  overflow: hidden;
  marging-top: 1rem;
`;

const SubmitButton = styled(Button)`
  &&& {
    position: absolute;
    bottom: -40px;
    left: 2px;
    background: rgb(0, 125, 254);
    font-size: 16px;
    color: #fff;
    border: 0;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
  }
  &&&:hover {
    box-shadow: 3px 3px #c5c6d0;
  }
`;
