import { Transaction } from "./types";
import transactions from './transaction-schema';

export const createTransaction = async (req:any, res:any) => {
    const request: Transaction = req.body;
    console.log(JSON.stringify(request))
    let tran = new transactions(request);
    tran.insertOne((err:any, result:any) => {      //isso daqui tá errado eu acho
        if (err) {
            res.send("Error!");
          } else {
            console.log(JSON.stringify(result))
            res.send(result);
        }
    });
};

//TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
export const getMargin = async (req:any, res:any) => {
    transactions.find((err: any, result: any) => {
        if (err) {
          res.send("Error!");
        } else {
        // Fazer aqui o cálculo da margin
          res.send(result);
        }
    });
};