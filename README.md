# Application Boilerplate
This is a [Typescript](https://www.typescriptlang.org/) boilerplate that deals with authentication. It can be used as a template to starting any future projects.

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)


## Functionalities
This project provides everything needed to create a simple authentication software. It offers basic functionality such as logging in and signing up, and also covers email verification via SMTP. It allows for flash messages within redirects, and a session storage based on MongoDB.

## Environment Requirements
- Latest Node.js LTS or above, get it [here](https://nodejs.org)
- [MongoDB](https://mongodb.com)

## How to Use
- Clone the repo
- Run ```npm install``` to install packages
- Change any variables in [.env](.env)
- Change anything labeled with the syntax **//TODO: something**, you can search for them in the editor
- Start the project using ```npm start```

### Project Structure
- [README.md](README.md) This file, contains information and instructions
- [.gitignore](.gitignore) Removing files from commits
- [package.json](package.json) Information for NPM
- [package-lock.json](package-lock.json) Lockfile for securing package versioning
- [.env](.env) Config variables
- [tsconfig.json](tsconfig.json) Handles TypeScript compilation
- [src](/src) The source code in TypeScript
	- [controllers](/src/controllers) Deals with handling requests
	- [middlewares](/src/middlewares) Helps the controllers and controls flow
	- [models](/src/models) Mongoose models for users
	- [smtp](/src/smtp) Deals with mailing
	- [app.ts](/src/app.ts) Configuration for the Express application
	- [server.ts](/src/server.ts) Tying everything together to start
- [views](/views) Pug files for rendering, not much is needed to say
- [public](/public) Serving static files
	- [css](/public/css) Stylesheets
	- [fonts](/public/fonts) Fontawesome files
	- [images](/public/images) Static images
	- [js](/public/js) JavaScript files, such as JQuery
- [dist](/dist) Only appears after code is compiled. It contains compiled JavaScript code
- [node_modules](/node_modules) Installed packages
- [LICENSE](LICENSE) The license for this project

### License
The MIT License (MIT)
Copyright © 2020 Eric Li

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.