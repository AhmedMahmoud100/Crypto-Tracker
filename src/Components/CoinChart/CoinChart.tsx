import './CoinChart.scss'
import axios from 'axios'
import { HistoricalChart } from '../../config/Api'
import { useQuery } from '@tanstack/react-query'
import { FormatCurrency } from "../../utilities/FormatCurrency";
import { currencyContext } from "../../context/CurrencyContext";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';


export default function CoinChart() {
  const { currency } = useContext(currencyContext);
  const[days,setdays] = useState(1)
  let location = useLocation()

  const { data:historicData , isLoading  } = useQuery(["coin-chart", currency,days], () => {
    return axios.get(HistoricalChart(location.state.id ,days,currency));
},{
  select : (data) => {
    return data.data.prices
  }
});


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

 const options = {
  responsive: true,
  elements: {
    point: {
      radius: 1,
    },
  },
};

if(isLoading){
  return <div className='loading'>...loading</div>
}

  return (
    <div className='coinChart'>
      {historicData &&  <Line options={options} data={{labels :historicData.map((coin : any) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
  datasets: [
    {
      data: historicData.map((coin: any) => coin[1] ),
      borderColor: "#EEBC1D",
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],}} />
        }
       <div className='buttons'>
        <button onClick={() => setdays(1) } className={days === 1 ? "active" :"normal"}>24 Hours</button>
        <button onClick={() => setdays(30) } className={days === 30 ? "active" :"normal"}>30 Days</button>
        <button onClick={() => setdays(90) } className={days === 90 ? "active" :"normal"}>3 Months</button>
       </div>
    </div>
  )
}
