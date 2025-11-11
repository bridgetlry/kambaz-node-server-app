import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const newEnrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId
    }
    db.enrollments = [...db.enrollments, newEnrollment];
    return newEnrollment;
  }

  function unenrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    db.enrollments = enrollments.filter((enrollment) => enrollment.user !== userId && enrollment.course !== courseId);
  }

  return { enrollUserInCourse, unenrollUserInCourse };
}
