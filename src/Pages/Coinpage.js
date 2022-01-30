import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
// import CoinInfo from "../Components/CoinInfo";

import { numberWithCommas } from "../Components/CoinTable";
// import HTMLReactParser from "html-react-parser";

const Coinpage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  console.log(coin);
  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles(() => ({
    container: {
      display: "flex",
      // flexDirection: "row",
      // [theme.breakpoints.down("md")]: {
      //   flexDirection: "column",
      //   alignment: "center",
      // },
      flexDirection: "column",
      alignItems: "center",
    },

    sidebar: {
      width: "40%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 15,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 10,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      //making it responsive
      // [ThemeProvider.breakpoints.down("md")]: {
      //   display: "flex",
      //   justifyContent: "space-around",
      // },
      // [ThemeProvider.breakpoints.down("sm")]: {
      //   flexDirection: "flex",
      //   justifyContent: "space-around",
      // },
      // [ThemeProvider.breakpoints.down("xs")]: {
      //   alignItems: "start",
      // },
    },
  }));
  const classes = useStyles();
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    //     // <h1>this is coin page ,coming soon</h1>
    //     // single coin page
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {coin?.description.en.split(".")[0]}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}
              {""}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}
              {""}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>

      {/* chart */}
      {/* <CoinInfo coin={coin} /> */}
    </div>
  );
};
export default Coinpage;
