export type Negotiation = {
    product: string;                                      //Sorte, Fofa or Roxa 
    price: number;                                        //suggested price
    clientName: string;                                   //client name
    volume: number;                                       //monthly revenue in BRL
    sellerExperience: number;                            //years of experience
    taxesIndex: number;                                  //taxes index paid by the client based on the  client working field (0 - 4)
    locationIndex: string;                               //check http://www.custodevida.com.br/brasil/ (0 - 4)
    updatedAt: Date;                                     //generated data time and date
  };