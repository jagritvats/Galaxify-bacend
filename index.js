import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import destinationRouter from "./routes/destination.js"
import activityRouter from './routes/activities.js';
import placeRouter from './routes/places.js';
import supabase from './db/index.js';
const app = express();

const PORT = 8080;
dotenv.config();

// using morgan for logs
app.use(morgan('combined'));

app.use(cors());
app.use(express.json());

app.get('/products', async (req, res) => {
	const { data, error } = await supabase.from('destinations').select();
	res.send(data);
});

app.use('/api/destination', destinationRouter);
app.use('/api/activities', activityRouter);
app.use('/api/places', placeRouter);

app.get('/health', (req, res) => {
  res.send('I am alive...');
});

app.listen(PORT, () => console.log(`Example app is listening on port ${PORT}.`));