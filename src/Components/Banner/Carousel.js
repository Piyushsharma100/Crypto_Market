import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../CoinTable";
// const useStyles = makeStyles(() => ({
//   carousel: {
//     height: "50%",
//     dispaly: "flex",
//     alignItems: "center",
//   },
//   carouselItem: {
//     display: "flex",
//     flexDirection: "coloumn",
//     alignItems: "center",
//     cursor: "pointer",
//     textTransform: "uppercase",
//     color: "white",
//   },
// }));

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  // const classes = useStyles();
  const { currency, symbol } = CryptoState(); // take currency and symbol
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  console.log(trending);
  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
  const useStyles = makeStyles(() => ({
    carousel: {
      height: "50%",
      dispaly: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "coloumn",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
  }));
  const classes = useStyles();

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24 >= 0;
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{
            marginTop: 60,
            marginBottom: 40,
          }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas.coin?.current_price.tofixed(2)}
        </span>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 5,
    },
  };
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mauseTracking
        infinite
        autpPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
