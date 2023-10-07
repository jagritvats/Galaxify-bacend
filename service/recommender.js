const supabase = require('../db/index.js');
const personalizor = require('../helpers/personalize.js');

const getDestinations = async () => {
	const { data, error } = await supabase.from('destinations').select();
	return data;
};

const recommenderService = async (answers) => {
	const dests = await getDestinations();
	return personalizor(answers, dests);
};

module.exports = recommenderService;
