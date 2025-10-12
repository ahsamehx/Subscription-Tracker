import e from 'express';
import User from '../models/User.js';

function filterObject(obj, allowedFields) {
  const filtered = {};
  Object.keys(obj).forEach(key => {
    if (allowedFields.includes(key)) {
      filtered[key] = obj[key];
    }
  });
  return filtered;
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    }
    catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if(!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        next(error);
    }
}

export const updateUserDetails = async (req, res, next) => {
  try {
    let userId;
    let allowedFields;

    if (req.params.id) {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
      userId = req.params.id;
      allowedFields = ["name", "email", "role"]; 
    } else {
      userId = req.user._id;
      allowedFields = ["name", "email"];
    }

    const filteredBody = filterObject(req.body, allowedFields);

    if (req.body.password || req.body.role) {
      return res.status(400).json({ message: "You cannot update password or role from this route." });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, filteredBody, {
      new: true,
      runValidators: true,
    }).select('name email role');

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        next(error);
    }
}

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    let userId;

    if (req.params.id) {
      userId = req.params.id;}
    else {
      userId = req.user._id;
    }
    const user = await User.findById(userId);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect." });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error changing password.", error: error.message });
  }
};

export const changeRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ success: true, message: "User role updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error updating role.", error: error.message });
  }
};
