

export const toCapitalize = (str:string) => {
    const f = str.charAt(0).toUpperCase();
    return `${f}${str.substring(1)}`
} 


export const moneyFormat = ({country, currency}:{country:string, currency:string}) => {
    return new Intl.NumberFormat(`${country}`, {
        style: 'currency',
        currency: `${currency}`,
      });
}