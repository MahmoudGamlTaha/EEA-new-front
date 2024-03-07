export interface ExpensesRequest {
  edaraFees:number;
  totalTon:number;
  tonPrice:number;
  currencyId:number;
  ratioEdaraFee:number;
  requestId:number;
  currencyRate?: CurrencyRate
}

export interface CurrencyRate {
    rate: number,
    currencyId: number,
    date: Date
}
