import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import router1 from './routes/auth.routes.js';
import router2 from './routes/link.routes.js';
import router3 from './routes/redirect.routes.js';
import router4 from './routes/todo.route.js';

const app = express();
const PORT = config.get('port') || 5000

app.use(express.json());
//регистарция роута
app.use('/api/auth', router1)
app.use('/api/link', router2)
app.use('/t', router3)
app.use('/api/todo', router4)


const start = async() => {
  try {
    await mongoose.connect(config.get('mongoUri'))
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log(e)
  }
}

start();

