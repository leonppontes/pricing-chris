import cors from 'cors';
import express from 'express';
import * as dotenv from "dotenv";
import mongoose from 'mongoose';
import helmet from "helmet";
import * as routes from './routes';
import * as crud from './transaction-mongo';

dotenv.config();

if (!process.env.PORT) {
  console.log(`Error to get ports`);
    process.exit(1);
 }

 const uri: string = "mongodb://127.0.0.1:27017/";

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Connecting to MONGO`);
  }
});

 const PORT: number = parseInt(process.env.PORT as string, 10);
 
 const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// Send message for default URL
app.get('/', (req, res) => res.send('Welcome to the Pricing API'));

// Calculates the negotiation price
app.post ('/negotiation', routes.negotiationResult);

// Insert transaction
app.post ('/transaction', crud.createTransaction);

//get client Profit and Loss (getmargin)
//passar aqui um GET com uma query ?NomeDoCliente (passa espaços?)
app.get ('/transaction', crud.getMargin);