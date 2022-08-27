import React, { useEffect, useState } from "react";
import axios from "axios";
import FormElement from "../components/FormElement";
import { RegisterConfig } from "../config/RegisterConfig";
import { Link, useNavigate } from "react-router-dom";
import { FormContext } from "../helpers/formContext";
import "./css/Registration.css";

const Registration = () => {
  const [configData, setConfigData] = useState(RegisterConfig);
  const [apiData, setApiData] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/api/employeedata").then((response) => {
      setApiData(response.data);
    });
  }, []);

  const handleRegister = (event) => {
    event.preventDefault();
    const postData = async () => {
      await axios
        .post("http://localhost:3001/api/employeedata", {
          Employee_No: 1,
          Employee_Data: configData,
        })
        .then((response) => {
          setApiData(response.data);
        });
    };
    const formId = configData[0].questionvalue;
    console.log(apiData);
    const configId = apiData
      .map((p) => p.Employee_Data[0])
      .map((p) => p.questionvalue);
    if (configId.includes(formId)) {
      setError(true);
      setErrorMsg("Employee Id already exist");
    } else if (configData[1].questionvalue !== configData[2].questionvalue) {
      setError(true);
      setErrorMsg("Password doesn't match");
    } else {
      postData();
      navigate("/");
    }
  };

  const handleChange = (id, event) => {
    event.preventDefault();
    const newData = [...configData];
    newData.forEach((question) => {
      const { questionid } = question;
      if (id === questionid) {
        question["questionvalue"] = event.target.value;
        setConfigData(newData);
      }
    });
  };
  return (
    <FormContext.Provider value={{ handleChange }}>
      <h2 className="registration-header">
        <button className="back-button">
          <Link className="link" to="/">
            Back to Login{" "}
          </Link>
        </button>
        Registration Page
      </h2>
      <form className="registration-form-container" onSubmit={handleRegister}>
        {configData.map((questions, i) => {
          return (
            <div key={i}>
              <label className="question-label">{questions.question}</label>
              <FormElement questions={questions} />
            </div>
          );
        })}
        {error && <div className="error-msg">*{errorMsg}</div>}
        <input className="register-button" type="submit" value="Register" />
      </form>
    </FormContext.Provider>
  );
};

export default Registration;
