import transactions from './transaction-schema';
import type {TotalTransaction} from './types';

export const createTransaction = async (request:any): Promise<any> => {
  const tran = new transactions(request);

  //Only Pedra Fofa uses feePerUse
  if (tran.product != "Fofa") {
    tran.feePerUse = 0;
    console.log("Apenas o produto Pedra Fofa tem taxa por uso");
  };

  //saves data to the DB
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
  
  //filtered by client, product and month. The PnL and margin are generated from this data
  const filtered = await transactions.find({client : clientData.client , 
    transactionMonth: clientData.month, transactionYear:  clientData.year, product: clientData.product}).exec();
  
  //reduce is applied to sum the same fields accross different transactions.
  //as a result of taxes, revenues have to be multiplied by (1-taxes/100)
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

  const useQuantRev = filtered.reduce(function(prev, cur){ return prev + 
    cur.feePerUse*0.1*cur.revenue}, 0);

  //generating the PnL structure
  var marginResult: TotalTransaction = {revenue: revenue, useQuantRev: useQuantRev, 
    productionCosts: prod, sellingCosts: sell, transportCosts: transp, taxes: tax, margin: margin};

  return marginResult;
};