import express from 'express';
import apiRoutes from './routes/apiRoutes';
import usersRoutes from './routes/usersRoutes';

const app = express();
const port = 3000;

app.use('/', apiRoutes);

// You can specify other middleware or routes here. For example:
app.use('/users', usersRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
