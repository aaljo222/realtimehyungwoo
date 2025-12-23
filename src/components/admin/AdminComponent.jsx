import React, { useState } from "react";
import { useSelector } from "react-redux";

import AdminLayout from "../../layouts/AdminLayout";

import AttendanceApi from "../../api/AttendanceApi";
import BoardApi from "../../api/BoardApi";
import CommentApi from "../../api/CommentApi";
import CourseApi from "../../api/CourseApi";
import CourseOfferingApi from "../../api/CourseOfferingApi";
import DepartmentApi from "../../api/DepartmentApi";
import EnrollmentApi from "../../api/EnrollmentApi";
import GradeApi from "../../api/GradeApi";
import NoticeApi from "../../api/NoticeApi";
import PostApi from "../../api/PostApi";
import ReviewApi from "../../api/ReviewApi";
import TimeTableApi from "../../api/TimeTableApi";
import userApi from "../../api/userApi";
import FileAttachmentApi from "../../api/FileAttachmentApi";
import SearchHistoryApi from "../../api/SearchHistoryApi";
import AdminSelectedContext from "./AdminSelectContext";
import ClassSectionApi from "../../api/ClassSectionApi";
import ClassroomApi from "../../api/ClassroomApi";

const AdminComponent = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const userEmail = loginState.email;

  // 상태 통합
  const [selectedIds, setSelectedIds] = useState({
    attendance: "none",
    board: "none",
    classroom: "none",
    classSection: "none",
    comment: "none",
    course: "none",
    courseOffering: "none",
    department: "none",
    enrollment: "none",
    grade: "none",
    notice: "none",
    post: "none",
    review: "none",
    timeTable: "none",
    user: "none",
    fileAttachment: "none",
    searchHistory: "none",
  });

  const setSelectId = (tableKey, id) => {
    setSelectedIds((prev) => ({ ...prev, [tableKey]: id }));
  };

  const tableApis = {
    attendance: AttendanceApi,
    board: BoardApi,
    classroom: ClassroomApi,
    classSection: ClassSectionApi,
    comment: CommentApi,
    course: CourseApi,
    courseOffering: CourseOfferingApi,
    department: DepartmentApi,
    enrollment: EnrollmentApi,
    grade: GradeApi,
    notice: NoticeApi,
    post: PostApi,
    review: ReviewApi,
    timeTable: TimeTableApi,
    user: userApi,
    file: FileAttachmentApi,
    search: SearchHistoryApi,
  };

  return (
    <div>
      {/* --소개글-- */}
      <h1 className="text-2xl font-bold mb-6">
        개발 편의를 위한 자동화 페이지
      </h1>
      <h2>
        프론트엔드와 백엔드 통신을 해야할 때, 실제로 해보는 장소입니다. 양식에
        맞게, 데이터를 세팅하면, 연동이 됩니다.
      </h2>

      <AdminSelectedContext.Provider value={{ selectedIds, setSelectId }}>
        {Object.keys(tableApis).map((key) => (
          <AdminLayout
            key={key}
            config={{
              ...tableApis[key].config,
              funcs: {
                ...tableApis[key].config.funcs,
                writeOne: (dto) =>
                  tableApis[key].config.funcs.writeOne(dto, userEmail),
                deleteOne: (dto) =>
                  tableApis[key].config.funcs.deleteOne(dto, userEmail),
                updateOne: (dto) =>
                  tableApis[key].config.funcs.updateOne(dto, userEmail),
              },
            }}
          />
        ))}
      </AdminSelectedContext.Provider>
    </div>
  );
};

export default AdminComponent;
