import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";
const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
  },
  bannerContent: {
    height: 150,
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  btnRegister: {
    // flex: 0.2,
    // backgroundColor: "gold",
    // color: "black",
    // fontFamily: "Monsterrat",
    // fontWeight: "bold",
    // cursor: "pointer",
    // marginRight: 100,
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "gold",
    fontFamily: "Monsterrat",
    color: "black",
    marginLeft: 400,
    marginRight: 400,
    borderRadius: "3px",
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}></Container>
      <div className={classes.tagline}>
        {/* register */}

        <Typography
          variant="h2"
          style={{
            fontWeight: "bold",
            marginBottom: 15,
            fontFamily: "Montserrat",
          }}
        >
          Buy Bitcoin with INR
        </Typography>
        <Typography
          variant="subtitle2"
          style={{
            color: "darkgrey",
            textTransform: "capitalize",
            fontFamily: "Montserrat",
          }}
        >
          Join the world's largest crypto exchange. Designed for India
        </Typography>
        <div className={classes.btnRegister}>
          <Button>Register Now</Button>
        </div>
      </div>
      <Carousel />
    </div>
  );
};

export default Banner;
