const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB model
const ReservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

const UserSchema = new mongoose.Schema({
  name:{
      type:String,
      required:true
  },

  email:{
      type:String,
      require:true,
      unique:true
  },

  password:{
      type:String,
      required:true
  }
});

UserSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


const User = mongoose.model('User', UserSchema);

module.exports = User;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/reservations', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Route to fetch unavailable dates
app.get('/api/reservations/unavailable-dates', async (req, res) => {
    try {
        const reservations = await Reservation.find({});
        const unavailableDates = reservations.map(reservation => reservation.date);
        res.json(unavailableDates);
      } catch (error) {
        console.error('Error fetching unavailable dates:', error);
        res.status(500).json({ message: 'Error fetching unavailable dates' });
      }
});

// Route to create a new reservation
app.post('/api/reservations', async (req, res) => {

  
  const { name, email, date } = req.body;
    const reservationDate = new Date(date);

    if (isNaN(reservationDate.getTime())) {
      return res.status(400).send('Invalid date format');
    }
    
  try {
    const newReservation = new Reservation({ name, email, date:reservationDate });
    await newReservation.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'lolmc161@gmail.com',  // Ideally use environment variables
        pass: 'fhhq frue qzke usdm'
      }
    });

  const mailOptions = {
    from: 'lolmc161@gmail.com',
    to: email,
    subject: 'Reservation Confirmation',
    text: `Dear ${name}, your reservation for ${reservationDate.toDateString()} is confirmed!`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending confirmation email');
    }
    res.status(200).send('Reservation confirmed');
  });

} catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).send('Error creating reservation');
  }
});

// Start the server


app.post('/api/register', async (req,res) => {

  console.log(req.body);
  const{name, email, password} = req.body;

  try{
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message: 'User already exists'});
    }
    const newUser = new User({name, email, password});
    await newUser.save();

    const token = jwt.sign({id:newUser._id}, 'your_jwt_secret_key', {expiresIn: '1h'});

    res.status(201).json({message:'User registered successfully', token});


  }
  catch(error){
    res.status(500).json({message: 'Error registering user'});
  }
});



app.post('/api/login', async (req,res) => {
  const{email, password} = req.body;
  try{
  const user= await User.findOne({email});
  if(!user){
    return res.status(400).json({message: 'Invalid user or password'});
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch){
    return res.status(400).json({message: 'Invalid user or password'});
  }


  const token = jwt.sign({id:user._id}, 'your_jwt_secret_key', {expiresIn:'1h'});

  res.status(200).json({message: 'Login successful', token, user});
  }

  catch(error){
    console.error('Error logging in: ', error);

    res.status(500).json({message: 'Error logging in'})
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});