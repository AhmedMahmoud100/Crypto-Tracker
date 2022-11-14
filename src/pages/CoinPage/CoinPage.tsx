import CoinChart from '../../Components/CoinChart/CoinChart'
import CoinInfo from '../../Components/CoinInfo/CoinInfo'
import './CoinPage.scss'

export default function CoinPage() {
  return (
    <div className='coinPage'>
      <CoinInfo />
      <CoinChart />
    </div>
  )
}
