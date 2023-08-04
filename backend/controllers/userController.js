import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";

const register = async (req, res) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("User already registered");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const user = new User(req.body);
    user.token = generateId();
    const userStored = await user.save();
    res.json({ msg: "Creating user" });
  } catch (error) {
    console.log(error);
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  //comprobar si el usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("The user does not exist");
    return res.status(404).json({ msg: error.message });
  }

  // comprobar si el usuario esta confirmado
  if (!user.confirmed) {
    const error = new Error("Your account has not been verified");
    return res.status(403).json({ msg: error.message });
  }

  //comprobar su password
  if (await user.verifyPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id)
    });
  }
};

const confirm = async (req, res) => {
  const { token } = req.params;
  const userConfirm = await User.findOne({ token });

  if(!userConfirm){
    const error = new Error("Token no valid");
    return res.status(403).json({ msg: error.message });
  }

  try {
    userConfirm.confirmed = true;
    userConfirm.token = "";
    await userConfirm.save();
    res.json({ msg: "User confirmed succesfully" });
  } catch (error) {
    console.log(error);
  }
}

export { register, authenticate, confirm };
