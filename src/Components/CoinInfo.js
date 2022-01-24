import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";

const CoinInfo = (coin) => {
  const [historicData, sethistoricData] = useState();
  const [days, setdays] = useState(1);
  const { currency } = CryptoState();

  const fetchingHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    sethistoricData(data.prices);
  };
  console.log(historicData);
  useEffect(() => {
    fetchingHistoricData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const useStyle = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "coloumn",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));
  const classes = useStyle();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {}),
              }}
            />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;

{
  /* // import React from "react";

// const CoinInfo = () => { */
}
{
  /* //   return <div>coininfo</div>;
// };

// export default CoinInfo; */
}
