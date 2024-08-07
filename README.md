# StoryStream

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

Modern blogging platform optimized for concise content delivery, catering to today's fast-paced digital consumption habits.

## Screenshots

![Landing page](/public/screenshots/Landing.png)
![Login page](/public/screenshots/Login.png)
![Feed](/public/screenshots/Feed.png)
![Post view](/public/screenshots/Post%20view.png)
![Add post](/public/screenshots/Create%20post.png)

## Demo

[Demo]()

## Features

- Create/Update posts with rich text editor, Save drafts
- User authentication, Login/Signup without hassle
- Better post reading experiance
- SEO-friendly
- Enhanced accessibility with ARIA attributes

## Optimizations

- Utilised built-in React Optimizations for reduced average page response time by 500ms
- Optimistic UI updates for instant feedback on user actions
- Lazy loading image assets reducing initial load time
- Caching at client side with LocalStorage for less API calls 
- Responsive Web UI, Mobile friendly
- Better UX with several page-wide themes 

## Run Locally

Clone the project

```bash
  git clone https://github.com/parthvyas7/storystream
```

Go to the project directory

```bash
  cd storystream
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

See `.env.sample` 

## Deployment

To get production-ready build of this project run

```bash
  npm run build
```

To get preview of it

```bash
  npm run preview
```

## Libraries/Frameworks Used

- **Frontend:** React, React-Router, TinyMCE-react rich text editor, HTML react parser, react hook form, redux toolkit, react-toastify, TailwindCSS with daisyUI
- **Backend:** Appwrite BaaS

## License

[MIT](https://choosealicense.com/licenses/mit/)