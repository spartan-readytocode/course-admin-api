import jwt from "jsonwebtoken";

const AdminAuth = (req, res, next) => {
    const authHeader = req.headers.authorization; // Use camelCase for consistency

    // Check if authorization header exists and has the correct format
    if (!authHeader ) {
        return res.status(401).json({ message: "Invalid authorization header" });
    }

    const token = authHeader.split(" ")[1]; // Extract token safely using array notation

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded value:", decoded); // Log for debugging, remove in production
        if (decoded.username) {
            next();
        } else {
            return res.status(403).json({ message: "Unauthorized" }); // Use 403 for insufficient privileges
        }
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid or expired token",err }); // Informative error message
    }
};

export default AdminAuth;
