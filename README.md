# StoryStream

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

Modern blogging platform optimized for concise content delivery, catering to today's fast-paced digital consumption habits.

## Demo

[Demo](https://main.d1s3h2qizym52j.amplifyapp.com/)

## Screenshots

![Landing page](/public/screenshots/Landing.png)
![Login page](/public/screenshots/Login.png)
![Feed](/public/screenshots/Feed.png)
![Post view](/public/screenshots/Post%20view.png)
![Add post](/public/screenshots/Create%20post.png)

## Features

- Create/Update posts with rich text editor, Save drafts
- User authentication, Login/Signup without hassle
- Better post reading experiance
- SEO-friendly & deployed with AWS Amplify
- Enhanced accessibility with ARIA attributes

## Optimizations

- Utilised built-in React Optimizations for reduced average [page response time](https://pagespeed.web.dev/analysis/https-main-d1s3h2qizym52j-amplifyapp-com/n4dmnuj0jc?form_factor=mobile) by 500ms
- Optimistic UI updates for instant feedback on user actions
- Lazy loading image assets reducing [initial load time](https://gtmetrix.com/reports/main.d1s3h2qizym52j.amplifyapp.com/hzpcAGny/)
- Caching at client side with LocalStorage for less API calls
- Responsive Web UI, Mobile friendly
- Better UX with several page-wide themes

![Page perfomance report 1](/public/screenshots/Page%20perf%201.png)

![Page performance report 2](/public/screenshots/Page%20perf%202.png)

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

- **Frontend:** React, React-Router, TinyMCE-react rich text editor, HTML react parser, react hook form, redux toolkit, react-toastify, TailwindCSS with daisyUI, Vitejs
- **Backend:** Appwrite BaaS

## License

[MIT](https://choosealicense.com/licenses/mit/)
