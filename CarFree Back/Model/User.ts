import { Model, Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';

interface IUser {
  fullName: string;
  email: string;
  password: string;
  createDate: Date;
}

interface UserModel extends Model<IUser> {
  login(email: string, password: string): IUser;
}

// const schema = new Schema({ name: String });
// schema.static('myStaticMethod', function myStaticMethod() {
//   return 42;
// });

const UserSchame = new Schema<IUser, UserModel>({
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

UserSchame.statics.login = async function (email: string, password: string) {
  const user = await this.findOne({ email });

  if (user === null) {
    return null;
  } else {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
  }
  return null;
};

const User = model<IUser, UserModel>('User', UserSchame);

export default User;
