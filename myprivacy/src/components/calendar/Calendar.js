import React from 'react';
import { Grid, Typography, Box, Button, Modal, TextField, Stack, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Event from './Event';
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

function fetchEvents(date) {
  return new Promise((resolve) => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    resolve(storedEvents.map(event => ({
      day: dayjs(event.date),
      ...event
    })));
  });
}

function CustomDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected = !props.outsideCurrentMonth && highlightedDays.some(d => d.day.isSame(day, 'day'));

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <CheckCircleOutlineIcon style={{ fontSize: 18 }} /> : undefined}
    >
      <div {...other} style={{ width: 36, height: 36, textAlign: 'center', lineHeight: '36px', background: outsideCurrentMonth ? '#f0f0f0' : 'transparent' }}>
        {day.format('D')}
      </div>
    </Badge>
  );
}

function Calendar() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [currentEvent, setCurrentEvent] = React.useState({ date: null, title: '', description: '', index: null });
  const [events, setEvents] = React.useState([]);
  const { t } = useTranslation();

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fetchEvents(date, { signal: controller.signal })
      .then((events) => {
        setHighlightedDays(events);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(dayjs());
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const handleOpen = (event, index) => {
    setCurrentEvent({
      ...event,
      index,
    });
    setEditMode(index !== null); // Set editMode to true if an index is provided
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentEvent({ date: null, title: '', description: '', index: null });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({
      ...currentEvent,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setCurrentEvent({
      ...currentEvent,
      date: date ? dayjs(date).format('YYYY-MM-DD') : null,
    });
  };

  const handleSave = () => {
    let updatedEvents;
    if (editMode) {
      updatedEvents = events.map((event, index) =>
        index === currentEvent.index ? { ...event, title: currentEvent.title, description: currentEvent.description, date: currentEvent.date } : event
      );
    } else {
      updatedEvents = [...events, currentEvent];
    }
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    handleClose();
    fetchHighlightedDays(dayjs()); // Refresh calendar
  };

  const handleDelete = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    handleClose();
    fetchHighlightedDays(dayjs()); // Refresh calendar
  };

  const getUpcomingEvents = () => {
    const today = dayjs();
    const sevenDaysFromNow = today.add(7, 'day');
    return events
      .filter(event => dayjs(event.date).isBetween(today, sevenDaysFromNow, 'day', '[)'))
      .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} justifyContent="center" style={{ marginTop: '1%' }}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title-add"
          aria-describedby="modal-modal-description-add"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title-add" variant="h6" component="h2">
              {editMode ? t('Edit Event') : t('Add Event')}
            </Typography>

            <Stack spacing={2} sx={{ mt: 2 }}>
              <DatePicker
                label={t('Date')}
                value={currentEvent.date ? dayjs(currentEvent.date) : null}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <TextField
                name="title"
                label={t('Title')}
                variant="outlined"
                value={currentEvent.title}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="description"
                label={t('Description')}
                variant="outlined"
                value={currentEvent.description}
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
                <Button color="error" endIcon={<DeleteIcon />} onClick={() => handleDelete(currentEvent.index)}>
                  {t('Delete')}
                </Button>
              )}
            </Stack>
          </Box>
        </Modal>

        <Grid item xs={12} md={3}>
          <Box textAlign="center" mb={2}>
            <DateCalendar
              defaultValue={dayjs()}
              loading={isLoading}
              onMonthChange={handleMonthChange}
              renderLoading={() => <CircularProgress />}
              renderDay={(dayProps) => <CustomDay {...dayProps} highlightedDays={highlightedDays} />}
            />
          </Box>
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom color="textSecondary">{t('Next 7 Days')}</Typography>
            <Grid>
              {getUpcomingEvents().map((event, index) => (
                <Event
                  key={index}
                  date={dayjs(event.date).format('D/M/YYYY')}
                  title={event.title}
                  description={event.description}
                  defaultExpanded={false}
                  onEdit={() => handleOpen(event, index)}
                  onDelete={() => handleDelete(index)}
                />
              ))}
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box textAlign="center">
            <Grid container style={{ justifyContent: 'space-between', marginTop: '1%', marginBottom: '1%' }} alignItems="center">
              <Grid item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, marginRight: '-2%' }}>
                <Typography variant="h4" style={{ textAlign: 'center', width: '100%' }} color="text.secondary">{t('Events')}</Typography>
              </Grid>
              <Grid item style={{ marginRight: '2%' }}>
                <Button
                  variant="outlined"
                  style={{ width: '38px', height: '38px', minWidth: 'auto' }}
                  onClick={() => handleOpen({ date: null, title: '', description: '' }, null)}
                >
                  <AddIcon />
                </Button>
              </Grid>
            </Grid>

            <Grid>
              {events.map((event, index) => (
                <Event
                  key={index}
                  date={dayjs(event.date).format('D/M/YYYY')}
                  title={event.title}
                  description={event.description}
                  defaultExpanded={false}
                  onEdit={() => handleOpen(event, index)}
                  onDelete={() => handleDelete(index)}
                />
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}

export default Calendar;
