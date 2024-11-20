import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';

interface WhiteboardMessage {
  type: 'whiteboard_update' | 'disconnect';
  data?: any;
}

const StudyRoom = () => {
  const { roomId } = useParams();
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const websocket = new WebSocket(`ws://localhost:8000/ws/${roomId}`);
    
    websocket.onopen = () => {
      console.log('Connected to websocket');
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      const message: WhiteboardMessage = JSON.parse(event.data);
      if (message.type === 'whiteboard_update') {
        // Update whiteboard state
      }
    };

    return () => {
      websocket.close();
    };
  }, [roomId]);

  const handleWhiteboardChange = (update: any) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'whiteboard_update',
        data: update
      }));
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5">Study Room: {roomId}</Typography>
      </Paper>
      
      <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <Tldraw
            onMount={() => {
              console.log('Whiteboard mounted');
            }}
            onChange={handleWhiteboardChange}
          />
        </Box>
      </Paper>

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary">
          Next Card
        </Button>
        <Button variant="outlined">
          Mark as Difficult
        </Button>
      </Box>
    </Box>
  );
};

export default StudyRoom;
