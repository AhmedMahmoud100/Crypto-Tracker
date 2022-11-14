
export function FormatCurrency(number: number, currency: string) {

  const Currency_Formatter = new Intl.NumberFormat(undefined, {
    currency: currency, style: "currency"
  })
  if (number / 1000000 > 1) {
    return Currency_Formatter.format(number / 1000000) + 'M'
  } else if (number / 1000000000 > 1) {
    return Currency_Formatter.format(number / 1000000000) + 'B'
  } else {
    return Currency_Formatter.format(number)
  }

}

