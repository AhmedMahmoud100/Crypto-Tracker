import './CryptoTableSection.scss'
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CoinList } from "../../config/Api";
import { FormatCurrency } from "../../utilities/FormatCurrency";
import { currencyContext } from "../../context/CurrencyContext";
import { useContext, useEffect, useState } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { coinType } from '../../Types/CoinType';

export default function CryptoTableSection() {
  const { currency } = useContext(currencyContext);
  const [currencyData, setcurrencyData] = useState<any>([])
  const [pageNumber, setPageNumber] = useState(1)
  const [SearchValue, setSearchValue] = useState<any>('')
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(["coin-table", currency], () => {
    return axios.get(CoinList(currency));
  });

  useEffect(() => {
    if (data) {
      let shownData = data!.data.slice(0, 10)
      setcurrencyData([...shownData])
    }
  }, [data])

  function CurrencyDataHandler(number: number) {
    let start = number * 10 - 10
    let end = number * 10
    let shownData = data!.data.slice(start, end)
    setcurrencyData([...shownData])
    setPageNumber(number)
  }

  function CoinsPage(e: any) {
    let number = Number(e.target.dataset.number)
    CurrencyDataHandler(number)
  }

  function PageSlider(e : any) {
    if (e.target.dataset.dir === "right" && pageNumber < 10) {
      let number = pageNumber + 1
      CurrencyDataHandler(number)
    }
    else if ((e.target.dataset.dir === "left" && pageNumber > 1)) {
      let number = pageNumber - 1
      CurrencyDataHandler(number)
    }
  }

  useEffect(() => {
    if (data && SearchValue != '') {
      let searchResult = data!.data.filter((coin: coinType) => {
        if (coin.name!.toLowerCase().includes(SearchValue.toLowerCase())) {
          return coin
        }
      })
      setcurrencyData([...searchResult])
    }
    else if (data && SearchValue == '') {
      CurrencyDataHandler(pageNumber)
    }
  }, [SearchValue])

  function HandleNavigation(coin: coinType) {
    navigate(`/${coin.id}`, { state: { id: coin.id } });
  }

  if (isLoading) {
    return <div className='loading table'><Loading /></div>
  }
  return (

    <section className="cryptoTableSection container">
      <h2>Cryptocurrency Prices by Market Cap </h2>
      <input onChange={(e) => setSearchValue(e.target.value)} value={SearchValue}
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

          {currencyData.map((coin: coinType) => {
            let profit = coin.price_change_percentage_24h! >= 0;
            return (
              <tr key={coin.id} onClick={() => HandleNavigation(coin)}>
                <td>
                  <img src={coin.image} alt="" />
                  <div>
                    <span>{coin.symbol}</span>
                    <span>{coin.name}</span>
                  </div>
                </td>
                <td>{FormatCurrency(coin.current_price!, currency)}</td>
                <td>
                  <span className={profit ? "plus" : "minus"}>
                    {profit && "+"}
                    {coin.price_change_percentage_24h!.toFixed(2)} %
                  </span>
                </td>
                <td>{FormatCurrency(coin.market_cap!, currency)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {SearchValue == '' && <div className="tablefooter">
        <ChevronLeftIcon onClick={PageSlider} data-dir="left" />
        <div onClick={CoinsPage} data-number="1">1</div>
        <div onClick={CoinsPage} data-number="2">2</div>
        <div onClick={CoinsPage} data-number="3">3</div>
        <div onClick={CoinsPage} data-number="4">4</div>
        <div onClick={CoinsPage} data-number="5">5</div>
        <div>...</div>
        <div onClick={CoinsPage} data-number="10">10</div>
        <KeyboardArrowRightIcon onClick={PageSlider} data-dir="right" />
      </div>}
      
    </section>
  );
}
