import EnrollmentsDao from './dao.js';

export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);

    const enrollUserInCourse = (req, res) => {
        const { courseId } = req.params;
        const { userId } = req.body;
        const newEnrollment = dao.enrollUserInCourse(userId, courseId);
        res.send(newEnrollment);
    }

    const unenrollUserInCourse = (req, res) => {
        const { courseID, userId } = req.params;
        const status = dao.unenrollUserInCourse(userId, courseID);
        res.send(status);
    }

    app.post("/api/courses/:courseId/enrollments", enrollUserInCourse);
    app.delete("/api/courses/:courseId/enrollments/:userId", unenrollUserInCourse);
}