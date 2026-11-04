export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function toKey(date) {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d}`;
}

export function isSameDay(a, b) {
  return toKey(a) === toKey(b);
}

// Returns an array of weeks, each week is 7 cells: { date, inMonth }
export function getMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const rows = Math.ceil((first.getDay() + daysInMonth) / 7);
  const weeks = [];
  for (let w = 0; w < rows; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(year, month, 1 - first.getDay() + w * 7 + d);
      week.push({ date, inMonth: date.getMonth() === month });
    }
    weeks.push(week);
  }
  return weeks;
}

export function formatLong(date) {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function hourLabel(h) {
  const hour = h % 24;
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const twelve = hour % 12 === 0 ? 12 : hour % 12;
  return `${String(twelve).padStart(2, '0')}.00 ${suffix}`;
}

// "2021-12-01" -> "01 Dec, 2021"
export function formatInvoiceDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${String(d).padStart(2, '0')} ${MONTHS[m - 1].slice(0, 3)}, ${y}`;
}

// "13:20" -> "01.20PM"
export function formatTime(time) {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const twelve = h % 12 === 0 ? 12 : h % 12;
  return `${String(twelve).padStart(2, '0')}.${String(m).padStart(2, '0')}${suffix}`;
}

export function addDays(date, n) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
}

// keeps the day inside the target month (Jan 31 + 1 month = Feb 28)
export function addMonths(date, n) {
  const first = new Date(date.getFullYear(), date.getMonth() + n, 1);
  const last = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  return new Date(first.getFullYear(), first.getMonth(), Math.min(date.getDate(), last));
}
