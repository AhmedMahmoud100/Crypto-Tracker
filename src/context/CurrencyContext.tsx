import { createContext, useState } from 'react'

type currencyContexttype = {
    currency: string ,
    setcurrency: React.Dispatch<React.SetStateAction<string>>
}
type childrenProps = {
    children: React.ReactNode
}

export const currencyContext = createContext({} as currencyContexttype )

export const CryptoContext = ({ children }: childrenProps) => {
    const [currency, setcurrency] = useState<string>('USD')

    return (
        <currencyContext.Provider value={{currency, setcurrency}}>
            {children}
        </currencyContext.Provider>
    )
}




