import User from "../models/User.js";
import generateId from "../helpers/generateId.js";

const register = async (req, res) => {

    const { email } = req.body;
    const userExists = await User.findOne({ email });

    if(userExists){
        const error = new Error("User already registered");
        return res.status(400).json({ msg: error.message });
    }

  try {
    const user = new User(req.body);
    user.token = generateId();
    const userStored = await user.save();
    res.json({msg: "Creating user"});
  } catch (error) {
    console.log(error);
  }
};

export { register };
