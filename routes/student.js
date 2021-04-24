import express from "express";
import * as studentController from "../controllers/student.js";
import validator from "express-validator";

const { check } = validator;
const router = express.Router();

const studentValidatorAndSanitizer = [
    check("name")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Name must have at least 5 chars!")
        .isAlpha("en-US", { ignore: "'- " })
        .withMessage("Name allowed chars are only letters - ' and spaces"),
    check("code")
        .trim()
        .toUpperCase()
        .isLength({ min: 7, max: 7 })
        .withMessage("Code must be exactly 7 chars!"),
];

router.get("/api/students", studentController.getStudents);
router.get("/api/students/:studentId", studentController.getStudent);
router.post(
    "/api/students",
    studentValidatorAndSanitizer,
    studentController.addStudent
);
router.put(
    "/api/students/:studentId",
    studentValidatorAndSanitizer,
    studentController.updateStudent
);
router.delete("/api/students/:studentId", studentController.deleteStudent);
router.get("/web/students/create/", studentController.getStudentForm);
router.post(
    "/web/students/create/",
    studentValidatorAndSanitizer,
    studentController.addStudentInForm
);

export default router;
