const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mern_crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, console.log("Connected"));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
});


const User = mongoose.model('User', userSchema);

app.get('/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.post('/users/add', (req, res) => {
  const { name, fatherName, dateOfBirth, gender } = req.body;
  const newUser = new User({ name, fatherName, dateOfBirth, gender });
  newUser
    .save()
    .then(() => res.json('User added!'), console.log("User Added"))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.post('/users/update/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.name = req.body.name;
      user.fatherName = req.body.fatherName;
      user.dateOfBirth = req.body.dateOfBirth;
      user.gender = req.body.gender;

      user
        .save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

app.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(PORT, () => {
  console.log(`http://localhost:`+PORT);
});