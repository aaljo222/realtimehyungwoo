import axios from "axios";
import { API_SERVER_HOST, createCrudApi } from "./commonApi";

const tableName = "student-scores";

export const StudentScoreApi = {
  // 기본 CRUD (createCrudApi 활용)
  ...createCrudApi(tableName),

  // [커스텀] SS-4: 평가항목(itemId)별 학생 점수 조회
  // 백엔드: GET /api/student-scores/items/{itemId}
  getItemScores: async (itemId, professorEmail) => {
    try {
      const response = await axios.get(
        `${API_SERVER_HOST}/api/${tableName}/items/${itemId}`,
        {
          headers: { "X-User-Email": professorEmail },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`[StudentScoreApi] getItemScores 에러:`, error);
      return []; // 에러 시 빈 배열 반환
    }
  },

  // [커스텀] SS-5: 점수 수정 (URL에 ID 포함)
  // 백엔드: PUT /api/student-scores/{scoreId}
  updateScore: async (scoreId, dto, professorEmail) => {
    try {
      const response = await axios.put(
        `${API_SERVER_HOST}/api/${tableName}/${scoreId}`,
        dto,
        {
          headers: { "X-User-Email": professorEmail },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`[StudentScoreApi] updateScore 에러:`, error);
      throw error;
    }
  },
};

export default StudentScoreApi;
