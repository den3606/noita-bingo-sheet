import { Stack, TextField } from "@mui/material";

interface Props {
  setNumbers: React.Dispatch<React.SetStateAction<number[]>>; // 正しい型を指定
  setSeed: React.Dispatch<React.SetStateAction<string | number>>;
}

const Inputs: React.FC<Props> = ({ setNumbers, setSeed }) => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-basic"
          label="表示したい番号"
          placeholder="1,5,10"
          onChange={(e) => {
            setNumbers(
              e.target.value
                .split(",")
                .map(Number)
                .filter((item) => item > 0)
            );
          }}
        />
        <TextField
          id="outlined-basic"
          label="Seed"
          onChange={(e) => {
            setSeed(e.target.value);
          }}
        />
      </Stack>
    </>
  );
};

export default Inputs;
