const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define schema for QuizDetails collection
const quizDetailsSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phone: String,
  password: String,
});

const quizSetSchema = new mongoose.Schema({
  name: String,
  userID: String,
  code: String,
  domain: String,
  questions: [{
    questionName: String,
    options: [String],
    answer: String
  }]
});

const QuizDetails = mongoose.model('QuizDetails', quizDetailsSchema);
const QuizSet = mongoose.model('QuizSet', quizSetSchema);

app.post('/quizset', async (req, res) => {
  try {
    const { name, userID, code, domain, questions } = req.body;

    // Create a new instance of QuizSet model
    const newQuizSet = new QuizSet({
      name,
      userID,
      code,
      domain,
      questions
    });

    // Save the new quiz set to the database
    await newQuizSet.save();

    res.status(201).json({ message: 'Quiz set created successfully', quizSet: newQuizSet });
  } catch (error) {
    console.error('Error creating quiz set:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// Handle signup POST request
app.post('/signup', async (req, res) => {
  try {
    const { firstname, lastname, phone, password } = req.body;
    console.log(firstname);
    const quizDetails = new QuizDetails({ firstname, lastname, phone, password });
    await quizDetails.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Handle login POST request
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username (phone number)
        const user = await QuizDetails.findOne({ phone: username });
        if (!user) {
            console.log("Invalid user");
            return res.status(401).json({ error: 'Invalid Username' }); // Send specific error message for invalid username
        }

        // Check if the password is correct
        if (user.password !== password) {
            console.log("Invalid password");
            return res.status(401).json({ error: 'Invalid Password' }); // Send specific error message for invalid password
        }
        console.log(user.firstname);

        // If the credentials are valid, send success response and the username
        res.status(200).json({ message: 'Login successful', firstName: user.firstname });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Handle creating a new quiz
const jwt = require('jsonwebtoken');

// Handle creating a new quiz
app.post('/create-quiz', authenticateUser, async (req, res) => {
  try {
    console.log("Inside Creating a quiz");
    const { name, code, domain } = req.body;

    // Find the user by ID (phone number)
    const user = await QuizSet.findOne({ code: code });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the new quiz to the user's quizzes array
    user.quizzes.push({ name, code, domain });

    // Save the updated user object
    await user.save();

    res.status(201).json({ message: 'Quiz created successfully' });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Middleware to authenticate user
function authenticateUser(req, res, next) {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
}

app.get('/quizset', async (req, res) => {
  try {
    // Retrieve all quiz sets from the database
    const quizSets = await QuizSet.find();

    // Send the retrieved quiz sets as a JSON response
    console.log(quizSets)
    const questionsArray = quizSets.map(quizSet => quizSet);

    // Send the extracted questions array as a JSON response
    res.status(200).json(questionsArray);
  } catch (error) {
    // Handle errors if any
    console.error('Error retrieving quiz sets:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
