const OpenAI = require('openai');
const openai = new OpenAI();

const generatePrompt = async (text) => {
	const chatCompletion = await openai.chat.completions.create({
		messages: [{ role: 'user', content: text }],
		model: 'gpt-3.5-turbo',
	});

	console.log(chatCompletion.choices);

	return chatCompletion.choices[0].message.content;
};

module.exports = generatePrompt;
