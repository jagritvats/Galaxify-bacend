import supabase from '../db/index.js';
import personalizor from '../helpers/personalize.js';

const getDestinations = async () => {
	const { data, error } = await supabase.from('destinations').select();
	return data;
};

const recommenderService = async (answers) => {
	const dests = await getDestinations();
	return personalizor(answers, dests);
};

export default recommenderService;
