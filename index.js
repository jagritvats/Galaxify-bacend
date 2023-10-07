
const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
const morgan = require("morgan")
const destinationRouter = require("./routes/destination")
const activityRouter = require("./routes/activities")
const placeRouter = require("./routes/places")
const supabase = require("./db/index")

const app = express();

const PORT = 8080;
dotenv.config();

// using morgan for logs
app.use(morgan('combined'));

app.use(cors());
app.use(express.json());

app.get('/products', async (req, res) => {
	const {data, error} = await supabase
	.from('products')
	.select()

	if(error){
		console.log(error)
	}
	res.send(data);
});

app.use('/api/destinations', destinationRouter);
app.use('/api/activities', activityRouter);
app.use('/api/places', placeRouter);

app.get('/health', (req, res) => {
  res.send('I am alive...');
});

app.get('/', (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.listen(PORT, () => console.log(`Example app is listening on port ${PORT}.`));