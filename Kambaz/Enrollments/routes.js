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
        const { courseId, userId } = req.params;
        const status = dao.unenrollUserFromCourse(userId, courseId);
        res.send(status);
    }

    const fetchEnrollments = async (req, res) => {
        let { userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const enrollments = await dao.fetchEnrollments(userId);
        res.json(enrollments);
    };

    app.post("/api/courses/:courseId/enrollments", enrollUserInCourse);
    app.delete("/api/courses/:courseId/enrollments/:userId", unenrollUserInCourse);
    app.get("/api/users/:userId/enrollments", fetchEnrollments);
}