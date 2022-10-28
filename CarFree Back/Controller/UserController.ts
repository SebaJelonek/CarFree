import User from '../Model/User';
import bcrypt from 'bcrypt';

const login = async (req: any, res: any) => {
  const { email, password } = req.body;
  const message = 'Wrong email or password';
  const user = await User.login(email, password);
  if (user) {
    const loggedInfo = await bcrypt.hash(user.toString(), 10);
    const isLogged = true;
    res.json({
      message: 'Logged in successfully',
      loggedInfo,
      fullName: user.fullName,
      email,
      isLogged,
      status: 200,
    });
  } else {
    res.status(400).json({ message, status: 400 });
  }
};

const register = async (req: any, res: any) => {
  let isLogged: boolean = false;
  const { body } = req;

  try {
    const user = await User.create(body);
    if (user) {
      const { fullName, email, password } = user;

      isLogged = true;
      const loggedInfo = await bcrypt.hash(user.toString(), 10);
      res.json({
        message: 'Account has been created',
        loggedInfo,
        fullName,
        email,
        isLogged,
        status: 200,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: `Email '${body.email}' is already in use`,
      status: 400,
    });
  }
};

export { login, register };
