# LMStudio Chat Web App

A **Next.js** web application for chatting with a local **LMStudio** model, featuring light/dark mode toggle and streaming responses.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [License](#license)

---

## Features

1. **Chat Interface**  
   A user-friendly chat interface to send and receive messages from your LMStudio model.  
2. **Streaming Responses**  
   Assistant replies appear in real-time as they stream from the server.  
3. **Dark Mode Toggle**  
   Easily switch between light and dark themes.  
4. **Responsive UI**  
   Scales nicely on both mobile and desktop screens.  
5. **Easy Customization**  
   Tweak chat bubbles, font sizes, colors, and more in `Chat.css`.

---

## Prerequisites

- **Node.js** (14+ recommended)  
- **npm** or **yarn** to install dependencies  
- **LMStudio** running at an accessible endpoint (default is `http://192.168.2.235:55441/api/v0/chat/completions`)

---

## Installation

1. **Clone this repository** (or download the ZIP):

    ```bash
    git clone https://github.com/yourusername/lmstudio-chat.git
    cd lmstudio-chat
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```
    or
    ```bash
    yarn
    ```

---

## Usage

Start the development server:
```bash
npm run dev
```
or
```bash
yarn dev
```

Your app will be running at [http://localhost:3000](http://localhost:3000).

1. Open the web app.
2. Enter any message in the input field at the bottom of the screen.
3. Press **Enter** or click **Send** to get a response from the LMStudio model.
4. Toggle Light/Dark Mode using the button in the top-right corner of the header.

---

## Configuration

### API Endpoint

Inside `Chat.jsx` (or wherever you store it), you’ll find:

```js
const apiUrl = "http://192.168.2.235:55441/api/v0/chat/completions";
const model = "phi-4";
```

Adjust these to point to your LMStudio server IP and model ID.

### Styling

- All chat UI styles are located in `Chat.css`.
- Make custom changes to fonts, colors, animations, etc.

### Dark Mode

- Handled by toggling a `"dark-mode"` class on the `<body>` element.
- Corresponding CSS rules define the dark theme.

---

## Project Structure

A typical Next.js 13+ setup might look like:

```bash
lmstudio-chat/
├── app/
│   ├── components/
│   │   └── Chat.jsx    // Main chat component
│   ├── page.jsx        // Renders <Chat />
│   └── layout.jsx      // (Optional) Root layout for Next.js App Router
├── public/
│   └── (static assets if needed)
├── styles/
│   └── globals.css     // Optional global CSS
├── package.json
├── README.md
└── yarn.lock / package-lock.json
```

**Key Files**:
- **Chat.jsx**: Core chat logic, including streaming, user input, and message display.
- **Chat.css**: All styling for bubbles, header, dark mode, input areas, etc.

---

## Scripts

| Script    | Description                                                                  |
|-----------|------------------------------------------------------------------------------|
| **dev**   | Runs the app in development mode at [http://localhost:3000](http://localhost:3000). |
| **build** | Builds the production-ready assets into the `.next` folder.                  |
| **start** | Runs the production build. Make sure to build first.                         |

**Example usage**:
```bash
npm run dev     # Development mode
npm run build   # Build for production
npm run start   # Start the production server
```

---

## License

```sql
MIT License

Copyright (c) [2025]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
  
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
  
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
