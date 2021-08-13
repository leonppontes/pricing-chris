import * as Service from './negotiation-service';
import * as TranService from './transaction-service';
import { Negotiation, Transaction} from './types';


export const negotiationResult = async (req:any, res:any) => {
    const negotiation: Negotiation = req.body;
    const result = await Service.calculateMinPrice(negotiation);
    try {
        res.status(200).send(result);
    } catch (e) {
        res.status(404).send(e.message);
    }
};

export const createTransaction = async (req:any, res:any) => {
    const creReq: Transaction = req.body;
    const trans = await TranService.createTransaction(creReq);
    try {
        res.status(200).send(trans);
    } catch (e) {
        res.status(404).send(e.message);
    }
};

export const getMargin = async (req:any, res:any) => {
    const request: any = req.query;
    const margin = await TranService.getMargin(request);
    try {
        res.status(200).send(margin);
    } catch (e) {
        res.status(404).send(e.message);
    }
}