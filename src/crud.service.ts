import { Negotiation } from "./types";

export const calculateMinPrice = async (negotiation:Negotiation): Promise<string> => {
    var calcBaseValue = 50;
    var result = "";
    var invalidInput = false;
    if (negotiation.product == "Sorte"){
        if (negotiation.volume > 1000) {
            calcBaseValue = calcBaseValue - 5;
        };
        if (negotiation.sellerExperience >= 5) {
            calcBaseValue = calcBaseValue - 5;
        };
        if (negotiation.volume < 0 || negotiation.sellerExperience <0) {invalidInput = true};
        if (negotiation.taxesIndex > 0) {
            switch (negotiation.taxesIndex) {
                case 1: calcBaseValue = calcBaseValue - 8; break;
                case 2: calcBaseValue = calcBaseValue - 6; break;
                case 3: calcBaseValue = calcBaseValue - 4; break;
                case 4: calcBaseValue = calcBaseValue - 2; break;
                default: invalidInput = true; console.log("Índice de impostos inválido"); break;
            }
        }
        if (negotiation.locationIndex > 0 && negotiation.locationIndex < 350) {
            if (negotiation.locationIndex < 100) {calcBaseValue = calcBaseValue - 6;}
            else if (negotiation.locationIndex < 158) {calcBaseValue = calcBaseValue - 4;}
            else if (negotiation.locationIndex < 241) {calcBaseValue = calcBaseValue - 2;}
        }
        else {
            invalidInput = true;
            console.log("Índice de localização inválido")
        }

        if (invalidInput = true) {
            result = "Entrada inválida";
        }
        else {
            if (negotiation.price >= calcBaseValue) {
                result = "Preço sugerido é válido. O preço mínimo para essa negociação é de ${calcBaseValue} reais";
            }
            else {
                result = "Preço sugerido não é válido. O preço mínimo para essa negociação é de ${calcBaseValue} reais";
            };
        }
    }
    else if (negotiation.product == "Fofa"){
        calcBaseValue = calcBaseValue - 20;
        //to do
    }
    else if (negotiation.product == "Roxa"){
        calcBaseValue = calcBaseValue - 35;
        //to do
    }
    else {
        console.log("Produto não registrado")
    };

    return result;
};