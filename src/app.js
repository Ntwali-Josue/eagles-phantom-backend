import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import i18n from 'i18n';
import routes from './routers';
import router from './routers/bus.routers';


dotenv.config();

const app = express();
app.use(i18n.init);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);






app.use(cors());

app.use(router);

const port = process.env.PORT || 3020;

app.listen(port, () => {
  console.log(port);
});

export default app;
