import express from "express";
import * as courseController from "../controllers/course.js";
import { isThreeLettersFollowedByThreeNumbers } from "../validators/course-validator.js";
import validator from "express-validator";

const { check } = validator;
const router = express.Router();

const courseValidatorAndSanitizer = [
    check("name")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Name must have at least 5 chars!"),
    check("description")
        .trim()
        .isLength({ max: 200 })
        .withMessage("Description can't exceed 200 chars!"),
    check("code")
        .trim()
        .toUpperCase()
        .isLength({ min: 6, max: 6 })
        .withMessage("Code must be exactly 6 chars!"),
    check("code").custom(isThreeLettersFollowedByThreeNumbers),
];
router.get("/api/courses", courseController.getCourses);
router.get("/api/courses/:courseId", courseController.getCourse);
router.post(
    "/api/courses",
    courseValidatorAndSanitizer,
    courseController.addCourse
);
router.put(
    "/api/courses/:courseId",
    courseValidatorAndSanitizer,
    courseController.updateCourse
);
router.delete("/api/courses/:courseId", courseController.deleteCourse);
router.get("/web/courses/create/", courseController.getCourseForm);
router.post(
    "/web/courses/create/",
    courseValidatorAndSanitizer,
    courseController.addCourseInForm
);

export default router;
