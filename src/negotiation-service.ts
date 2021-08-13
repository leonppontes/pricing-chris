import { Negotiation } from "./types";

export const calculateMinPrice = async (negotiation:Negotiation): Promise<string> => {
    var calcBaseValue = 0;
    var sale = "";
    var result = "";
    var invalidInput = false;      //valid/invalid input flag

    //the start base value changes with product
    if (negotiation.product == "Sorte"){
        calcBaseValue = 50;
    }
    else if (negotiation.product == "Fofa"){
        calcBaseValue =  45;
    }
    else if (negotiation.product == "Roxa"){
        calcBaseValue = 30;
    }
    else {
        console.log("Produto não registrado")
    };

    //clients with high volume get a discount
    if (negotiation.volume > 1000) {
        calcBaseValue = calcBaseValue - 5;
    };

    //sellers with at least 5 years experience can give a discount to clients
    if (negotiation.sellerExperience >= 5) {
        calcBaseValue = calcBaseValue - 5;
    };

    //looking for invalid inputs
    if (negotiation.volume < 0 || negotiation.sellerExperience < 0) {invalidInput = true};

    //market segment with more tax gains lower discounts
    if (negotiation.taxesIndex > 0) {
        switch (negotiation.taxesIndex) {
            case 1: calcBaseValue = calcBaseValue - 8; break;
            case 2: calcBaseValue = calcBaseValue - 6; break;
            case 3: calcBaseValue = calcBaseValue - 4; break;
            case 4: calcBaseValue = calcBaseValue - 2; break;
            default: invalidInput = true; console.log("Índice de impostos inválido"); break;
        }
    }
    
    //cities with higher cost of living receive smaller discounts
    if (negotiation.locationIndex > 0 && negotiation.locationIndex < 350) {
        if (negotiation.locationIndex < 100) {calcBaseValue = calcBaseValue - 6;}
        else if (negotiation.locationIndex < 158) {calcBaseValue = calcBaseValue - 4;}
        else if (negotiation.locationIndex < 241) {calcBaseValue = calcBaseValue - 2;}
    }
    else {
        invalidInput = true;                                     //looking for invalid inputs
        console.log("Índice de localização inválido")
    }

    //some clients are eligible for the Dia de Sorte promotion
    if (negotiation.volume > 5000 || negotiation.locationIndex >= 290 ){
        sale = "Essa localização ou volume é elegível para a promoção Dia de Sorte. O Preço mínimo recebeu R$ 5,00 de desconto.";
        calcBaseValue = calcBaseValue - 5;
    } else{
        sale = "";
    };

    if (invalidInput == true) {
        result = "Entrada inválida";
    }
    else {
        if (negotiation.price >= calcBaseValue) {
            result = `Preço sugerido é válido. O preço mínimo para essa negociação é de ${calcBaseValue} reais.\n ${sale}`;
        }
        else {
            result = `Preço sugerido não é válido. O preço mínimo para essa negociação é de ${calcBaseValue} reais.\n ${sale}`;
        };
    }

    return result;
};