import * as Service from './negotiation.service';
import * as Transaction from './transaction-mongo';
import { Negotiation } from './types';

export const negotiationResult = async (req:any, res:any) => {
    const negotiation: Negotiation = req.body;
    const result = await Service.calculateMinPrice(negotiation);
    try {
        res.status(200).send(result);
    } catch (e) {
        res.status(404).send(e.message);
    }
};

export const getMargin = async (req:any, res:any) => {
    const request: any = req.query;
    const margin = await Transaction.getMargin(request);
    console.log(margin);
    try {
        res.status(200).send(margin);
    } catch (e) {
        res.status(404).send(e.message);
    }
}