import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';

const FlashcardEditor = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [questionType, setQuestionType] = useState('text');
  const [question, setQuestion] = useState('');
  const [whiteboardState, setWhiteboardState] = useState(null);

  const handleSave = async () => {
    const flashcardData = {
      question,
      questionType,
      whiteboardState,
    };

    try {
      const response = await fetch('http://localhost:8000/api/flashcards', {
        method: cardId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flashcardData),
      });

      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error saving flashcard:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          {cardId ? 'Edit Flashcard' : 'Create New Flashcard'}
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Question Type</InputLabel>
          <Select
            value={questionType}
            label="Question Type"
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="image">Image</MenuItem>
            <MenuItem value="formula">Formula</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Paper sx={{ height: '400px', mb: 3 }}>
          <Tldraw
            onMount={() => {
              console.log('Whiteboard mounted');
            }}
            onChange={(update) => setWhiteboardState(update)}
          />
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save Flashcard
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FlashcardEditor;
