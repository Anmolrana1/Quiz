import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, Card, CardContent, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from './navbar';
import { Link } from 'react-router-dom';


const QuizQuestion = ({ QuestionSetData }) => {
  const [open, setOpen] = useState(false);
  const [questionSet, setQuestionSet] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    questionName: '',
    options: ['', ''],
    answer: ''
  });

  const [mergedData, setMergedData] = useState([
    {
      name: '',
      code: '',
      domain: '',
      userID: '',
      questions: [{ questionName: '', options: ['', ''], answer: '' }]
    }
  ]);

  useEffect(() => {
    const updatedMergedData = {
      ...QuestionSetData,
      questions: questionSet.map(question => ({
        questionName: question.questionName,
        options: question.options,
        answer: question.answer
      }))
    };
  
    // Update the state
    setMergedData(updatedMergedData);
  
  }, [QuestionSetData, questionSet]);
  

  const handleAddOption = () => {
    setNewQuestion(prevState => ({
      ...prevState,
      options: [...prevState.options, '']
    }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion(prevState => ({
      ...prevState,
      options: updatedOptions
    }));
  };

  const handleSubmit = async () => {
    // Check if there are questions to submit
    if (mergedData.length === 0) {
      alert('Please add questions before submitting.');
      return;
    }
    
    console.log(mergedData);
  
    fetch('http://localhost:5000/quizset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mergedData) // Use mergedData instead of quizSetData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Quiz set created successfully:', data.quizSet);
    })
    .catch(error => {
      console.error('Error creating quiz set:', error);
    });
  }
  
    const handleClose = () => {
      if (newQuestion.questionName.trim() === '' || newQuestion.options.length < 2 || newQuestion.options.some(option => option.trim() === '') || newQuestion.answer.trim() === '') {
        alert('Please fill in all fields for the question.');
        return;
      }
      setOpen(false);
      if (editIndex !== null) {
        const updatedQuestions = [...questionSet];
        updatedQuestions[editIndex] = newQuestion;
        setQuestionSet(updatedQuestions);
        setEditIndex(null);
      } else {
        setQuestionSet(prevQuestions => [...prevQuestions, newQuestion]);
      }
      setNewQuestion({
        questionName: '',
        options: ['', ''],
        answer: ''
      });
    };

    const handleOpenDialog = (index) => {
      setOpen(true);
      setEditIndex(index);
      setNewQuestion(questionSet[index]);
    };

    return (
      <>
        <Navbar />
        <div style={{ paddingLeft: "30px" }} >
          <h1>Quiz Name Here</h1>
          <IconButton onClick={() => setOpen(true)}><AddIcon /></IconButton>
        </div>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>{editIndex !== null ? 'Edit Question' : 'Create New Question'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Question Name"
              value={newQuestion.questionName}
              onChange={(e) => setNewQuestion(prevState => ({ ...prevState, questionName: e.target.value }))}
              fullWidth
              margin="normal"
              required
            />
            {newQuestion.options.map((option, index) => (
              <TextField
                key={index}
                label={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            ))}
            <IconButton onClick={handleAddOption}>
              <AddIcon />
            </IconButton>
            <TextField
              label="Answer"
              value={newQuestion.answer}
              onChange={(e) => setNewQuestion(prevState => ({ ...prevState, answer: e.target.value }))}
              fullWidth
              margin="normal"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleClose} color="primary">{editIndex !== null ? 'Update' : 'Create'}</Button>
          </DialogActions>
        </Dialog>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', borderRadius: "30px", fontSize: "larger", textTransform: 'capitalize' }}>
          {questionSet.map((question, index) => (
            <div key={index} style={{ width: '300px', margin: '10px' }}>
              <Card style={{ boxShadow: '0px 4px 8px rgba(0.5, 0.4, 0.7, 0.5)', borderRadius: "20px" }}>
                <CardContent>
                  <b>Question: </b> <Typography style={{ display: "flex", justifyContent: "center" }}>{question.questionName}</Typography>
                  <div style={{}}>
                    <b>Options:</b>
                    {question.options.map((option, idx) => (
                      <div key={idx} style={{ display: "flex", justifyContent: "center" }}>
                        <p style={{ margin: "2px" }}>{idx + 1}. {option}</p>
                      </div>
                    ))}
                  </div>
                  <b>Answer:</b> <Typography style={{ display: "flex", justifyContent: "center" }}> {question.answer}</Typography>
                  <Box textAlign="center" mt={2}>
                    <IconButton onClick={() => handleOpenDialog(index)}><EditIcon /></IconButton>
                  </Box>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/dashboard">{questionSet.length > 1 ? <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button> : <div></div>}</Link>
        </div>
      </>
    );
  };

  export default QuizQuestion;
