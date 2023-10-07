const Router = require('express').Router;
const supabase = require('../db/index.js');
const router = Router();

router.get('/all', async (req, res) => {
	const { data, error } = await supabase.from('places').select();
	res.send(data);
});

router.get('/:id', async (req, res) => {
	const { data, error } = await supabase
		.from('places')
		.select()
		.eq('id', parseInt(req.params.id));
	res.send(data);
});

module.exports = router;
