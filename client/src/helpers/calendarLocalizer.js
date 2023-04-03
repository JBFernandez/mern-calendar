import { addHours, format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import esEs from 'date-fns/locale/es';
import { dateFnsLocalizer } from 'react-big-calendar';

// const locales = {
//     'en-US': enUS,
//   }
const locales = {
    'es': esEs,
  }
  
  export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });