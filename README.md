# My Electron App

This project is a cross-platform desktop application built using Electron.js, React, TypeScript, and Tailwind CSS. It leverages shadcn/ui for UI components and integrates with yt-dlp for video downloading functionality.

## Project Structure

```
my-electron-app
├── src
│   ├── main
│   │   └── main.ts          # Entry point for the Electron main process
│   ├── renderer
│   │   ├── App.tsx          # Main React component
│   │   └── index.tsx        # Entry point for the React renderer process
│   ├── styles
│   │   └── tailwind.css     # Tailwind CSS styles
│   └── types
│       └── index.d.ts       # TypeScript type definitions
├── package.json              # NPM configuration file
├── tsconfig.json             # TypeScript configuration file
├── tailwind.config.js        # Tailwind CSS configuration file
├── .eslintrc.json            # ESLint configuration file
├── .gitignore                # Git ignore file
├── README.md                 # Project documentation
├── .github
│   └── workflows
│       └── ci.yml           # CI/CD workflow configuration
```

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/my-electron-app.git
   cd my-electron-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To start the application in development mode, run:
```
npm start
```

### Building the Application

To build the application for production, run:
```
npm run build
```

### Linting

To lint the code, run:
```
npm run lint
```

### CI/CD

This project uses GitHub Actions for CI/CD. The workflow is defined in `.github/workflows/ci.yml`. It automatically builds and tests the application on code changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments

- [Electron](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp)