export type Negotiation = {
    product: "Sorte" | "Roxa" | "Fofa";                   //Sorte, Fofa or Roxa are the only possible input
    price: number;                                        //suggested price during negotiation
    clientName: string;                                   //client name
    volume: number;                                       //client monthly revenue in BRL
    sellerExperience: number;                             //seller years of experience
    taxesIndex: number;                                   //taxes index paid by the client based on the  client working field (0 - 4)
    locationIndex: number;                                //check http://www.custodevida.com.br/brasil/
    };

export type Transaction = {
    client: String;
    product: "Sorte" | "Roxa" | "Fofa";                   //Sorte, Fofa or Roxa are the only possible input
    revenue: Number;                                      //Transaction total revenue
    productionCosts: Number;                              //Transaction costs
    sellingCosts: Number;
    transportCosts: Number;
    taxes: Number;                                        //Transaction taxes percentage. 11.25% if the client is brazillian
    transactionMonth: Number;                             //Month and year. Sellers can save transactions made in the past
    transactionYear: Number;
    feePerUse?: Number;                                   //Per use fee. Only for Pedra fofa
    };

export type TotalTransaction = {
    revenue: Number;                                      //total monthly revenue
    useQuantRev: Number;                                  //total monthly revenue from use fee
    productionCosts: Number;                              //total monthly costs (productio, selling and transporting)
    sellingCosts: Number;
    transportCosts: Number;
    taxes: Number;                                       //total taxes cost
    margin: Number;                                      //total monthly margin
    };