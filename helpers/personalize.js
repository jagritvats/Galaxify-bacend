const difficultyScore = (planet) => {
	let score = 0;
	// if (planet.gravity < 1 && planet.gravity > 0.5) {
	// 	score += 1;
	// }
	// if (planet.gravity > 1 && planet.gravity < 2) {
	// 	score += 2;
	// } else if (planet.gravity > 2) {
	// 	score += 3;
	// }
	score += planet.gravity / 2;
	score + planet.windSpeed / 100;
	// if (planet.windSpeed > 50 && planet.windSpeed < 150) {
	// 	score += 2;
	// } else if (planet.windSpeed > 150) {
	// 	score += 3;
	// }

	if (planet.tags.includes('adverse')) {
		score += 2;
	}

	// Effort explicit modifiers only in case of not-medium effort
	if (planet.effort === 'high') {
		score += 2;
	} else if (planet.effort === 'low') {
		score /= 2;
	}
	console.log(planet.name + '-' + score);
	return score;
};

const planetComparator = (p1, p2) => {
	const p1Score = difficultyScore(p1);
	const p2Score = difficultyScore(p2);
	return p1Score < p2Score;
};

function recommendPlanets(answers, planets) {
	let recommendations = planets;

	// Filter based on age
	if (answers.age === '51 and above') {
		console.log('Age 51 and above');
		recommendations = recommendations.filter(
			(planet) =>
				planet.effort !== 'high' && !planet.tags.includes('adverse')
		);
		console.log(recommendations);
	}

	planets.map((planet) => (planet.difficultyScore = difficultyScore(planet)));
	recommendations.sort((p1, p2) => p1.difficultyScore - p2.difficultyScore);

	if (
		(answers.age === '18-30' &&
			(answers.activityLevel === 'Very active' ||
				(answers.activityLevel === 'Moderately active' &&
					answers.extremeConditions === 'Bring it on!'))) ||
		(answers !== '51 and above' &&
			answers.activityLevel === 'Very active' &&
			answers.extremeConditions === 'Bring it on!')
	) {
		recommendations = recommendations.reverse();
	}

	if (
		answers.extremeConditions === 'I prefer mild conditions' ||
		answers.extremeConditions === 'I prefer comfort'
	) {
		recommendations = recommendations.filter(
			(planet) => !planet.tags.includes('adverse')
		);
	}

	// Filter based on interests
	// if (answers.interest === 'Natural Beauty') {
	// 	recommendations = recommendations.sort(
	// 		(p1, p2) =>
	// 			p2.tags.includes('beautiful') - p1.tags.includes('beautiful')
	// 	);
	// 	// recommendations = recommendations.filter(
	// 	// 	(planet) =>
	// 	// 		!planet.tags.includes('ugly') && !planet.tags.includes('barren')
	// 	// );
	// } else if (answers.interest === 'Alien Landscapes') {
	// 	recommendations = recommendations.filter(
	// 		(planet) => !planet.tags.includes('normal')
	// 	);
	// }

	return recommendations.slice(0, 3);
}

module.exports = recommendPlanets;
