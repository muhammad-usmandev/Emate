const MentorRoleChecker = (req, res, next) => {
  try {
    if (req.user.role !== "mentor") {
      return res
        .status(401)
        .json({ message: "Unautheroized you are not mentor!" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Server Error", error });
  }
};
export default MentorRoleChecker;
