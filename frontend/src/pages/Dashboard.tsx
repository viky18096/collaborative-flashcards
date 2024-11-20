import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Flashcard {
  id: number;
  question: string;
  questionType: string;
  difficulty: number;
  nextReview: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    // Fetch flashcards from API
    const fetchFlashcards = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/flashcards');
        if (response.ok) {
          const data = await response.json();
          setFlashcards(data);
        }
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  const handleCreateFlashcard = () => {
    navigate('/edit');
  };

  const handleEditFlashcard = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteFlashcard = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/flashcards/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFlashcards(flashcards.filter(card => card.id !== id));
      }
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  const handleStartStudy = () => {
    // Create a new study room
    navigate(`/study/${Date.now()}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">My Flashcards</Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateFlashcard}
              sx={{ mr: 2 }}
            >
              Create Flashcard
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleStartStudy}
            >
              Start Studying
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {flashcards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {card.question}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={card.questionType}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={`Difficulty: ${card.difficulty}`}
                      size="small"
                      color={card.difficulty > 3 ? 'error' : 'default'}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleEditFlashcard(card.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteFlashcard(card.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Dashboard;
