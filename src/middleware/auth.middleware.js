import jwt from 'jsonwebtoken'
const authorized = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};

export default authorized;