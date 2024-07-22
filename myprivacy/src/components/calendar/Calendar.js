import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Event from './Event'; // Importa el componente Event

function readFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysToHighlight = [1, 15, 20].map(day => dayjs(`2024-07-${day}`));
      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected = !props.outsideCurrentMonth && highlightedDays.some(d => d.isSame(day, 'day'));

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <CheckCircleOutlineIcon style={{ fontSize: 18 }}/> : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

function Calendar() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    readFetch(date, { signal: controller.signal })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
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

  return (
    <Grid container style={{ marginTop: '1%', justifyContent: 'center', width: '90%' }}>
      <Grid style={{ width: '30%' }}>
        <Grid>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              defaultValue={dayjs()}
              loading={isLoading}
              onMonthChange={handleMonthChange}
              renderLoading={() => <DayCalendarSkeleton />}
              slots={{ day: ServerDay }}
              slotProps={{ day: { highlightedDays } }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid>
          <Typography variant="h4">Last 7 days</Typography>
          <Event date="1/1/1900" title="Accordion 1" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." defaultExpanded={true} />
          <Event date="1/1/1900" title="Accordion 2" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." defaultExpanded={false} />
          <Event date="1/1/1900" title="Accordion Actions" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." defaultExpanded={false} />
        </Grid>
      </Grid>

      <Grid style={{ width: '60%', marginRight: '-10%' }}>
        <Typography variant="h4">Events</Typography>
        <Event date="1/1/1900" title="Accordion 1" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." defaultExpanded={false} />
        <Event date="1/1/1900" title="Accordion 2" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." defaultExpanded={false} />
        <Event date="1/1/1900" title="Accordion Actions" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." defaultExpanded={false} />
      </Grid>
    </Grid>
  );
}

export default Calendar;
