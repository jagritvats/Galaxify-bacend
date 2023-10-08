const Router = require('express').Router;
const createPersonalizedSummaryForUserSinglePlanet = require('../helpers/openai.js');
const generatePrompt = require('../service/openai.js');
const recommenderService = require('../service/recommender.js');

const router = Router();

router.post('/', async (req, res) => {
	const userPrefs = req.body;
	console.log(req.body);
	const itinerary = await recommenderService(userPrefs);
	var resp = await generatePrompt(
		`User with prefs : ${JSON.stringify(
			userPrefs
		)} has itinerary list: ${JSON.stringify(
			itinerary
		)}, select and return in only the index of the best one like so : "x", without any text`
	);
	console.log(resp);
	try {
		let itineraryResult = itinerary[parseInt(resp)];
		console.log(itineraryResult);
		itineraryResult.aiSummary =
			await createPersonalizedSummaryForUserSinglePlanet(
				userPrefs,
				itineraryResult.name
			);
		return res.json([itineraryResult]);
	} catch (e) {
		console.log('Invalid response from openai');
	}
	return res.json(itinerary);
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
