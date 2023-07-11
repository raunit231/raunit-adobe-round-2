/**
 * The `createJsonInput` function takes in a body data object recieved by the api and formats it into a specific JSON
 * structure.
 * @returns The function `createJsonInput` returns a formatted JSON object.
 */
const createJsonInput = (bodyData) => {
	const formatObject = (data) => {
		/**
		 * The function snakeToPascal converts a snake_case string to PascalCase.
		 * @param str - The parameter `str` is a string that represents a snake_case variable name.
		 * @returns The function `snakeToPascal` returns a string in PascalCase format.
		 */
		const snakeToPascal = (str) => {
			str = str.replace(/[_]\w/g, (g) => g[1].toUpperCase());
			return str[0].toUpperCase() + str.slice(1);
		};
		const formattedObject = {};

		/* The code is iterating over each key in the `data` object
		and convert each key of the data object to pascal case to match the required format. */
		Object.keys(data).map((key) => {
			let convertedKey = snakeToPascal(key);
			switch (convertedKey) {
				case "PassingYear":
					convertedKey = "Year";
					break;
				case "Field":
					convertedKey = "Type";
					break;
				case "Awards":
				case "Responsibilities":
					convertedKey = "Description";
					break;
				default:
					break;
			}
			formattedObject[convertedKey] = data[key];
		});
		return formattedObject;
	};
	const formattedBodyData = formatObject(bodyData);
	let {
		PersonalInformation,
		JobTitle,
		CareerObjective: Summary,
		Skills,
		Education,
		Experience,
		Achievements,
	} = formattedBodyData;

	// formatting personal info as per the requirement
	PersonalInformation = formatObject(PersonalInformation);
	PersonalInformation.LinkedIn = `<a href=\"${PersonalInformation.LinkedinUrl}\">linkedIn</a>`;
	delete PersonalInformation.LinkedinUrl;

	// formatting education as per the requirement
	let formattedEducation = Education.map((value) => {
		return formatObject(value);
	});

	Education = formattedEducation;

	// formatting experience as per the requirement
	let formattedExperience = Experience.map((value) => {
		return formatObject(value);
	});
	Experience = formattedExperience;

	// formatting achievements as per the requirement
	let formattedAchievements = Achievements.map((value) => {
		return formatObject(value);
	});
	Achievements = formattedAchievements;

	const formattedaJsonData = {
		...PersonalInformation,
		JobTitle,
		Summary,
		Skills,
		Education,
		Experience,
		Achievements,
	};

	return formattedaJsonData;
};

module.exports = createJsonInput;