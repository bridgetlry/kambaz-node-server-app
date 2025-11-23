import { v4 as uuidv4 } from 'uuid';
import model from './model.js';
export default function AssignmentsDao() {

  async function findAssignmentsForCourse(courseId) {
    console.log("all assignments");
    const allAssignments = await model.find({});
    console.log("all", allAssignments);


    console.log(`Finding assignments for course: .${courseId}`);

    const assignments = await model.find({course: courseId});
    console.log("Found assignments: ", assignments);
    return assignments;
  }

  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return model.create(newAssignment)
  };

  function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
  }

  function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne(
      { _id: assignmentId },
      { $set: assignmentUpdates }
    )
  }


  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment
  };
}