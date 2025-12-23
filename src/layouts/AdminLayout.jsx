import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { typeEnum } from "../api/commonApi";
import AdminSelectedContext from "../components/admin/AdminSelectContext";
import { createButton } from "../util/button";
import AdminTableListComponent from "../components/admin/AdminTableListComponent";
import AdminWriteComponent from "../components/admin/AdminWriteComponent";
import AdminUpdateComponent from "../components/admin/AdminUpdateComponent";
import AdminModalComponent from "../components/admin/AdminModalComponent";
import AdminSearchFormComponent from "../components/admin/AdminSearchFormComponent";
import AdminDeleteViewComponent from "../components/admin/AdminDeleteViewComponent";
import AdminDetailViewComponent from "../components/admin/AdminDetailViewComponent";

const AdminLayout = ({ config }) => {
  // 데이터 가져오기
  const {
    key,
    primaryKey,
    tableInfo,
    allColumns,
    funcs,
    formData,
    type,
    buttonDataList,
    extrahButtonDataList,
    color,
    readOnlyList,
    fileList,
  } = config;
  const { findByKeyword, readAll, readOne, writeOne, deleteOne, updateOne } =
    funcs;

  const {
    columns,
    createColumns,
    responseColumns,
    updateColumns,
    searchColumns,
  } = allColumns;

  // 리덕스
  const { selectedIds, setSelectId } = useContext(AdminSelectedContext);

  const selectId = selectedIds[key]; // 현재 테이블 선택 ID

  const changeSelectId = (id) => {
    setSelectId(key, id); // Context에 전달
  };

  // ✅ createColumns 키를 기반으로 빈 폼 객체 생성
  const initialForm =
    formData ||
    Object.keys(createColumns || {}).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});

  const [form, setForm] = useState(initialForm);

  // useState 사용
  const [readData, setReadData] = useState([]);
  const [findReadOne, setFindReadOne] = useState({});
  // const [form, setForm] = useState(formData);
  const [isLoading, setLoading] = useState(false);

  const [findData, setFindData] = useState([]);
  const [selectData, setSelectData] = useState({});

  // ✅ 초기값을 직접 설정
  const [findColumns, setFindColumns] = useState({});
  const [findCreateColumns, setFindCreateColumns] = useState(
    Object.keys(createColumns || {})
  );
  const [findResponseColumns, setFindResponseColumns] = useState(
    Object.keys(responseColumns || {})
  );
  const [findUpdateColumns, setFindUpdateColumns] = useState(
    Object.keys(updateColumns || {})
  );
  const [findSearchColumns, setFindSearchColumns] = useState(
    Object.keys(searchColumns || {})
  );

  // ✅ 원본 컬럼 객체들도 직접 초기화
  const [responseColumnsObj, setResponseColumnsObj] = useState(
    responseColumns || {}
  );
  const [createColumnsObj, setCreateColumnsObj] = useState(createColumns || {});
  const [updateColumnsObj, setUpdateColumnsObj] = useState(updateColumns || {});

  // 갱신용 useState
  const [viewMode, setViewMode] = useState(typeEnum.default);

  const [selectedColumn, setSelectedColumn] = useState([]);
  const [formColumn, setFormColumn] = useState([]);
  const [targetColumn, setTargetColumn] = useState(null);

  const [buttonList, setButtonList] = useState(buttonDataList);
  const [extrahButtonList, setExtrahButtonList] =
    useState(extrahButtonDataList);

  const [selectKeyword, setSelectKeyword] = useState("");
  const [searchSelectDatas, setSearchSelectDatas] = useState([]);

  // 출력될 버튼 모음
  const [isOpen, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const getList = (result) => {
    try {
      const data = result;
      setReadData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const changeViewMode = (newMode) => {
    if (viewMode === newMode) return;
    setViewMode(newMode);
  };

  // 핸들러
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // const onSubmit = (e, action) => {
  //   e.preventDefault();

  //   const relatedColumns = extrahButtonList.map(
  //     (data) => data.allColumns.createColumns
  //   );

  //   const rowData = new FormData(e.target);
  //   const formData = new FormData();

  //   for (const columns of relatedColumns) {
  //     for (const column of Object.keys(columns)) {
  //       const searchObject = formData.get(column);

  //       if (!searchObject || searchObject.trim() === "") {
  //         alert(`'${column}' 값이 비었습니다. 입력해주세요.`);
  //         return;
  //       }
  //     }
  //   }

  //   setLoading(true);
  //   action(form)
  //     .then((result) => {
  //       console.log("입력값 : ", form);
  //       console.log("결과값 : ", result);
  //     })
  //     .catch((err) => console.log("에러발생 : ", err))
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const onSubmit = (e, action) => {
    e.preventDefault();

    const relatedColumns = extrahButtonList.map(
      (data) => data.allColumns.createColumns
    );

    // 검증 로직
    for (const columns of relatedColumns) {
      for (const column of Object.keys(columns)) {
        const value = form[column];

        // 파일 필드는 File 객체 체크
        if (fileList && fileList.includes(column)) {
          if (!value || !(value instanceof File)) {
            alert(`'${column}' 파일을 선택해주세요.`);
            return;
          }
        } else {
          // 일반 필드는 문자열 체크
          if (!value || (typeof value === "string" && value.trim() === "")) {
            alert(`'${column}' 값이 비었습니다. 입력해주세요.`);
            return;
          }
        }
      }
    }

    // 파일 포함 여부 확인
    const hasFile = Object.values(form).some((value) => value instanceof File);

    setLoading(true);

    if (hasFile) {
      // FormData 생성
      const formData = new FormData();

      const metaObj = {};
      const formDataFromDom = new FormData(e.target);

      for (let [key, value] of formDataFromDom.entries()) {
        if (key !== "files") {
          // 파일 필드는 meta에서 제외
          metaObj[key] = value;
        }
      }

      // ★ meta라는 key로 JSON 텍스트 넣기
      formData.append(
        "meta",
        new Blob([JSON.stringify(metaObj)], { type: "application/json" })
      );

      formData.append("files", form["files"]);

      console.log(formData);

      action(formData)
        .then((result) => {
          console.log("입력값 : ", form);
          console.log("결과값 : ", result);
        })
        .catch((err) => console.log("에러발생 : ", err))
        .finally(() => {
          setLoading(false);
        });
    } else {
      // JSON 전송
      action(form)
        .then((result) => {
          console.log("입력값 : ", form);
          console.log("결과값 : ", result);
        })
        .catch((err) => console.log("에러발생 : ", err))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onSearch = (e) => {
    e.preventDefault();

    // form에서 데이터 추출
    const formData = new FormData(e.target);
    const selectKeyword = formData.get("selectKeyword");
    const searchText = formData.get("searchText"); // 추가된 name으로 값 추출

    console.log("선택된 컬럼:", selectKeyword);
    console.log("입력된 검색어:", searchText);

    setLoading(true);
    findByKeyword(selectKeyword, searchText)
      .then((result) => {
        console.log("결과값 : ", result);
        setSearchSelectDatas(result);
        setSelectKeyword(selectKeyword);
      })
      .catch((err) => console.log("에러발생 : ", err))
      .finally(() => {
        setLoading(false);
      });
  };

  const selectCheckbox = (id) => {
    setSelectData(findData[id]);
    updateForm(findData[id]);
  };

  const updateForm = (selectData) => {
    if (!selectData || Object.keys(selectData).length === 0) return;

    setForm((prev) => ({ ...prev, [targetColumn]: selectData }));
  };

  const updateSelectForm = (e) => {
    if (!e) return;

    const { name, value } = e.target;

    setSelectData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (typeof columns === "object") {
      const columnKey = Object.keys(columns);
      if (columnKey.length > 0) {
        setSelectedColumn(columnKey);
      }
    }

    if (typeof createColumns === "object") {
      setCreateColumnsObj(createColumns); // 원본 객체 저장
      const createColumnKey = Object.keys(createColumns);
      if (createColumnKey.length > 0) {
        setFindCreateColumns(createColumnKey);
      }
    }

    if (typeof responseColumns === "object") {
      setResponseColumnsObj(responseColumns); // 원본 객체 저장
      const responseColumnKey = Object.keys(responseColumns);
      if (responseColumnKey.length > 0) {
        setFindResponseColumns(responseColumnKey);
      }
    }

    if (typeof updateColumns === "object") {
      setUpdateColumnsObj(updateColumns); // 원본 객체 저장
      const updateColumnKey = Object.keys(updateColumns);
      if (updateColumnKey.length > 0) {
        setFindUpdateColumns(updateColumnKey);
      }
    }

    // 버튼 생성
    if (buttonDataList && buttonDataList.length > 0) {
      setButtonList(buttonDataList);
    }

    // 모달에서 쓰이는 버튼 생성
    if (extrahButtonDataList && extrahButtonDataList.length > 0) {
      setExtrahButtonList(extrahButtonDataList);
    }
  }, []);

  useEffect(() => {
    console.log("확인");
    // 실행 조건
    if (!selectId) return;
    if (viewMode !== typeEnum.readOne) return;

    console.log("통과했냐");

    // 데이터가 리스트 형태여서 0번을 가져오기로함. 수정이 필요함
    setLoading(true);
    readOne(selectId)
      .then((item) => {
        setFindReadOne(Array.isArray(item) ? item[0] : item);
        setForm(Array.isArray(item) ? item[0] : item);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [viewMode, selectId]);

  return (
    <div className={`container mx-auto mt-8 px-4 ${color} py-10`}>
      {tableInfo && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {tableInfo.tableName}
          </h2>
        </>
      )}

      {/* isOpen가 true혹은 false일 경우 구분 */}
      {isOpen ? (
        <>
          {/* 테이블 비활성화 버튼 */}
          <div className="w-full flex justify-center">
            {createButton({
              label: "테이블 닫기",
              style: "bg-green-300 hover:bg-green-700",
              size: "90%",
              onClick: () => {
                setOpen(false);
              },
            })}
          </div>
          {/* 테이블에 쓰이는 버튼 버튼 */}
          <div className="flex flex-wrap mb-6">
            {buttonList.map((btnData, index) => (
              <div
                key={index}
                className={`flex justify-center flex-1 basis-1/${buttonList.length}`}
              >
                {/* Component, index, arr */}
                {createButton({
                  label: btnData.label,
                  style: btnData.style,
                  onClick: () => {
                    changeViewMode(btnData.enumType);
                    if (btnData.action) {
                      btnData.action().then((result) => {
                        if (btnData.enumType === typeEnum.read) {
                          getList(result);
                        }
                      });
                    }
                  },
                })}
              </div>
            ))}
          </div>
          {/* 테이블 열린 상태 */}
          <div>
            {/* enum값이 read 경우, findAll모드 */}
            {viewMode === typeEnum.read && (
              <AdminTableListComponent
                tableInfo={tableInfo}
                columns={responseColumnsObj} // 객체 전달
                selectedColumn={findResponseColumns} // 키 배열 전달
                readData={readData}
                changeViewMode={changeViewMode}
                changeSelectId={changeSelectId}
                primaryKey={primaryKey}
              />
            )}

            {/* enum값이 write 경우, 추가모드 */}
            {viewMode === typeEnum.write && (
              <AdminWriteComponent
                formColumn={findCreateColumns} // 키 배열
                form={form}
                setForm={setForm}
                formData={createColumnsObj} // 객체로 변경
                extrahButtonList={extrahButtonList}
                selectData={selectData}
                setSelectData={setSelectData}
                changeHandler={changeHandler}
                updateSelectForm={updateSelectForm}
                onSubmit={(e) => onSubmit(e, writeOne)}
                setModalOpen={setModalOpen}
                setTargetColumn={setTargetColumn}
                fileList={fileList ?? []}
              />
            )}

            {/* enum값이 update 경우, 업데이트모드 */}
            {viewMode === typeEnum.update && (
              <AdminUpdateComponent
                formColumn={findUpdateColumns} // 키 배열
                form={form}
                setForm={setForm}
                formData={updateColumnsObj} // 객체로 변경
                extrahButtonList={extrahButtonList}
                selectData={selectData}
                setSelectData={setSelectData}
                changeHandler={changeHandler}
                updateSelectForm={updateSelectForm}
                onSubmit={(e) => onSubmit(e, updateOne)}
                setModalOpen={setModalOpen}
                setTargetColumn={setTargetColumn}
                readOnlyList={readOnlyList}
                fileList={fileList ?? []}
              />
            )}

            {/* enum값이 readone 경우, 하나 읽기 모드 */}
            {viewMode === typeEnum.readOne && (
              <AdminDetailViewComponent
                tableInfo={tableInfo}
                findReadOne={findReadOne}
                readOne={funcs.readOne}
                selectedColumn={findResponseColumns}
                columns={columns}
                createButton={createButton}
                typeEnum={typeEnum}
                changeViewMode={changeViewMode}
                primaryKey={config.primaryKey} // ✅ 추가
                setForm={setForm}
              />
            )}

            {/* enum값이 search 경우, search모드 */}
            {viewMode === typeEnum.search && (
              <AdminSearchFormComponent
                onSearch={onSearch}
                searchColumns={searchColumns}
                findSearchColumns={findSearchColumns}
                tableInfo={tableInfo}
                searchSelectDatas={searchSelectDatas}
                selectKeyword={selectKeyword}
                columns={responseColumnsObj} // 객체 전달
                selectedColumn={findResponseColumns} // 키 배열 전달
                readData={readData}
                changeViewMode={changeViewMode}
                changeSelectId={changeSelectId}
                primaryKey={primaryKey}
              />
            )}

            {/* enum값이 delete 경우, 삭제모드 */}
            {viewMode === typeEnum.delete && (
              <AdminDeleteViewComponent
                tableInfo={tableInfo}
                findReadOne={findReadOne}
                selectedColumn={selectedColumn}
                columns={columns}
                createButton={createButton}
                typeEnum={typeEnum}
                changeViewMode={changeViewMode}
                deleteOne={deleteOne}
                primaryKey={primaryKey}
              />
            )}
          </div>
          {/* 모달창 */}
          {isModalOpen && (
            <AdminModalComponent
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
              selectCheckbox={selectCheckbox}
              selectId={selectId}
              changeSelectId={changeSelectId}
              setFindData={setFindData}
              findData={findData}
              findColumns={findColumns} // ✅ findColumns 객체 전달 (targetColumn이 아님!)
              setFindColumns={setFindColumns}
              extrahButtonList={extrahButtonList}
              targetColumn={targetColumn} // 이건 필터링용으로 유지
              createButton={createButton}
              tableInfo={tableInfo}
            />
          )}
        </>
      ) : (
        <>
          {/* 테이블 비활성화 버튼 */}
          <div className="w-full flex justify-center">
            {createButton({
              label: "테이블 열기",
              style: "bg-green-300 hover:bg-green-700",
              size: "90%",
              onClick: () => {
                setOpen(true);
                changeViewMode(type);
              },
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default AdminLayout;
