import User from '../Model/User';

const login = async (req: any, res: any) => {
  const { email, password } = req.body.body;
  const user = await User.login(email, password);
};

const register = async (req: any, res: any) => {
  let isLogged: boolean = false;
  const { body } = req.body;
  console.log(body);

  try {
    const user = await User.create(body);
    if (user) {
      const { fullName, email, password } = user;
      const userLogged = await User.login(email, password);
      userLogged && (isLogged = true);

      res.json({
        message: 'Account has been created',
        fullName,
        email,
        isLogged,
      });
    }
  } catch (error) {
    console.log('error: ', error);
    if (error?.toString().includes('E11000 duplicate key error collection')) {
      res
        .status(400)
        .json({ message: `Email '${body.email}' is already in use` });
    }
  }
};

export { login, register };
