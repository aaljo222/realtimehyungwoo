import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AdminSelectedContext from "./AdminSelectContext";

const AdminAttendanceComponent = () => {
  const [bookList, setBookList] = useState([]);
  const { selectedBookIsbn, setSelectedBookIsbn } = useContext(AdminSelectedContext);

  useEffect(() => {
    const getList = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/list');
        setBookList(data);
      } catch (error) {
        console.error(error);
      }
    };
    getList();
  }, []);

  const handleSelect = (isbn) => {
    setSelectedBookIsbn(isbn);
  };

  return (
    <div className="table-responsive">
    </div>
  );
};

export default AdminAttendanceComponent;