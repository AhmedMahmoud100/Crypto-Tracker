import { useContext } from "react"
import { currencyContext } from "../context/CurrencyContext"



export function FormatCurrency(number: number,currency:string) {

  const Currency_Formatter = new Intl.NumberFormat(undefined, {
    currency: currency , style: "currency"
  })
  return Currency_Formatter.format(number)
}

