import './CoinInfo.scss'
import axios from 'axios'
import { SingleCoin } from '../../config/Api'
import { useQuery } from '@tanstack/react-query'
import { FormatCurrency } from "../../utilities/FormatCurrency";
import { currencyContext } from "../../context/CurrencyContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

export default function CoinInfo() {
    const { currency } = useContext(currencyContext);
    let location = useLocation()

    const { data } = useQuery(["coin-info", currency], () => {
        return axios.get(SingleCoin(location.state.id));
    });

    return (
        <div className='coinInfo'>
            <img src={data?.data.image.large} alt="" />
            <h2>{data?.data.name}</h2>
            <p>{data?.data.description.en.split('. ')[0]}</p>
            <div>Rank : <span> {data?.data.market_cap_rank}</span></div>
            <div>Current Price : <span> {FormatCurrency(data?.data.market_data.current_price[currency.toLowerCase()], currency)}</span></div>
            <div>Market Cap : <span> {FormatCurrency(data?.data.market_data.market_cap[currency.toLowerCase()], currency)}</span></div>
        </div>
    )
}
