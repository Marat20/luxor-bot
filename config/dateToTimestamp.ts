export const getDateFromTimestamp = (date: string) => {
  const regex = /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/;

  if (!regex.test(date)) {
    return false;
  }

  const parts = date.split(' ');
  const dateParts = parts[0].split('.');

  const time = parts[1];

  const newDateString = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]} ${time}`;

  const datum = Date.parse(newDateString);

  return String(datum / 1000);
};
