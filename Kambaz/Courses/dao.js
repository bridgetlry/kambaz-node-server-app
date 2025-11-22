import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export default function CoursesDao(db) {

    function findAllCourses() {
        // return db.courses;
        return model.find(
            {},
            { name: 1, description: 1}
        );
    }

    async function findCoursesForEnrolledUser(userId) {
        const { enrollments } = db;
        const courses = await model.find({}, { name: 1, description: 1 });
        const enrolledCourses = courses.filter((course) =>
            enrollments.some((enrollment) =>
                enrollment.user === userId &&
                enrollment.course === course._id));
        return enrolledCourses;
    }

    function createCourse(course) {
        const newCourse = { ...course, _id: uuidv4() };
        console.log("New course: ", newCourse);
        return model.create(newCourse);
        // db.courses = [...db.courses, newCourse];
        // return newCourse;
    }

    function deleteCourse(courseId) {
        // const { enrollments } = db;
        // // db.courses = courses.filter((course) =>
        // //     course._id !== courseId);
        // db.enrollments = enrollments.filter(
        //     (enrollment) => enrollment.course !== courseId
        // );
        return model.deleteOne({ _id: courseId });
    }

    function updateCourse(courseId, courseUpdates) {
        return model.updateOne(
            { _id: courseId },
            { $set: courseUpdates }
        )
        // const { courses } = db;
        // const course = courses.find((course) =>
        //     course._id === courseId);
        // Object.assign(course, courseUpdates);
        // return course;
    }

    return {
        findAllCourses,
        findCoursesForEnrolledUser,
        createCourse,
        deleteCourse,
        updateCourse
    };
}
