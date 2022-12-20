const mongoose = require('mongoose');

// crm users
const userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
}, {versionKey: false, strict: true});

const User = mongoose.model('User', userSchema);

// user's contact
const contactSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String},
  email: [{type: String}],
  phone: [{type: String}],
  notes: {type: String},
  tags: [{type: String}],
  favorite: {type: Boolean, default: false},
  userId: {type:mongoose.Schema.Types.ObjectId, ref:'User'}
}, {versionKey: false});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = {User, Contact};
