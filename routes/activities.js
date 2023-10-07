import { Router } from 'express';
import supabase from '../db/index.js';
import { capitalize } from '../helpers/index.js';

const router = Router();

router.get('/all', async (req, res) => {
	const { data, error } = await supabase.from('activities').select();
	res.send(data);
});

router.get('/:name', async (req, res) => {
	const { data, error } = await supabase
		.from('activities')
		.select()
		.eq('activityName', capitalize(req.params.name));
	res.send(data);
});

export default router;
