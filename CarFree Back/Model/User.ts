import { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';

const UserSchame = new Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
    validate: { validator: (email: string) => isEmail(email) },
  },
  password: { type: String, required: true, minlength: 6 },
  createDate: { type: Date, default: Date.now() },
});

// using traditional function in order to use 'this' keyword
UserSchame.pre('save', async function (next: any) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = model('user', UserSchame);

export default User;
