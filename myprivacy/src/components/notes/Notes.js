import * as React from 'react';
import { Grid, Typography, Button, Modal, Box, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Note from './Note';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 24,
  p: 4,
};

function Notes() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [currentNote, setCurrentNote] = React.useState({ title: '', description: '', index: null });
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const handleOpen = (note, index) => {
    setCurrentNote({
      ...note,
      index,
    });
    setEditMode(index !== null); // Set editMode to true if an index is provided
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentNote({ title: '', description: '', index: null });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote({
      ...currentNote,
      [name]: value,
    });
  };

  const handleSave = () => {
    let updatedNotes;
    if (editMode) {
      updatedNotes = notes.map((note, index) =>
        index === currentNote.index ? { ...note, title: currentNote.title, description: currentNote.description } : note
      );
    } else {
      updatedNotes = [...notes, currentNote];
    }
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    handleClose();
  };

  const handleDelete = () => {
    const updatedNotes = notes.filter((_, index) => index !== currentNote.index);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    handleClose();
  };

  return (
    <Grid container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title-add"
        aria-describedby="modal-modal-description-add"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title-add" variant="h6" component="h2">
            {editMode ? t('Edit Note') : t('Add Note')}
          </Typography>

          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              name="title"
              label={t('Title')}
              variant="outlined"
              value={currentNote.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="description"
              label={t('Description')}
              variant="outlined"
              value={currentNote.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              {t('Save')}
            </Button>
            {editMode && (
              <Button color="error" endIcon={<DeleteIcon />} onClick={handleDelete}>
                {t('DELETE')}
              </Button>
            )}
          </Stack>
        </Box>
      </Modal>

      <Grid container style={{ justifyContent: 'space-between', marginTop: '1%', marginBottom: '1%' }} alignItems="center">
        <Grid item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, marginRight: '-2%' }}>
          <Typography variant="h4" style={{ textAlign: 'center', width: '100%' }} color="text.secondary">{t('Notes')}</Typography>
        </Grid>
        <Grid item style={{ marginRight: '2%' }}>
          <Button
            variant="outlined"
            style={{ width: '38px', height: '38px', minWidth: 'auto' }}
            onClick={() => handleOpen({ title: '', description: '' }, null)}
          >
            <AddIcon />
          </Button>
        </Grid>
      </Grid>

      <Grid container style={{ marginLeft: '2%', marginRight: '2%' }}>
        {notes.map((note, index) => (
          <Note
            key={index}
            title={note.title}
            date={note.date || 'No Date'}
            description={note.description}
            onClick={() => handleOpen(note, index)} // Ensure onClick is passed to Note
          />
        ))}
      </Grid>
    </Grid>
  );
}

export default Notes;
