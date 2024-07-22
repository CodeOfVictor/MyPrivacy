import * as React from 'react';
import { Grid, Typography, Button, Modal, Box, Stack, TextField, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Task from './Task';
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

function ToDo() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [currentTask, setCurrentTask] = React.useState({ state: false, title: '', description: '', index: null });
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleOpen = (task, index) => {
    setCurrentTask({
      ...task,
      index,
    });
    setEditMode(index !== null); // Set editMode to true if an index is provided
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
        index === currentTask.index ? { ...task, title: currentTask.title, description: currentTask.description, state: currentTask.state } : task
      );
    } else {
      updatedTasks = [...tasks, { ...currentTask, state: false }]; // Ensure new tasks are not marked as complete
    }
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    handleClose();
  };

  const handleDelete = () => {
    const updatedTasks = tasks.filter((_, index) => index !== currentTask.index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    handleClose();
  };

  const handleCheckboxChange = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, state: !task.state } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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
            <Box>
              <Checkbox
                name="state"
                checked={currentTask.state}
                onChange={handleChange}
                disabled={!editMode} // Allow editing only in edit mode
              />
              {t('Completed')}
            </Box>
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
          <Typography variant="h4" style={{ textAlign: 'center', width: '100%' }} color="text.secondary">{t('To Do')}</Typography>
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
                handleOpen(task, index); // Open modal if not checkbox
              }
            }}
            onCheckboxChange={() => handleCheckboxChange(index)} // Pass function to handle checkbox change
          />
        ))}
      </Grid>
    </Grid>
  );
}

export default ToDo;
