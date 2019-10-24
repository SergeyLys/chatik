import jwt from 'jsonwebtoken';
import config from '../config';

export default async (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        res.status(403).json({
            message: 'Forbidden. No token!',
        });
    }

    try {
        req.token = await jwt.verify(token, config.secret);
        next();
    } catch ({message}) {
        res.status(401).json({
            message
        });
    }
};