
const supabase = require("../db/index.js")
const {capitalize} = require("../helpers/index.js")
const router = require("express").Router();

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

module.exports = router
