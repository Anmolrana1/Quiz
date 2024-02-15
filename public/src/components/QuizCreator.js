import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Navbar from "./navbar";
import { Link } from 'react-router-dom';

const QuizCreator = ({ setQuestionSetData, QuestionSetData }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    const userID=localStorage.getItem("phoneNumber")
    setQuestionSetData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setQuestionSetData(prevData => ({
      ...prevData,
      'userID': userID
    }));
  };

  const handleCreateQuiz = () => {
    console.log(QuestionSetData);
    handleClose();
  };

  return (
    <div>
      <Navbar />
      <br />
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Create new quiz
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New Quiz</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name of the Quiz"
            fullWidth
            
            onChange={(e)=>handleData(e)}
          />
          <TextField
            margin="dense"
            id="code"
            name="code"
            label="Code"
            fullWidth
            
            onChange={(e)=>handleData(e)}
          />
          <TextField
            margin="dense"
            id="domain"
            name="domain"
            label="Domain"
            fullWidth
           
            onChange={(e)=>handleData(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="warning">
            Cancel
          </Button>
         <Link to="/create"><Button variant="contained" onClick={handleCreateQuiz} color="primary">
            Create
          </Button></Link> 
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuizCreator;
