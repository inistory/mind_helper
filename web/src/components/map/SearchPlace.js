import React, { useState } from "react";
import MapContainer from "./MapContainer";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const SearchPlace = () => {
  const [place, setPlace] = useState("심리상담소");
  const [selected, setSelected] = useState("심리상담소");
  const onChange = (e) => {
    setPlace(e.target.value);
    setSelected(e.target.value);
  };

  return (
    <>
      <MapContainer searchPlace={place} />

      <FormControl component="fieldset">
        <RadioGroup row aria-label="position" name="searchKeyword1">
          <Grid justify="center">
            <FormControlLabel
              value="심리상담소"
              control={<Radio color="primary" />}
              label="심리상담소"
              onChange={onChange}
              checked={selected == "심리상담소"}
            />
            <FormControlLabel
              value="정신건강의학과"
              control={<Radio color="primary" />}
              label="정신건강의학과"
              onChange={onChange}
              checked={selected == "정신건강의학과"}
            />
          </Grid>
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default SearchPlace;
