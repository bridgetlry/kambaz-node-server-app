import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export default function EnrollmentsDao(db) {

  async function findAllEnrollments() {
    return model.find({});
  }

  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  }

  async function findUsersForCourse(courseId) {
    const enrollments = await model.find(
      { course: courseId }).populate("user");
    return enrollments.map(
      (enrollment) => enrollment.user);
  }

  function enrollUserInCourse(userId, courseId) {
    return model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });

    // const newEnrollment = {
    //   _id: uuidv4(),
    //   user: userId,
    //   course: courseId
    // }
    // db.enrollments = [...db.enrollments, newEnrollment];
    // return newEnrollment;
  }

  function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }

  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  function fetchEnrollments(userId) {
    return model.find({ user: userId });
  }

  return {
    findAllEnrollments,
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
    fetchEnrollments
  };
}

