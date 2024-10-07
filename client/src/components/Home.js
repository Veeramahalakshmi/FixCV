import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { Button, Box, Paper, Divider } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const carousel1 = "/static/carousel1.jpg";
const carousel2 = "/static/carousel2.jpg";
const carousel3 = "/static/carousel3.jpg";
const carousel4 = "/static/carousel4.jpg";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const Home = () => {
  return (
    <div>
      <NavBar />
      <Box>
        <Carousel responsive={responsive} infinite showDots autoPlay autoPlaySpeed={3000}>
          <Paper>
            <img src={carousel1} height={400} width={400} alt="carousel1" />
          </Paper>
          <Paper>
            <img src={carousel2} height={400} width={400} alt="carousel2" />
          </Paper>
          <Paper>
            <img src={carousel3} height={400} width={400} alt="carousel3" />
          </Paper>
          <Paper>
            <img src={carousel4} height={400} width={400} alt="carousel4" />
          </Paper>
        </Carousel>
      </Box>
      <Divider></Divider>

      <br />
      <br />
      <main style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <Button component={Link} to="/signup" variant="contained" color="primary">
          Sign Up
        </Button>
        <Button component={Link} to="/login" variant="contained" color="primary">
          Login
        </Button>
      </main>
    </div>
  );
};

export default Home;
