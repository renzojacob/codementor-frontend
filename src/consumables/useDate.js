import dayjs from 'dayjs';

export function formatDate(date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format);
}
