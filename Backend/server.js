const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mern_task', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, console.log("Connected"));

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, 'yourSecretKey');
};

const User = mongoose.model('User', userSchema);




const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
  
});


const Task = mongoose.model('Task', taskSchema);

app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    const token = user.generateAuthToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Error signing up' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid password' });
    const token = user.generateAuthToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Error logging in' });
  }
});

app.get('/tasks', (req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.post('/tasks/add', (req, res) => {
  const { task, description } = req.body;
  const newUser = new User({ task, description });
  newUser
    .save()
    .then(() => res.json('Task added!'), console.log("Task Added"))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/tasks/:id', (req, res) => {
  Task.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.post('/tasks/update/:id', (req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.task = req.body.task;
      task.description = req.body.description;

      task
        .save()
        .then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

app.delete('/tasks/:id', (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(PORT, () => {
  console.log(`http://localhost:`+PORT);
});