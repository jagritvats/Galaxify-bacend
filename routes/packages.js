const Router = require('express').Router;
const supabase = require('../db/index.js');

const router = Router();

router.get('/all', async (req, res) => {
	const { data, error } = await supabase.from('pkgs').select();
	res.send(data);
});

router.get('/:id', async (req, res) => {
	const { data: package, error } = await supabase
		.from('packages')
		.select()
		.eq('id', parseInt(req.params.id));

	if (!!package[0].ActivityIDs) {
		const { data: activities } = await supabase
			.from("activities")
			.select()
			.in("id", package[0].ActivityIDs);
	
		package[0].activities = activities;
	} else {
		package[0].activities = [];
	}
	res.send(package);
});

module.exports = router;
