import React, { useEffect, useState } from "react";
import { getBoardList } from "../api/BoardApi";

const BoardComponents = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await getBoardList();
        setBoards(data);
      } catch (error) {
        console.error("❌ 게시판 데이터를 불러오지 못했습니다:", error);
      }
    };
    fetchBoards();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📋 게시판 목록</h2>
      {boards.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {boards.map((board) => (
            <li
              key={board.boardId}
              className="p-3 border rounded-md shadow-sm hover:bg-gray-50 transition"
            >
              <h3 className="font-semibold">{board.title}</h3>
              <p className="text-sm text-gray-600">{board.writer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};