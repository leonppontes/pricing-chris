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
          console.log(clientName);
          //trabalhar com o result e enviar de volta a margin
          res.send(result);
        }
      }       
    );
};

//find tem que achar todo mundo com o nome da empresa e daí isso vai ser salvo em result. Daí depois em result tem que somar os campos iguais