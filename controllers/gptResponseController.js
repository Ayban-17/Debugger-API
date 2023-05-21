import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const url = process.env.GPT_URI;
const key = process.env.API_KEY;
let answer;

const fetchData = async (url, language, code) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Please analyze my ${language} code and identify any issues or errors. Additionally, provide the corrected version of the code with comments to help beginners understand it. Here is the code I would like you to review: 

          ${code}

          Please provide clarity for beginner programmers. Thank you!`,
        },
      ],
      temperature: 0.2,
    }),
  });
  const data = await response.json();
  const message = await data.choices[0].message.content;
  answer = message;
};

const getAnswer = async (req, res) => {
  const { language, code } = req.body;
  console.log("Method:", req.method);
  console.log("Language:", language);
  console.log("Code", code);
  try {
    await fetchData(url, language, code);
    res.json({ msg: answer });
  } catch (error) {
    console.log(`The error is ${error}`);
  }
};

export default getAnswer;
