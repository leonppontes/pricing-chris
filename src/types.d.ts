export type Negotiation = {
    product: string;                                      //Sorte, Fofa or Roxa 
    price: number;                                        //suggested price
    clientName: string;                                   //client name
    volume: number;                                       //monthly revenue in BRL
    sellerExperience: number;                            //years of experience
    taxesIndex: number;                                  //taxes index paid by the client based on the  client working field (0 - 4)
    locationIndex: number;                               //check http://www.custodevida.com.br/brasil/ (0 - 4)
    };

export type Transaction = {
    client: String;
    product: String;
    revenue: Number;
    productionCosts: Number;
    sellingCosts: Number;
    transportCosts: Number;
    taxes: Number;
    };