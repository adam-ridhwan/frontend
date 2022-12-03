const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const port = 4000;

app.use(cors());
app.use(express.json());

const username = 'adamrwn';
const password = '9GRLrXVvZZonByvC';
const dbname = 'tasklane-database';

mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.6qt0dz3.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

const todosSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  todos: [
    {
      event: String,
      finished: Boolean,
      id: String,
    },
  ],
});
const Todos = mongoose.model('Todos', todosSchema);

app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await User.findOne({ email }).exec();

  if (user) {
    res.status(500);
    res.json({ message: 'user already exists' });
    return;
  }
  await User.create({ firstName, lastName, email, password });

  const registeredUser = await User.findOne({ email }).exec();
  const todos = await Todos.findOne({ userId: registeredUser._id }).exec();

  if (!todos) {
    await Todos.create({
      userId: registeredUser._id,
      todos: [],
    });
  } else {
    todos.todos = [];
    await todos.save();
  }

  res.json({
    message: 'success',
  });
});

app.get('/login', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [email, password] = token.split(':');
  const user = await User.findOne({ email }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: 'invalid login' });
    return;
  }

  res.json({ user });
});

app.post('/todos', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [email, password] = token.split(':');
  const todosItems = req.body;
  const user = await User.findOne({ email }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: 'invalid access' });
    return;
  }
  const todos = await Todos.findOne({ userId: user._id }).exec();

  todos.todos = todosItems;
  await todos.save();

  res.json(todosItems);
});

app.get('/todos', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [email, password] = token.split(':');
  const user = await User.findOne({ email }).exec();

  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: 'invalid access' });
    return;
  }

  const { todos } = await Todos.findOne({ userId: user._id }).exec();

  res.json(todos);
});

app.put('/todos', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [email, password] = token.split(':');
  const user = await User.findOne({ email }).exec();
  const todo = req.body;

  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: 'invalid access' });
    return;
  }
  const query = { userId: user._id, 'todos.id': todo.id };
  const update = { $set: { 'todos.$.event': todo.event } };
  const updateEvent = await Todos.findOneAndUpdate(query, update).exec();

  res.json(updateEvent);
});

app.put('/reset', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [email, password] = token.split(':');
  const user = await User.findOne({ email }).exec();

  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: 'invalid access' });
    return;
  }
  const query = { userId: user._id };
  const update = { $set: { todos: [] } };
  const resetTodos = await Todos.findOneAndUpdate(query, update).exec();
  res.json(resetTodos);
});

app.delete('/todo', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [email, password] = token.split(':');
  const user = await User.findOne({ email }).exec();
  const todo = req.body;

  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: 'invalid access' });
    return;
  }

  const deleteTodo = await Todos.deleteOne({
    userId: user._id,
    'todos.id': todo.id,
  });

  res.json(deleteTodo);
});
