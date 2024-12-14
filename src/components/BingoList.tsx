import { Checkbox, FormControlLabel, List, ListItem } from "@mui/material";
import { createBingo } from "../create-bingo";

interface Props {
  numbers: number[];
  seed: string | number;
}

const BingoList: React.FC<Props> = ({ numbers, seed }) => {
  return (
    <>
      <List dense={true}>
        {createBingo(seed).map((bingoText, index) => {
          if (numbers.length <= 0) {
            return (
              <span key={bingoText}>
                <ListItem>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={`${index + 1}: ${bingoText}`}
                  />
                </ListItem>
              </span>
            );
          }
          if (numbers.includes(index + 1)) {
            return (
              <span key={bingoText}>
                <ListItem>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={`${index + 1}: ${bingoText}`}
                  />
                </ListItem>
              </span>
            );
          }
          return null;
        })}
      </List>
    </>
  );
};

export default BingoList;
