export default async (req, res, next) => {
    req.parsedCookies = 'test cookies';
    next();
};