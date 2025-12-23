import { AttendanceDef } from "./definitions/AttendanceDefinition";
import { BoardDef } from "./definitions/BoardDefinition";
import { CommentDef } from "./definitions/CommentDefinition";
import { CourseDef } from "./definitions/CourseDefinition";
import { DepartmentDef } from "./definitions/DepartmentDefinition";
import { EnrollmentDef } from "./definitions/EnrollmentDefinition";
import { GradeDef } from "./definitions/GradeDefinition";
import { NoticeDef } from "./definitions/NoticeDefinition";
import { OfferingDef } from "./definitions/OfferingDefinition";
import { PostDef } from "./definitions/PostDefinition";
import { ReviewDef } from "./definitions/ReviewDefinition";
import { TimeTableDef } from "./definitions/TimeTableDefinition";
import { UserDef } from "./definitions/UserDefinition";
import { FileAttachmentDef } from "./definitions/FileAttachmentDefinition";
import { searchHistoryDef } from "./definitions/SearchHistoryDefinition";
import { ClassroomDef } from "./definitions/ClassroomDefinition";
import { ClassSectionDef } from "./definitions/ClassSectionDefinition";

export const tableDefinitions = {
  attendance: AttendanceDef,
  board: BoardDef,
  classroom: ClassroomDef,
  classSection: ClassSectionDef,
  comment: CommentDef,
  course: CourseDef,
  courseOffering: OfferingDef,
  department: DepartmentDef,
  enrollment: EnrollmentDef,
  grade: GradeDef,
  notice: NoticeDef,
  post: PostDef,
  review: ReviewDef,
  time: TimeTableDef,
  user: UserDef,
  file: FileAttachmentDef,
  search: searchHistoryDef,
};
