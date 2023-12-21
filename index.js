import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const chatHistory = []; 

app.post('/generate', async (req, res) => {
  const prompt = req.body.prompt;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    chatHistory.push({ sender: 'AI', text });

    res.send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating content');
  }
});

app.get('/chat-history', (req, res) => {
  res.json(chatHistory);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
