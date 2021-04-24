export const get404 = (req, res, next) => {
    const error = new Error("Url not found!");
    error.statusCode = 404;
    next(error);
};
