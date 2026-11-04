# Base - SaaS Dashboard (React + Tailwind)

Built from the Figma screens: Dashboard (+ collapsed navigation), Product Analytics, Customer List, Invoice List / Create Invoice,
Schedule List, Calendar (day / week / month / year), Task Preview (list / board / timeline), Chat, Login, Sign Up, Recover and Confirm.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Routes

| Path | Screen |
| --- | --- |
| `/login`, `/signup`, `/recover`, `/confirm` | Auth screens |
| `/` | Dashboard |
| `/analytics` | Product Analytics (Product tab, Add Product drawer) |
| `/customers` | Customer List (Customer tab, Add / Edit drawer, details panel) |
| `/invoices`, `/invoices/new` | Invoice List, Create Invoice with live preview |
| `/schedule` | Schedule List |
| `/tasks` | Task Preview: List / Board / Timeline (reached from "My Schedule") |
| `/calendar` | Calendar: Day / Week / Month / Year, Create Event modal |
| `/messages` | Chat |

## Structure

```
src/
  assets/       icons (Figma Iconly PNGs) + images cropped from the Figma screens
  components/
    common/     Button, Badge, Checkbox, Modal, Drawer, TextField, Tabs, Card, RowMenu, Avatar ...
    layout/     Sidebar, AppLayout, AuthLayout, UpgradeCard
    charts/     ReportsChart, DonutChart, MiniAreaChart (plain SVG, no chart library)
    dashboard/ calendar/ tasks/ chat/ customers/ invoices/ products/   widgets per screen
  pages/        one file per route
  data/         mock data
  hooks/        useLocalStorage
  utils/        date + chart helpers
```

## Responsive behaviour

- below 768px: sidebar slides in from the left (hamburger in the top bar)
- 768px - 1023px: narrow icon rail (the "Dashboard Navigation" design)
- 1024px and up: full sidebar with labels

## Notes

- Click the Base logo to collapse the sidebar to an icon-only rail (and again to expand it). On screens narrower than 1024px it starts collapsed.
- The sidebar is not fixed or scrollable: on a short screen the profile / logout row is simply pushed down the page.
- Sidebar icons are the grey Figma PNGs tinted with CSS masks, so the active purple state needs no extra files.
- Invoices, customers, schedules, tasks, calendar events and added products are saved in `localStorage`.
- The Figma calendars have weekday/date mismatches (e.g. Dec 1 2021 shown on the wrong weekday). The calendar here uses real date maths, so the grids are correct for each month.
- Notification and Settings have no Figma screen, so they show a placeholder.
- Login / Sign Up validate the form and navigate; there is no backend.
- Dependencies need an internet connection to install, and the Nunito Sans font loads from Google Fonts.
