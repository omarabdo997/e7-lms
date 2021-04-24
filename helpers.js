export const passError = (error, next) => {
    if (!error.statusCode) {
        error.statusCode = 500;
        error.message = "Something went wrong please try again!";
    }
    next(error);
};
