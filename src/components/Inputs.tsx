import { Box, Checkbox, Stack, TextField } from "@mui/material";

interface Props {
  setNumbers: React.Dispatch<React.SetStateAction<number[]>>;
  setSeed: React.Dispatch<React.SetStateAction<string | number>>;
  setIsShowText: React.Dispatch<React.SetStateAction<boolean>>;
}

const Inputs: React.FC<Props> = ({ setNumbers, setSeed, setIsShowText }) => {
  return (
    <Box sx={{ mt: 4 }}>
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
                .filter((item) => item > 0),
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
        <span>
          <Checkbox
            defaultChecked={false}
            onChange={(_, isChecked) => {
              setIsShowText(isChecked);
            }}
          />
          ビンゴにテキストを追加表示する
        </span>
      </Stack>
    </Box>
  );
};

export default Inputs;
