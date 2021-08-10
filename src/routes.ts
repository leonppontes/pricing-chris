import * as Service from './crud.service';
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