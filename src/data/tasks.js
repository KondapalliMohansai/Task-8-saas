export const initialTasks = [
  { id: 1, name: 'Ui Design', icon: 'figma', start: '03/12/2021', end: '5/12/2021', members: 5, status: 'To Do' },
  { id: 2, name: 'Logo Design', icon: 'illustrator', start: '03/12/2021', end: '5/12/2021', members: 5, status: 'To Do' },
  { id: 3, name: 'Grapich Design', icon: 'photoshop', start: '03/12/2021', end: '5/12/2021', members: 5, status: 'Doing' },
  { id: 4, name: 'Web Design', icon: 'webdesign', start: '03/12/2021', end: '5/12/2021', members: 5, status: 'Doing' },
  { id: 5, name: 'Logo Design', icon: 'illustrator', start: '01/12/2021', end: '3/12/2021', members: 5, status: 'Done' },
];

export const taskStatusTone = { 'To Do': 'pending', Doing: 'running', Done: 'done' };
export const taskStatusLabel = { 'To Do': 'Pending', Doing: 'Running', Done: 'Done' };

const team = ['james1', 'robert', 'bethany1', 'jhon'];

export const boardColumns = [
  {
    title: 'ToDo',
    cards: [
      { id: 1, title: 'Dashboard Design', tags: ['Low', 'On Track'], team, checked: false },
      { id: 2, title: 'Landing page Design', tags: ['Mediun', 'At risk'], team: ['anne', 'bethany2', 'james2'], checked: false },
      { id: 3, title: 'E-Shop Mobile App', tags: ['High'], team, checked: false },
      { id: 4, title: 'Dashboard Design', tags: ['Low', 'On Track'], team, checked: false },
    ],
  },
  {
    title: 'In Progress',
    cards: [
      { id: 5, title: 'Dashboard Design', tags: ['High', 'On Track'], team, checked: true },
      { id: 6, title: 'Landing page Design', tags: ['Low'], team, checked: true, images: ['board_a', 'board_b'] },
      { id: 7, title: 'E-Shop Mobile App', tags: ['Low', 'On Track'], team, checked: false },
    ],
  },
  {
    title: 'In Review',
    cards: [
      { id: 8, title: 'Dashboard Design', tags: ['Medium'], team, checked: true, images: ['board_c'] },
      { id: 9, title: 'E-Shop Mobile App', tags: ['Low'], team, checked: true, images: ['board_a', 'board_b'] },
    ],
  },
  {
    title: 'Done',
    cards: [
      { id: 10, title: 'Dashboard Design', tags: ['High', 'On Track'], team, checked: true, images: ['board_d', 'board_e'] },
    ],
  },
];

export const tagTone = {
  Low: 'low',
  Medium: 'medium',
  Mediun: 'medium',
  High: 'high',
  'On Track': 'onTrack',
  'At risk': 'atRisk',
};

export const timelineDays = ['29', '30', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'];

// startHour/endHour decide where the bar sits on the hour grid; offset is the horizontal start (in day columns)
export const timelineTasks = [
  { id: 1, group: 'To Do', title: 'Grapich Design', hour: 9, offset: 0.6, span: 9.4, checked: false, tags: ['Low', 'On Track'] },
  { id: 2, group: 'To Do', title: 'Dashboard Design', hour: 11, offset: 2.2, span: 9.4, checked: true, tags: ['High', 'On Track'] },
  { id: 3, group: 'Doing', title: 'Logo Design', hour: 13, offset: 0.6, span: 9.4, checked: true, tags: ['High', 'On Track'] },
  { id: 4, group: 'Done', title: 'Web Design', hour: 15, offset: 5.2, span: 9.4, checked: true, tags: ['High', 'On Track'] },
];
