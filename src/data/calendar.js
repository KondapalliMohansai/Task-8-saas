export const eventColors = {
  orange: '#FF8F6B',
  pink: '#F032E6',
  cyan: '#26C0E2',
  green: '#3CA058',
  purple: '#605BFF',
};

// date is yyyy-mm-dd. Events with an "hour" also show up on the day view
// ("left" only staggers the pills sideways, like the design does).
export const initialEvents = [
  { id: 1, date: '2021-12-02', title: 'Free day', color: 'cyan' },
  { id: 2, date: '2021-12-02', title: 'Party Time', color: 'pink' },
  { id: 3, date: '2021-12-02', title: 'Invited by friends', color: 'orange', hour: 9, left: 3 },
  { id: 4, date: '2021-12-02', title: 'Prayer Time', color: 'cyan', hour: 12, left: 34 },
  { id: 5, date: '2021-12-02', title: 'lunch Time', color: 'orange', hour: 14, left: 70 },
  { id: 6, date: '2021-12-02', title: 'Prayer Time', color: 'green', hour: 18, left: 27 },
  { id: 7, date: '2021-12-02', title: 'Dinner Time', color: 'purple', hour: 21, left: 57 },
  { id: 8, date: '2021-12-16', title: 'Victory day', color: 'orange' },
  { id: 9, date: '2021-12-21', title: 'Invited by friends', color: 'pink' },
  { id: 10, date: '2021-12-25', title: 'Christmas Day', color: 'cyan' },
];
