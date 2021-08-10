import { Negotiation } from "./types";

export const calculateMinPrice = async (negotiation:Negotiation): Promise<void> => {
    if (negotiation.product == "Sorte"){
        let calcBaseValue = 50;
        console.log(calcBaseValue);
    }
    else if (negotiation.product == "Fofa"){
        let calcBaseValue = 30;
        console.log(calcBaseValue);
    }
    else if (negotiation.product == "Roxa"){
        let calcBaseValue = 15;
        console.log(calcBaseValue);
    };
};