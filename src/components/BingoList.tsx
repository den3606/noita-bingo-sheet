import { Checkbox, FormControlLabel, List, ListItem } from "@mui/material";

interface Props {
  numbers: number[];
  bingoContents: Map<number, string>;
}

const BingoList: React.FC<Props> = ({ numbers, bingoContents }) => {
  return (
    <List dense={true}>
      {[...bingoContents.entries()].map((item, index) => {
        if (numbers.length <= 0) {
          return (
            <span key={item[0]}>
              <ListItem>
                <FormControlLabel
                  control={<Checkbox />}
                  label={`${item[0]}: ${item[1]}`}
                />
              </ListItem>
            </span>
          );
        }
        if (numbers.includes(index + 1)) {
          return (
            <span key={item[0]}>
              <ListItem>
                <FormControlLabel
                  control={<Checkbox />}
                  label={`${item[0]}: ${item[1]}`}
                />
              </ListItem>
            </span>
          );
        }
        return null;
      })}
    </List>
  );
};

export default BingoList;
