# Elite Plumbing Services Next.js Frontend

This is a Next.js + TypeScript frontend using Tailwind CSS.

## Rendering

The app uses the Next.js App Router. Main website pages are rendered on the server on demand:

- `/`
- `/services`
- `/booking`
- `/about`
- `/areas`
- `/contact`

Interactive forms, menus, and booking steps run as client components inside those server-rendered pages.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:

```bash
npm install
```

2. Run the app:

```bash
npm run dev
```

3. Open the local URL printed in the terminal, usually:

```bash
http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```
