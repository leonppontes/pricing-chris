import transactions from './transaction-schema';

export const createTransaction = async (request:any): Promise<any> => {
  let tran = new transactions(request);
    tran.save((err:any, result:any) => {      
        if (err) {
            console.log("Error!");
          } else {
            console.log(result);
        }
    });
  return tran;
};

export const getMargin = async (request:any): Promise<string> => {
  var marginResult = "";
  const clientData = request;
  const filtered = await transactions.find({client : clientData.client , transactionMonth: clientData.month, transactionYear:  clientData.year, product: clientData.product}).exec();
  const margin = filtered.reduce(function(prev, cur)
  {
    return prev + ((cur.revenue*(1-(cur.taxes / 100))) - (cur.productionCosts - cur.sellingCosts - cur.transportCosts));
  }, 0);
  marginResult = `A margem do produto no mês desse cliente é de ${margin} reais`;
  return marginResult;
};