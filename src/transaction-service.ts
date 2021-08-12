import transactions from './transaction-schema';
import type {TotalTransaction} from './types';

export const createTransaction = async (request:any): Promise<any> => {
  var tran = new transactions(request);

  if (tran.product != "Fofa") {
    tran.feePerUse = 0;
  }

    tran.save((err:any, result:any) => {      
        if (err) {
            console.log("Error!");
          } else {
            console.log(result);
        }
    });
  return tran;
};

export const getMargin = async (request:any): Promise<TotalTransaction> => {
  const clientData = request;
  //
  const filtered = await transactions.find({client : clientData.client , 
    transactionMonth: clientData.month, transactionYear:  clientData.year, product: clientData.product}).exec();
  
  const margin = filtered.reduce(function(prev, cur)
  {
    return prev + ((cur.revenue*(1-(cur.taxes / 100))) - cur.productionCosts - cur.sellingCosts -
     cur.transportCosts + (cur.feePerUse*0.1*cur.revenue*(1-(cur.taxes / 100))));
  }, 0);
  const revenue = filtered.reduce(function(prev, cur){ return prev + cur.revenue}, 0);
  const prod = filtered.reduce(function(prev, cur){ return prev + cur.productionCosts}, 0);
  const sell = filtered.reduce(function(prev, cur){ return prev + cur.sellingCosts}, 0);
  const transp = filtered.reduce(function(prev, cur){ return prev + cur.transportCosts}, 0);
  const tax = filtered.reduce(function(prev, cur){ return prev + ((cur.taxes*cur.revenue)/100) +
     ((cur.taxes*cur.feePerUse*0.1*cur.revenue)/100)}, 0);
  const useQuantRev = filtered.reduce(function(prev, cur){ return prev + cur.revenue}, 0);

  let marginResult: TotalTransaction = {revenue: revenue, useQuantRev: useQuantRev, productionCosts: prod, sellingCosts: sell, 
    transportCosts: transp, taxes: tax, margin: margin};

  return marginResult;
};