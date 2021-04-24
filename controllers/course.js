import Course from "../models/course.js";
import validator from "express-validator";
import { passError } from "../helpers.js";

const { validationResult } = validator;

const notFoundCourseError = (course) => {
    if (!course) {
        const error = new Error("No course was found with that id!");
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

export const getCourses = async (req, res, next) => {
    try {
        const courses = await Course.findAll();
        return res.status(200).json({
            success: true,
            courses,
        });
    } catch (error) {
        passError(error, next);
    }
};

export const getCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findByPk(courseId);
        notFoundCourseError(course);
        return res.status(200).json({
            success: true,
            course,
        });
    } catch (error) {
        passError(error, next);
    }
};

export const addCourse = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        raiseValidationError(errors);
        const { name, code, description } = req.body;
        const course = await Course.create({
            name,
            code,
            description,
        });
        return res.status(201).json({
            success: true,
            course,
        });
    } catch (error) {
        passError(error, next);
    }
};

export const updateCourse = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        raiseValidationError(errors);
        const { courseId } = req.params;
        const { name, code, description } = req.body;
        const course = await Course.findByPk(courseId);
        notFoundCourseError(course);
        course.name = name;
        course.code = code;
        course.description = description;
        await course.save();
        return res.status(201).json({
            success: true,
            course,
        });
    } catch (error) {
        passError(error, next);
    }
};

export const deleteCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findByPk(courseId);
        notFoundCourseError(course);
        await course.destroy();
        return res.status(201).json({
            success: true,
        });
    } catch (error) {
        passError(error, next);
    }
};

export const getCourseForm = async (req, res, next) => {
    try {
        return res.status(200).render("add-course");
    } catch (error) {
        passError(error, next);
    }
};

export const addCourseInForm = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).render("add-course", {
                errors: errors.array(),
            });
        }
        const { name, code, description } = req.body;
        const course = await Course.create({
            name,
            code,
            description,
        });
        return res.status(200).render("add-course", {
            course,
        });
    } catch (error) {
        passError(error, next);
    }
};
