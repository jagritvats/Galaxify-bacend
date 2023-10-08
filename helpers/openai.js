const openai = require('openai');
const generatePrompt = require('../service/openai');

// const createPersonalizedSummaryForUserMultiplePlanets = (
// 	userPrefs,
// 	topPlanets
// ) => {
// 	// Define the prompt for the OpenAI API
// 	const prompt = `Recommended planets: ${topPlanets.join(
// 		', '
// 	)}\nUser preferences:${userPrefs}
//     \nGenerate a summary of the recommended planets based on the user preferences.`;

// 	generatePrompt(prompt);
// };

const createPersonalizedSummaryForUserSinglePlanet = async (
	userPrefs,
	planet
) => {
	// Define the prompt for the OpenAI API
	const prompt = `Recommended Planet: ${planet}\n on basis of User preferences:${JSON.stringify(
		userPrefs
	)}
    \nGenerate a cool and fun summary, using cool facts of the planet based on the user preferences. Keep it brief using a catchy one liner.`;
	console.log(prompt);
	var chatCompletionText = await generatePrompt(prompt);
	return chatCompletionText;
};

module.exports = createPersonalizedSummaryForUserSinglePlanet;
