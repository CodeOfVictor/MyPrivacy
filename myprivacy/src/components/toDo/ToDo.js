import * as React from 'react';
import CryptoJS from 'crypto-js';
import { Grid, Typography, Button, Modal, Box, Stack, TextField, Checkbox, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Task from './Task';
import { useTranslation } from 'react-i18next';

const useStyles = (theme) => ({
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600, // Max width for larger screens
    bgcolor: 'background.paper',
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: 24,
    p: 4,
    [theme.breakpoints.down('sm')]: {
      width: '95%', // Adjust width for smaller screens
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

function ToDo({ masterKey }) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [currentTask, setCurrentTask] = React.useState({ state: false, title: '', description: '', index: null });
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    const tasksData = storedTasks ? decryptData(storedTasks, masterKey) : [];
    setTasks(tasksData);
  }, [masterKey]);

  const handleOpen = (task, index) => {
    setCurrentTask({
      ...task,
      index,
    });
    setEditMode(index !== null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentTask({ state: false, title: '', description: '', index: null });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentTask({
      ...currentTask,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = () => {
    let updatedTasks;
    if (editMode) {
      updatedTasks = tasks.map((task, index) =>
        index === currentTask.index
          ? { ...task, title: currentTask.title, description: currentTask.description, state: currentTask.state, date: getCurrentDate() }
          : task
      );
    } else {
      updatedTasks = [...tasks, { ...currentTask, state: false, date: getCurrentDate() }];
    }
    setTasks(updatedTasks);
    localStorage.setItem('tasks', encryptData(updatedTasks, masterKey));
    handleClose();
  };

  const handleDelete = () => {
    const updatedTasks = tasks.filter((_, index) => index !== currentTask.index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', encryptData(updatedTasks, masterKey));
    handleClose();
  };

  const handleCheckboxChange = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, state: !task.state } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', encryptData(updatedTasks, masterKey));
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
            {editMode ? t('Edit Task') : t('Add Task')}
          </Typography>

          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              name="title"
              label={t('Title')}
              variant="outlined"
              value={currentTask.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="description"
              label={t('Description')}
              variant="outlined"
              value={currentTask.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
            {editMode ? 
              <Box>
                <Checkbox
                  name="state"
                  checked={currentTask.state}
                  onChange={handleChange}
                  disabled={!editMode}
                />
                {t('Completed')}
              </Box>
            : null
            }
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
          <Typography variant="h4" style={{ textAlign: 'center', width: '100%' }} color="text.secondary">{t('To do')}</Typography>
        </Grid>
        <Grid item style={{ marginRight: '2%' }}>
          <Button
            variant="outlined"
            style={{ width: '38px', height: '38px', minWidth: 'auto' }}
            onClick={() => handleOpen({ state: false, title: '', description: '' }, null)}
          >
            <AddIcon />
          </Button>
        </Grid>
      </Grid>

      <Grid container style={{ marginLeft: '2%', marginRight: '2%' }}>
        {tasks.map((task, index) => (
          <Task
            key={index}
            state={task.state}
            title={task.title}
            date={task.date || 'No Date'}
            description={task.description}
            onClick={(event) => {
              if (event.target.type !== 'checkbox') {
                handleOpen(task, index);
              }
            }}
            onCheckboxChange={() => handleCheckboxChange(index)}
          />
        ))}
      </Grid>
    </Grid>
  );
}

export default ToDo;
