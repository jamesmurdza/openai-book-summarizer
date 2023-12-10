// Import the required libraries
const OpenAI = require('openai');
const express = require('express');

// Create an instance of the Express application
const app = express();
const port = 3000;

// Create an instance of the OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define a route for the root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the book summarizer API!');
});

// Define a route for the '/summary' endpoint
app.get('/summary', async (req, res) => {
  try {
    // Make a request to the OpenAI API to generate a book summary
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Please summarize the book ${req.query.title}` }],
    });

    // Send the generated summary as a JSON response
    res.json({
      summary: completion.choices[0].message.content
    });
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});