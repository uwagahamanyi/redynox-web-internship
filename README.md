# Redynox Web Development Internship: Tasks 1 and 2

## Project structure
```
redynox-internship/
├── index.html      Home page
├── about.html      About page
├── contact.html    Contact page with the form
├── css/style.css   Shared stylesheet
├── js/form.js      Form validation and handling
├── screenshots/    Evidence of responsiveness and validation
└── README.md       This document
```
Open `index.html` in any modern browser to run the site. No build step or server is needed.

## Task 1: Front-end basics

### Semantic HTML
Every page uses `header`, `nav`, `main`, `section`, `article`, and `footer`, one `h1` per page, a `lang` attribute, and a viewport meta tag. Form inputs have linked `label` elements, and the current page in the menu is marked with `aria-current="page"`.

### Styling decisions
- **External CSS:** one file, `css/style.css`, shared by all three pages.
- **Design tokens:** colours, radius, and width are CSS variables in `:root`, so the look can change in one place.
- **Colour:** deep navy text on a pale blue-grey background, with a teal accent for links and buttons. Text colours keep strong contrast against their backgrounds.
- **Typography:** the system font stack (fast, no downloads), a fluid heading size using `clamp()`, and a line length capped near 65 characters for readability.
- **Accessibility:** visible keyboard focus, reduced-motion support, and error messages announced to screen readers.

### Responsiveness approach
- **Flexbox** for the header, navigation, content grids, and form layout. Items use `flex: 1 1 <width>` plus `flex-wrap`, so they sit side by side on wide screens and stack on narrow ones without extra code.
- **One media query** at `max-width: 600px` stacks the header, spreads the menu across the full width, and makes buttons full width for easier tapping.
- **Tested** at desktop (1280px) and mobile (375px) widths using the browser's device toolbar.

## Task 2: Form handling and back-end concepts

### Validation rules (`js/form.js`)
| Field | Rule |
|---|---|
| Name | Required, at least 2 characters |
| Email | Required, must match `name@domain.tld` |
| Message | Required, at least 10 characters |

Fields are checked when the user leaves them and again on submit. Errors appear under the field in plain language, the field gets a red border, and focus moves to the first invalid field.

### Submission flow
1. The user clicks **Send message**.
2. The `submit` handler calls `event.preventDefault()` so the browser does not reload the page.
3. Each field is validated. If any fail, errors are shown and nothing is submitted.
4. If all pass, the values are collected into a JavaScript object.
5. The object is logged to the console (`F12` > Console) and displayed on the page.
6. The form resets.

### GET vs POST
| | GET | POST |
|---|---|---|
| Purpose | Request data | Send data to be processed or stored |
| Where data goes | In the URL query string | In the request body |
| Visible in URL / history | Yes | No |
| Size limit | Small (URL length) | Much larger |
| Safe to repeat | Yes | No, may create duplicates |
| Typical use | Search, loading pages | Contact forms, logins, uploads |

A contact form should use **POST**: the data is personal, can be long, and creates something new on the server.

### Basic API concepts
An API is an agreed set of URLs and rules that lets one program talk to another. A front end sends an HTTP request (method + URL + headers + optional body) to an endpoint such as `/api/contact`, and the server replies with a status code (200 OK, 400 invalid data, 500 server error) and usually JSON.

### How data flows from browser to server
1. **Browser:** the user fills in the form and JavaScript validates it.
2. **Request:** `fetch()` sends an HTTP POST with the data as JSON to the server's endpoint.
3. **Network:** the request travels over HTTPS (encrypted) to the server.
4. **Server:** back-end code validates the data again (never trust the browser alone), then stores it or sends an email.
5. **Response:** the server returns a status code and JSON message.
6. **Browser:** JavaScript reads the response and shows the user a success or error message.

This project stops at step 1. The `fetch` call for step 2 is included as a comment at the end of `js/form.js`, showing where a real back end would connect.

## Screenshots
See the `screenshots/` folder:
- `home-desktop.png`, `home-mobile.png`: responsive layout
- `contact-validation-errors.png`: validation messages on an empty submit
- `contact-success.png`: submitted data displayed after valid input
