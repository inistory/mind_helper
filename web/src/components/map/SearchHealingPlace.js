import React, { useState } from "react";
import MapContainer2 from "./MapContainer2";
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

const SearchHealingPlace = () => {
  const [place, setPlace] = useState("공원");
  const [selected, setSelected] = useState("공원");
  const onChange = (e) => {
    setPlace(e.target.value);
    setSelected(e.target.value);
  };
  const GreenRadio = withStyles({
    root: {
      color: green[400],
      "&$checked": {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  return (
    <>
      <MapContainer2 searchPlace={place} />
      <FormControl component="fieldset">
        <RadioGroup row aria-label="position" name="searchKeyword1">
          <FormControlLabel
            value="공원"
            control={<GreenRadio color="green" />}
            label="공원"
            onChange={onChange}
            checked={selected == "공원"}
          />
          <FormControlLabel
            value="맛집"
            control={<GreenRadio color="primary" />}
            label="맛집"
            onChange={onChange}
            checked={selected == "맛집"}
          />
          <FormControlLabel
            value="카페"
            control={<GreenRadio color="primary" />}
            label="카페"
            onChange={onChange}
            checked={selected == "카페"}
          />
          <FormControlLabel
            value="도서관"
            control={<GreenRadio color="primary" />}
            label="도서관"
            onChange={onChange}
            checked={selected == "도서관"}
          />
          <FormControlLabel
            value="휴양림"
            control={<GreenRadio color="primary" />}
            label="휴양림"
            onChange={onChange}
            checked={selected == "휴양림"}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default SearchHealingPlace;
