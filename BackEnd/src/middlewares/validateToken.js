import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        console.log("No token, authorization denied");
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("Invalid Token");
            return res.status(403).json({ message: "Invalid Token" });
        }

        console.log("User decoded from token:", user);
        req.user = user;
        next();
    });
};
