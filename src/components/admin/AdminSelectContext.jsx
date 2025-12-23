import { createContext } from "react";

const AdminSelectedContext = createContext({
  selectedIds: {
    attendance: "none",
    board: "none",
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
  },
  setSelectId: (tableKey, id) => {}, // tableKey와 id를 받아 상태 갱신
});

export default AdminSelectedContext;
