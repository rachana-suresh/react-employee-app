import React, { useContext } from "react";
import { FormContext } from "../../helpers/formContext";

const Dropdown = ({ questionid, questionoption }) => {
  const { handleChange } = useContext(FormContext);

  return (
    <div>
      <select
        id={questionid}
        onChange={(event) => handleChange(questionid, event)}
      >
        {questionoption &&
          questionoption.map((questionoption, i) => {
            return (
              <option id={questionid} value={questionoption.optionvalue}>
                {questionoption.optionvalue}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Dropdown;
