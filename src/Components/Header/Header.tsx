import './Header.scss'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useContext, useState } from 'react';
import { currencyContext } from '../../context/CurrencyContext';
import { Link } from 'react-router-dom';
export default function Header() {
  const [currenyList, setcurrenyList] = useState(false)
  const { currency, setcurrency } = useContext(currencyContext)

  function HandleCurrency(Currency: string) {
    setcurrenyList(false)
    setcurrency(Currency)
  }
  return (
    <header className='mainHeader container'>

      <Link to="/"><h2>Crypto Hunter</h2></Link>
      <div className='currency'>
        <h4>{currency}</h4>
        <ArrowDropDownIcon onClick={() => setcurrenyList(!currenyList)} className="downIcon" />
        <ul className={currenyList ? 'currencyList' : 'currencyList disable'}>
          <li onClick={() => HandleCurrency('USD')} >USD</li>
          <li onClick={() => HandleCurrency('EUR')}>EUR</li>
        </ul>
      </div>
    </header>
  )
}
