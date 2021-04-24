import validator from "validator";

export const isThreeLettersFollowedByThreeNumbers = (value, { req }) => {
    if (
        !(
            validator.isAlpha(value.substring(0, 3)) &&
            validator.isNumeric(value.substring(3, 6))
        )
    ) {
        throw new Error("Code must match 3 letters followed by 3 numbers");
    }
    return true;
};
