# IMAC Student Portal — Web Technology Project

A vibrant multi-page LMS-style demo for the Institute of Machine Learning, Artificial Intelligence and Cyber Security (IMAC), UET Lahore.

## Pages

- `index.html` — landing page
- `signin.html` — student/admin sign in
- `signup.html` — demo registration
- `dashboard.html` — student dashboard
- `timetable.html` — weekday timetable + next lecture
- `lectures.html` — 1st/2nd/3rd/4th semester → course → chronological videos
- `common-room.html` — student discussion wall
- `events.html` — upcoming events + event suggestion form
- `about.html` — mission, purpose, technologies, future scope
- `admin.html` — developer/admin CRUD for lecture content
- `css/style.css` — shared styling
- `js/app.js` — all shared JavaScript
- `data/database.json` — seed/mock database reference

## How to run

Recommended: open the folder in VS Code and use the **Live Server** extension, then open `index.html`.

You can also open `index.html` directly in a browser. Tailwind CSS is loaded from the CDN, so an internet connection is needed for the Tailwind CDN stylesheet.

## Demo accounts

### Admin
Email: `admin@imac.demo`
Password: `IMACAdmin123!`

### Student
Create a student account from `signup.html`. The account is stored in your browser's LocalStorage.

## Important demo limitation

This is a front-end project. Passwords and application data are stored in LocalStorage, so this is NOT suitable for real authentication or production deployment.

A production system should use:
- a backend API
- password hashing (e.g. bcrypt/Argon2)
- server-side sessions/JWT
- a real database such as MySQL/PostgreSQL
- role-based server authorization
- validation and moderation
- an actual YouTube/API or curated CMS flow

## Folder structure

```text
IMAC_Student_Portal/
├── index.html
├── signin.html
├── signup.html
├── dashboard.html
├── timetable.html
├── lectures.html
├── common-room.html
├── events.html
├── about.html
├── admin.html
├── assets/
│   └── imac-logo.svg
├── css/
│   └── style.css
├── js/
│   └── app.js
└── data/
    └── database.json
```
