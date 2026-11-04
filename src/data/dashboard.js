export const dateOptions = ['10-06-2021', '10-07-2021', '10-08-2021', '10-09-2021', '10-10-2021'];

export const reportLabels = ['10am', '11am', '12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am'];

// x is the position on the time axis (0 = 10am, 9 = 07am), y is 0-100
export const reportPoints = [
  { x: 0, y: 54 },
  { x: 1, y: 31 },
  { x: 2, y: 57, dot: true },
  { x: 3, y: 36, dot: true },
  { x: 3.9, y: 22 },
  { x: 4.9, y: 49, dot: true },
  { x: 6, y: 13 },
  { x: 7, y: 34, dot: true },
  { x: 8, y: 67, dot: true },
  { x: 8.7, y: 55 },
  { x: 9.5, y: 73 },
];

export const analyticsSegments = [
  { label: 'Sale', color: '#5B93FF', from: 8, to: 152 },
  { label: 'Distribute', color: '#FFD66B', from: 160, to: 232 },
  { label: 'Return', color: '#FF8F6B', from: 240, to: 338 },
];

export const recentOrders = [
  { tracking: '#876364', product: 'Camera Lens', image: 'camera', price: '$178', orders: 325, amount: '$1,46,660' },
  { tracking: '#876368', product: 'Black Sleep Dress', image: 'dress', price: '$14', orders: 53, amount: '$46,660' },
  { tracking: '#876412', product: 'Argan Oil', image: 'argan', price: '$21', orders: 78, amount: '$3,46,676' },
  { tracking: '#876621', product: 'EAU DE Parfum', image: 'parfum', price: '$32', orders: 98, amount: '$3,46,981' },
];

export const topProducts = [
  { id: 1, name: 'NIKE Shoes Black Pattern', image: 'nike', rating: 4, price: '$87', bg: '#D3E3FD' },
  { id: 2, name: 'iPhone 12', image: 'iphone', rating: 4, price: '$987', bg: '#D5E5F2' },
];
