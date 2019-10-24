export default async (req, res, next) => {
    req.parsedQuery = 'test query';
    next();
};