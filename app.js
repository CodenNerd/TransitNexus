import express from "express";
import { json, urlencoded } from "body-parser";
import apiVersion1 from './server/Router/v1';
import apiVersion2 from './server/Router/v2';
import mongoose from 'mongoose';

const app = express();
mongoose.connect('mongodb+srv://AbdulAzeez:transitnexus0987654321@transitnexus-kcfg4.mongodb.net/test?retryWrites=true&w=majority', {
  useMongoClient: true
});

app.use(json());
app.use(urlencoded({extended: false}));
app.use('/api/v1', apiVersion1); // uses objects to store data
app.use('/api/v2', apiVersion2);  // persists data with a database
app.use('/uploads', express.static('uploadedcvs'))

app.get("/", (req, res) => {
  res.send("Welcome");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

export default app;
