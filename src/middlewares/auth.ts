import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

// Middleware to make sure only Admin is allowed
export const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHandler("Please Login First", 401));

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("This is not a valid ID", 401));

  if (user.role !== "admin")
    return next(
      new ErrorHandler("You are not Authorized to perform this Action", 403)
    );
  next();
});
