import "./CryptoTableSection.scss";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CoinList } from "../../config/Api";
import { FormatCurrency } from "../../utilities/FormatCurrency";
import { currencyContext } from "../../context/CurrencyContext";
import { useContext } from "react";

export default function CryptoTableSection() {
  const { currency } = useContext(currencyContext);

  const { data } = useQuery(["coin-table", currency], () => {
    return axios.get(CoinList(currency));
  });

  return (
    <section className="cryptoTableSection container">
      <h2>Cryptocurrency Prices by Market Cap </h2>
      <input
        type="text"
        placeholder="Search For a Crypto Currency"
        className="searchinput"
      />
      <table className="currencyTable">
        <thead>
        <tr className="tableHead">
          <th>Coin</th>
          <th>Price</th>
          <th>24h Change</th>
          <th>Market Cap</th>
        </tr>
        </thead>
        <tbody>
        {data &&
          data.data.map((coin: any) => {
            let profit = coin.price_change_percentage_24h >= 0;
            return (
              <tr key={coin.id}>
                <td>
                  <img src={coin.image} alt="" />
                  <div>
                    <span>{coin.symbol}</span>
                    <span>{coin.name}</span>
                  </div>
                </td>
                <td>{FormatCurrency(coin.current_price , currency) }</td>
                <td>
                  <span className={profit ? "plus" : "minus"}>
                    {profit && "+"}
                    {coin.price_change_percentage_24h.toFixed(2)} %
                  </span>
                </td>
                <td>{FormatCurrency(coin.market_cap,currency)}</td>
              </tr>
            );
          })}
          </tbody>
      </table>
    </section>
  );
}
