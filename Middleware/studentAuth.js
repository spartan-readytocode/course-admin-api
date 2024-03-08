import jwt from 'jsonwebtoken'

const studentAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Invalid authorization header" });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded value", decoded);
  
      if (decoded.username) {
        next();
      } else {
        res.status(403).json({ message: "User is not authorized" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error", error: err }); // Consider a more informative error message
    }
  };
  
  export default studentAuth;
  