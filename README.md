# Stock Client React App

This is the React frontend for the Stock application.

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/)

## Setup & Installation

1. **Navigate to the client directory:**
   ```sh
   cd client
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
   If you encounter errors related to native modules (like `gl`), see the troubleshooting section below.

## Running the App

Start the development server:
```sh
npm start
```
The app will be available at [http://localhost:3000](http://localhost:3000).

## Troubleshooting

### Native Module Build Errors (e.g., `gl`, `node-gyp`)
- If you see errors about missing Visual Studio or C++ build tools, and you do **not** need the native module, remove it from `package.json` and reinstall dependencies.
- If you need the module, install [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) and select "Desktop development with C++".

### React "Invalid Hook Call" Error
- Ensure `react` and `react-dom` are the same version in `package.json`.
- Run `npm ls react` and `npm ls react-dom` to check for duplicates.
- Delete `node_modules` and `package-lock.json`, then run `npm install` again.

### General Cleanup
- If you have persistent issues, try:
  ```sh
  rm -rf node_modules package-lock.json
  npm install
  ```

## Useful Links
- [React DevTools](https://react.dev/link/react-devtools)
- [React Docs: Invalid Hook Call](https://react.dev/link/invalid-hook-call)

---

Feel free to update this README with more details about your project! 