import axios from "axios";
import { API_SERVER_HOST, createTableConfig } from "./commonApi";
import { tableDefinitions } from "./tablesConfig";

const tableName = "attendance";

const extraButtons = [];

var tableDefinition = tableDefinitions[tableName];
tableDefinition = {
  ...tableDefinition,
  allColumns: {
    ...tableDefinition.allColumns,
    writeOne: async (dto, userEmail) => {
      console.log(`${tableName} writeOne`, dto, userEmail);

      // FormData 여부 확인
      const isFormData = dto instanceof FormData;

      try {
        const headers = {
          "X-User-Email": userEmail,
        };

        // FormData가 아닐 경우에만 Content-Type 명시
        if (!isFormData) {
          headers["Content-Type"] = "application/json";
        }

        const r = await axios.post(
          `${API_SERVER_HOST}/api/${tableName}/create`,
          dto,
          { headers }
        );
        return r.data;
      } catch (error) {
        console.error(`${tableName} writeOne error:`, error);

        // FormData 디버깅
        if (isFormData) {
          console.log("실제 전송 데이터 (FormData):");
          for (let [key, value] of dto.entries()) {
            console.log(`  ${key}:`, value);
          }
        } else {
          console.log("실제 전송 데이터:", JSON.stringify(dto, null, 2));
        }

        console.error(
          "백엔드 오류",
          JSON.stringify(error.response?.data, null, 2)
        );
        throw error;
      }
    },
    searchColumns: {
      one: tableDefinition.allColumns.responseColumns,
    },
  },
  readOnlyList: [],
  fileList: ["files"],
};
const config = createTableConfig(tableDefinition, extraButtons);

export default { config };

// 나중에 메서드 이름 혹은 역할을 변경 , 미사용 시, 삭제할 것
// const Attendance = async () => {
//   console.log("attendance가 가동되었다.");
//   const res = await axios.get(`${API_SERVER_HOST}/api/attendance/student/checkclass`);
//   return res.data;
// };

// const findByKeyword = async () => {
//   console.log("attendance findByKeyword");
// }
