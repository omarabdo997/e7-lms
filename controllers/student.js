import Student from "../models/student.js";
import validator from "express-validator";
import { passError } from "../helpers.js";

const { validationResult } = validator;

const notFoundStudentError = (student) => {
    if (!student) {
        const error = new Error("No student was found with that id!");
        error.statusCode = 404;
        throw error;
    }
};

const raiseValidationError = (errors) => {
    if (!errors.isEmpty()) {
        const error = new Error("Validation error!");
        error.statusCode = 422;
        error.validators = errors.array();
        throw error;
    }
};

export const getStudents = async (req, res, next) => {
    try {
        const students = await Student.findAll();
        return res.status(200).json({
            success: true,
            students,
        });
    } catch (error) {
        passError(error, next);
    }
};

export const getStudent = async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findByPk(studentId);
        notFoundStudentError(student);
        return res.status(200).json({
            success: true,
            student,
        });
    } catch (error) {
        passError(error, next);
    }
};

export const addStudent = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        raiseValidationError(errors);
        const { name, code } = req.body;
        const student = await Student.create({
            name,
            code,
        });
        return res.status(201).json({
            success: true,
            student,
        });
    } catch (error) {
        passError(error, next);
    }
};

export const updateStudent = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        raiseValidationError(errors);
        const { studentId } = req.params;
        const { name, code } = req.body;
        const student = await Student.findByPk(studentId);
        notFoundStudent(student);
        student.name = name;
        student.code = code;
        await student.save();
        return res.status(201).json({
            success: true,
            student,
        });
    } catch (error) {
        passError(error, next);
    }
};

export const deleteStudent = async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findByPk(studentId);
        notFoundStudentError(student);
        await student.destroy();
        return res.status(201).json({
            success: true,
        });
    } catch (error) {
        passError(error, next);
    }
};

export const getStudentForm = async (req, res, next) => {
    try {
        return res.status(200).render("add-student");
    } catch (error) {
        passError(error, next);
    }
};

export const addStudentInForm = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).render("add-student", {
                errors: errors.array(),
            });
        }
        const { name, code } = req.body;
        const student = await Student.create({
            name,
            code,
        });
        return res.status(200).render("add-student", {
            student,
        });
    } catch (error) {
        passError(error, next);
    }
};
