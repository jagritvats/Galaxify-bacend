import { Router } from 'express';
import recommenderService from '../service/recommender.js';

const router = Router();

router.post('/', async (req, res) => {
	const userPrefs = req.body;
	console.log(req.body);
	const itinerary = await recommenderService(userPrefs);
	res.json(itinerary);
});

export default router;
