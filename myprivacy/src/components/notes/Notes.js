import * as React from 'react';
import CryptoJS from 'crypto-js';
import { Grid, Typography, Button, Modal, Box, Stack, TextField, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Note from './Note';
import { useTranslation } from 'react-i18next';

const useStyles = (theme) => ({
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600, // Maximum width of the modal
    bgcolor: 'background.paper',
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: 24,
    p: 4,
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
  },
});

const encryptData = (data, masterKey) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), masterKey).toString();
};

const decryptData = (ciphertext, masterKey) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, masterKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function Notes({ masterKey }) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [currentNote, setCurrentNote] = React.useState({ title: '', description: '', index: null });
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    const notesData = storedNotes ? decryptData(storedNotes, masterKey) : [];
    setNotes(notesData);
  }, [masterKey]);

  const handleOpen = (note, index) => {
    setCurrentNote({
      ...note,
      index,
    });
    setEditMode(index !== null);
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
    const updatedNotes = editMode
      ? notes.map((note, index) =>
          index === currentNote.index
            ? { ...note, title: currentNote.title, description: currentNote.description, date: getCurrentDate() }
            : note
        )
      : [...notes, { ...currentNote, date: getCurrentDate() }];

    setNotes(updatedNotes);
    localStorage.setItem('notes', encryptData(updatedNotes, masterKey));
    handleClose();
  };

  const handleDelete = () => {
    const updatedNotes = notes.filter((_, index) => index !== currentNote.index);
    setNotes(updatedNotes);
    localStorage.setItem('notes', encryptData(updatedNotes, masterKey));
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
        <Box sx={classes.modalStyle}>
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
            onClick={() => handleOpen(note, index)}
          />
        ))}
      </Grid>
    </Grid>
  );
}

export default Notes;
