import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

// type정의
// 오타 방지 및 일관성에 도움이 됩니다.
export const typeEnum = {
  default: "default",
  read: "read",
  oneRead: "oneRead",
  search: "search",
  write: "write",
  delete: "delete",
  update: "update",
  loading: "loading",
  modal: "modal",
};

export const createCrudApi = (tableName) => ({
  readAll: () => {
    console.log(`${tableName} readAll`);
    return axios
      .get(`${API_SERVER_HOST}/api/${tableName}/all`)
      .then((r) => r.data);
  },
  readOne: (id) => {
    console.log(`${tableName} readOne`);
    return axios
      .get(`${API_SERVER_HOST}/api/${tableName}/one/${id}`)
      .then((r) => r.data);
  },
  writeOne: async (dto, userEmail) => {
    console.log(`${tableName} writeOne`, dto, userEmail);
    try {
      const r = await axios.post(
        `${API_SERVER_HOST}/api/${tableName}/create`,
        dto,
        {
          headers: {
            "X-User-Email": userEmail, // 실제로는 로그인한 사용자 이메일
          },
        }
      );
      return r.data;
    } catch (error) {
      console.error(`${tableName} writeOne error:`, error);
      console.log("실제 전송 데이터:", JSON.stringify(dto, null, 2));
      console.error(
        "백엔드 오류",
        JSON.stringify(error.response?.data, null, 2)
      );
      throw error;
    }
  },
  updateOne: async (dto, userEmail) => {
    console.log(`${tableName} writeOne`, dto, userEmail);
    try {
      const r = await axios.put(
        `${API_SERVER_HOST}/api/${tableName}/update`,
        dto,
        {
          headers: {
            "X-User-Email": userEmail, // 실제로는 로그인한 사용자 이메일
          },
        }
      );
      return r.data;
    } catch (error) {
      console.error(`${tableName} updateOne error:`, error);
      console.log("실제 전송 데이터:", JSON.stringify(dto, null, 2));
      throw error;
    }
  },
  deleteOne: async (id, userEmail) => {
    console.log(`${tableName} writeOne`, id, userEmail);
    try {
      const r = await axios.delete(
        `${API_SERVER_HOST}/api/${tableName}/delete/${id}`,
        {
          headers: {
            "X-User-Email": userEmail, // 실제로는 로그인한 사용자 이메일
          },
        }
      );
      return r.data;
    } catch (error) {
      console.error(`${tableName} deleteOne error:`, error);
      console.log("실제 전송 데이터:", JSON.stringify(id, null, 2));
      console.error(
        "백엔드 오류",
        JSON.stringify(error.response?.data, null, 2)
      );
      throw error;
    }
  },
});

const createExtraApi = (tableName) => ({
  findByKeyword: async (selectKeyword, searchText) => {
    console.log(`${tableName} keyword`);
    // API_SERVER_HOST =>
    return axios
      .get(`${API_SERVER_HOST}/api/${tableName}/${selectKeyword}/${searchText}`)
      .then((r) => r.data);
  },
});

// 함수 정의
// export const excludeColumns = (columns, excludeArray) => {
//   return Object.keys(columns)
//     .filter(key => !excludeArray.includes(key))
//     .reduce((acc, key) => {
//       acc[key] = columns[key];
//       return acc
//     }, {});
// }

export const makeDefaultButtonDataList = (overrides = {}) => [
  {
    label: "모두읽기",
    action: null,
    enumType: typeEnum.read,
    style: "bg-red-300 hover:bg-red-700",
    ...overrides.readAll,
  },
  {
    label: "데이터추가",
    action: null,
    enumType: typeEnum.write,
    style: "bg-green-500 hover:bg-green-600",
    ...overrides.writeOne,
  },
  {
    label: "검색",
    action: null, // 기본은 빈 함수; 각 API에서 교체 가능
    enumType: typeEnum.search,
    style: "bg-blue-500 hover:bg-blue-600",
    ...overrides.search,
  },
];

export const createTableConfig = (tabelDef, extraButtons = []) => {
  const {
    key,
    primaryKey,
    tableEng,
    tableName,
    allColumns,
    excludeList,
    color,
    readOnlyList,
    fileList,
  } = tabelDef;

  const funcs = {
    ...createCrudApi(key),
    ...createExtraApi(key),
  };

  return {
    key,
    primaryKey,
    tableInfo: { tableEng, tableName },
    allColumns,
    // excludeList,
    funcs,
    // formData: excludeColumns(columns, excludeList),
    type: typeEnum.read,
    color,
    buttonDataList: makeDefaultButtonDataList({
      readAll: { action: funcs.readAll },
    }),
    extrahButtonDataList: extraButtons,
    readOnlyList,
    fileList,
  };
};
