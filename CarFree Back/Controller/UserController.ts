import User from '../Model/User';

const register = (req, res) => {
  const userObject = req.body;

  try {
    const user = User.create(userObject);
  } catch (error) {
    console.log(error);
  }
};

export { register };
