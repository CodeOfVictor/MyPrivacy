import * as React from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Task from './Task';

function Notes() {
  const notes = [
    { state: false, title: 'Title 1', date: '01/01/2021', description: 'Description 1' },
    { state: true, title: 'Title 2', date: '02/02/2022', description: 'Description 2' },
    { state: false, title: 'Title 3', date: '03/03/2023', description: 'Description 3' },
  ];

  return (
    <Grid container>
      <Grid container style={{ justifyContent: 'space-between', marginTop: '1%', marginBottom: '1%' }} alignItems="center">
        <Grid item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, marginRight: '-2%' }}>
          <Typography variant="h4" style={{ textAlign: 'center', width: '100%' }}>To Do</Typography>
        </Grid>
        <Grid item style={{ marginRight: '2%' }}>
          <Button
            variant="outlined"
            style={{ width: '38px', height: '38px', minWidth: 'auto' }}
          >
            <AddIcon />
          </Button>
        </Grid>
      </Grid>

      <Grid container style={{ marginLeft: '2%', marginRight: '2%' }}>
        {notes.map((note, index) => (
          <Task key={index} title={note.title} date={note.date} description={note.description} />
        ))}
      </Grid>
    </Grid>
  );
}

export default Notes;