import { Transaction } from "./types";
import transactions from './transaction-schema';

export const createTransaction = async (req:any, res:any) => {
    const request: Transaction = req.body;
    console.log(JSON.stringify(request))
    let tran = new transactions(request);
    tran.save((err:any, result:any) => {      //importar db e collection
        if (err) {
            res.send("Error!");
          } else {
            console.log(JSON.stringify(result))
            res.send(result);
        }
    });
};

export const getMargin = async  function(req:any, res:any) {
  let clientName = req.query;
    transactions.aggregate(
      [
        {
          $group: {
            _id: "$client",
            totalRev: {
              $sum: "$revenue"
            },
            totalProd: {
              $sum: "$productionCosts"
            },
            totalSel: {
              $sum: "$sellingCosts"
            },
            totalTra: {
              $sum: "$transportCosts"
            }
          }
        }
      ],
      function (err: any, result: any) {
        if(err) {
          res.send("Error!");
        } else {
          const filtered = result.filter(elem => elem._id === clientName.clientName);
          const margin = filtered[0].totalRev - filtered[0].totalProd - filtered[0].totalSel - filtered[0].totalTra
          const PnL = `A margem mensal é de ${margin} reais`
          res.status(200).send(PnL);
        }
      }       
    );
};