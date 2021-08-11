import { Transaction } from "./types";
import transactions from './transaction-schema';

export const createTransaction = async (req:any, res:any) => {
    const request: Transaction = req.body;
    console.log(JSON.stringify(request));
    let tran = new transactions(request);
    tran.save((err:any, result:any) => {      
        if (err) {
            res.send("Error!");
          } else {
            console.log(JSON.stringify(result))
            res.send(result);
        }
    });
};

export const getMargin = async (request:any): Promise<any> => {
  const clientData = request;
  const filtered = await transactions.find({client : clientData.client , transactionMonth: clientData.month, transactionYear:  clientData.year, product: clientData.product}).exec();
  const margin = filtered.reduce(function(prev, cur)
  {
    return prev + ((cur.revenue*(1-(cur.taxes / 100))) - (cur.productionCosts - cur.sellingCosts - cur.transportCosts));
  }, 0);
  return margin
};