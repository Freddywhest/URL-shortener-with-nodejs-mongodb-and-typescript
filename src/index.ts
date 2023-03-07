import express, { Application, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import { options, dbUrl } from "./config/db";
import postRouter  from './routers/main.router';

const app: Application = express();
config();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/', postRouter);

app.get('*', (req: Request, res: Response) => {
  res.render('404', { title: "S-URLShortener", page: '404' });
})


mongoose
  .connect(dbUrl(), options())
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(`Fail to connect to DB \nERR: ${err}`));

app.listen(process.env.PORT, () => {
  console.log(`App running on http://localhost:${process.env.PORT}`);
});
