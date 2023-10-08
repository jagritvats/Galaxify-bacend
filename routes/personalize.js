const Router = require('express').Router;
const createPersonalizedSummaryForUserSinglePlanet = require('../helpers/openai.js');
const recommenderService = require('../service/recommender.js');

const router = Router();

router.post('/', async (req, res) => {
	const userPrefs = req.body;
	console.log(req.body);
	const itinerary = await recommenderService(userPrefs);
	res.json(itinerary);
});

router.post('/summary', async (req, res) => {
	const userPrefs = req.body.userPrefs;
	const planet = req.body.planet;
	console.log(req.body);
	const summaryForUser = await createPersonalizedSummaryForUserSinglePlanet(
		userPrefs,
		planet
	);
	res.json({
		summary: summaryForUser,
	});
});

module.exports = router;
