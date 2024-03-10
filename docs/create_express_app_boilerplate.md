# Create Express app boilerplate

Creating an Express.js application using TypeScript involves several steps to set up and configure your development environment properly. Here's a comprehensive guide to walk you through the process:

## 1. Initialize a new node.js project

```bash
mkdir express-template
cd express-template
npm init -y
```

## 2. Install the required dependencies

Next, install Express.js and the necessary TypeScript dependencies:

```bash
npm install express
npm install --save-dev typescript @types/node @types/express
```

- `express` is the main framework.
- `typescript` is the TypeScript compiler.
- `@types/node` and `@types/express` are TypeScript type definitions for Node.js and Express.js, which allow you to use TypeScript with these libraries.

## 3. Initialize TypeScript Configuration

Initialize a TypeScript configuration file (`tsconfig.json`) in your project, which specifies the compiler options required to compile your project.

```bash
npx tsc --init
```

Edit the `tsconfig.json` file to suit your project needs. A basic configuration might look like this:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "moduleResolution": "node",
    "types": [
      "jest",
      "node",
    ]
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "**/*.spec.ts",
  ]
}
```

## 4. Set up the project structure

Create a `src` directory in your project. This is where your TypeScript source files will live.

```bash
mkdir src
```

Inside the `src` directory, create an `index.ts` file. This will be the entry point of your application.

```bash
touch src/index.ts
```

```typescript
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Home page');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

## 5. Add NPM Scripts for Building and Running the Application

Modify your `package.json` file to include scripts for building your TypeScript application and starting your Express server.
Add the following lines to the `"scripts"` section of your `package.json` file:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn src/index.ts"
  }
}
```

- `npm run build` will compile your TypeScript code to JavaScript in the `dist` directory.
- `npm start` will start your Express server by running the compiled JavaScript code from the `dist` directory.

## 6. Install `ts-node-dev` (Optional; for development mode only)

`ts-node-dev` is a development tool that automatically restarts the server when changes are detected in your TypeScript files.
Use `ts-node-dev` when you want to run your application in development mode.
Install this dependency using the following command:
  
```bash
npm install --save-dev ts-node-dev
```
  
Now you can run your application in development mode using the following command:

```bash
npm run dev
```

## 7. Test your application

Finally, test your application by navigating to http://localhost:3000 in your web browser or using a tool like Postman.
You should see the text `"Home page"` displayed.

This guide provides a foundation for creating an Express.js application using TypeScript.
You can expand your application by adding more routes, middleware, and configuring additional TypeScript options as needed.

## 8. Install Jest and Supertest for Testing (Optional)

If you want to add testing to your project, you can install Jest and Supertest:

```bash
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

## 9. Configure Jest for TypeScript

Create or update the `jest.config.js` file in the root of your project:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
};
```

This configuration tells Jest to use `ts-jest` for processing `.ts` files, and it sets the environment to `node`, which is appropriate for testing an Express application.
Tests can be placed in `__tests__` directories or named with `.spec.ts` or `.test.ts`.

## 10. Writing tests

Create a test file for your routes.
For example, you can create `apiRoutes.test.ts` and `usersRoutes.test.ts` inside a `__tests__` directory within your `src` directory.

Example Test for `apiRoutes`:

```typescript
// src/__tests__/apiRoutes.test.ts
import request from 'supertest';
import express from 'express';
import apiRoutes from '../routes/apiRoutes';

const app = express();
app.use('/', apiRoutes);

describe('GET /', () => {
  it('should respond with Hello World!', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual('Hello World!');
  });
});
```

Example test for `usersRoutes`:

```typescript
// src/__tests__/usersRoutes.test.ts
import request from 'supertest';
import express from 'express';
import usersRoutes from '../routes/usersRoutes';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/users', usersRoutes);

describe('Users Routes', () => {
  it('GET /users should return a list of users', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('POST /users should create a new user', async () => {
    const newUser = { name: 'Test User' };
    const response = await request(app)
      .post('/users')
      .send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', newUser.name);
  });

  // Add more tests as needed for other endpoints
});
```

## 11. Run your tests

Add a script to your `package.json` to run Jest:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Now you can run your tests using the following command:

```bash
npm test
```

## Notes

- For testing, you might want to consider setting up a separate test environment or mock your database to avoid using your production or development databases.
- It's a good practice to test not just the happy path but also the edge cases and error handling in your routes.
- As your application grows, consider structuring your tests to reflect your project's structure, making it easier to manage and understand your tests.


