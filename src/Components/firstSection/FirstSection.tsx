import './FirstSection.scss'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { CoinList } from '../../config/Api'
import { FormatCurrency } from '../../utilities/FormatCurrency'
import { currencyContext } from '../../context/CurrencyContext'
import { useContext } from 'react'

export default function FirstSection() {

  const {currency} = useContext(currencyContext)
  const { data } = useQuery(['coin-list',currency], () => {
    return axios.get(CoinList(currency))
  }, {
    select: data => {
      const coinsData = data.data.filter((e: any, i: number) => {
        if (i < 20) return e
      })
      return coinsData
    }
  }
  )

  return (
    <section className="firstSection">
      <div className="container">
        <header className="firstSectionHeader">
          <h1>Crypto Hunter</h1>
          <p>Get all The Info Regardeing Your Favorite Crypto Currency</p>
        </header>
        <section className='currencyData'>
          {data && data.map((coin: any) => {
            let profit = coin.price_change_percentage_24h >=0
            return <ul key={coin.id}>
              <li><img src={coin.image} alt="" /></li>
              <li>{coin.symbol}<span className={profit ? "plus" : "minus"}>{ profit && '+'}{coin.price_change_percentage_24h.toFixed(2)} %</span></li>
              <li>{FormatCurrency(coin.current_price,currency)}</li>
            </ul>
          })}
        </section>
      </div>
    </section>
  )
}
