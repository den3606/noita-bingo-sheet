import type React from "react";
import { useState } from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

// セルのカスタムスタイル
const BingoCell = styled(Box)(({ selected }: { selected: boolean }) => ({
  height: "150px",
  width: "150px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: selected ? "#ffcccb" : "#f0f0f0",
  border: "1px solid #ccc",
  cursor: "pointer",
  userSelect: "none",
  fontWeight: "bold",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: selected ? "#ffaaaa" : "#cce7ff",
  },
  fontSize: "1rem", // 初期フォントサイズ
  overflow: "hidden", // はみ出しを防ぐ
  textOverflow: "ellipsis", // テキストが長い場合に省略記号を表示
  whiteSpace: "collapse", // テキストが折り返されないようにする
}));

const CellContent: React.FC<{
  isSelected: boolean;
  isShowText: boolean;
  bingoContents: Map<number, string>;
  cellNumber: number | "FREE";
}> = ({ isSelected, isShowText, bingoContents, cellNumber }) => {
  if (isSelected) {
    return <>✅</>;
  }

  if (cellNumber === "FREE") {
    return <p>FREE</p>;
  }

  if (isShowText) {
    return (
      <>
        {cellNumber}
        <br />
        {bingoContents.get(Number(cellNumber))}
      </>
    );
  }

  return <>{cellNumber}</>;
};

// ランダムなビンゴ用データを生成
const generateBingoNumberStrings = (): (number | "FREE")[][] => {
  const columns = [
    Array.from({ length: 15 }, (_, i) => i + 1), // B列
    Array.from({ length: 15 }, (_, i) => i + 16), // I列
    Array.from({ length: 15 }, (_, i) => i + 31), // N列
    Array.from({ length: 15 }, (_, i) => i + 46), // G列
    Array.from({ length: 15 }, (_, i) => i + 61), // O列
  ];

  const shuffledColumns = columns.map((col) =>
    [...col].sort(() => Math.random() - 0.5).slice(0, 5)
  );

  const grid = Array.from({ length: 5 }, (_, rowIndex) =>
    Array.from({ length: 5 }, (_, colIndex) => {
      if (rowIndex === 2 && colIndex === 2) return "FREE";
      return shuffledColumns[colIndex][rowIndex];
    })
  );

  return grid;
};

interface Props {
  bingoContents: Map<number, string>;
  isShowText: boolean;
}

const BingoSheet: React.FC<Props> = ({ bingoContents, isShowText }) => {
  const [bingoNumberStrings, _] = useState(generateBingoNumberStrings());
  const [selectedCells, setSelectedCells] = useState(
    Array.from({ length: 5 }, () => Array(5).fill(false))
  );

  const handleCellClick = (row: number, col: number) => {
    setSelectedCells((prev) => {
      const newSelected = prev.map((r, rIdx) =>
        r.map((c, cIdx) => (rIdx === row && cIdx === col ? !c : c))
      );
      return newSelected;
    });
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Noita! ビンゴシート
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 150px)",
          gap: "4px",
          justifyContent: "center",
        }}
      >
        {["B", "I", "N", "G", "O"].map((letter) => (
          <Typography
            key={letter}
            variant="h6"
            sx={{
              textAlign: "center",
              fontSize: "3em",
              lineHeight: "150px",
              fontWeight: "bold",
            }}
          >
            {letter}
          </Typography>
        ))}
        {bingoNumberStrings.map((col, colIndex) =>
          col.map((cellNumber, rowIndex) => (
            <BingoCell
              key={cellNumber}
              selected={selectedCells[colIndex][rowIndex]}
              onClick={() => handleCellClick(colIndex, rowIndex)}
            >
              <CellContent
                isSelected={selectedCells[colIndex][rowIndex]}
                isShowText={isShowText}
                bingoContents={bingoContents}
                cellNumber={cellNumber}
              />
            </BingoCell>
          ))
        )}
      </Box>
    </Box>
  );
};

export default BingoSheet;
