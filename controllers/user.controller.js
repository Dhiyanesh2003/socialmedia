const User = require('../models/user.model');
const bcrypt = require('bcrypt');
require("dotenv").config();

const {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
});

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 64,
	maxOutputTokens: 8192,
	responseMimeType: "text/plain",
};

exports.createUser = async (req,res) => {
	const chatSession = model.startChat({
		generationConfig,
		history: [
			{
				role: "user",
				parts: [{ text: "give me a random topic " }],
			},
			{
				role: "model",
				parts: [
					{
						text: "The history of the use of color in mapmaking. \n",
					},
				],
			},
		],
	});

	const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    res.status(201).json({ result: result });
}
