import { useEffect, useState } from "react";
import Details from "./Details";
import axios from "axios";

function App() {
  const [formDetails, setFormDetails] = useState({
    name: "",
    sector: 0,
    agreeTerms: false,
  });
  const [showDetails, setShowDetails] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [sectoError, setSectorError] = useState(false);
  const [agreeTermsError, setAgreeTermsError] = useState(false);
  const [selectValues, setSelectValues] = useState([]);
  const [prevName, setPrevName] = useState("");

  function handleChange(e) {
    const name = e.target.name;
    var value = e.target.value;
    if (name === "agreeTerms") {
      value = e.target.checked;
    }
    setFormDetails({ ...formDetails, [name]: value });
  }

  function onSave() {
    if (formDetails.name.length === 0) {
      setNameError(true);
    }
    if (formDetails.sector === "select") {
      setSectorError(true);
    }
    if (formDetails.agreeTerms === false) {
      setAgreeTermsError(true);
    }

    if (
      formDetails.name.length > 0 &&
      formDetails.sector !== "select" &&
      formDetails.agreeTerms === true
    ) {
      if (prevName.length > 0) {
        axios({
          method: "post",
          url: `/user/${prevName}`,
          data: JSON.stringify({
            name: formDetails.name,
            sector: formDetails.sector,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            setPrevName("");
          })
          .catch((err) => console.log(err));

        setShowDetails((prev) => !prev);

        //resetting the data
        setFormDetails({
          name: "",
          sector: "select",
          agreeTerms: false,
        });

        setShowDetails((prev) => {
          if (prev) prev = false;
        });

        setNameError(false);
        setAgreeTermsError(false);
        setSectorError(false);
      } else {
        setPrevName(formDetails.name);
        axios({
          method: "post",
          url: "/user",
          data: JSON.stringify({
            name: formDetails.name,
            sector: formDetails.sector,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            console.log(res.data);
            setShowDetails((prev) => !prev);
          })
          .catch((err) => console.log(err));
      }
    }

    return;
  }

  useEffect(() => {
    if (formDetails.name.length > 0) {
      setNameError(false);
    }
    if (formDetails.sector !== "select") {
      setSectorError(false);
    }
    if (formDetails.agreeTerms === true) {
      setAgreeTermsError(false);
    }

    if (selectValues.length === 0) {
      axios({
        method: "get",
        url: "/sectors",
      })
        .then((res) => setSelectValues(res.data))
        .catch((err) => console.log(err));
    }
  }, [formDetails, selectValues]);

  return (
    <div>
      <main className="flex flex-col justify-center items-stretch sm:justify-start mt-5 space-y-24">
        <div className="flex flex-col items-stretch space-y-8 ml-2">
          <div className="self-start sm:self-center text-lg font-semibold">
            Please fill the form
          </div>
          <form className="self-start sm:self-center space-y-8">
            <div>
              <label className="mr-2 text-medium font-medium">Name:</label>
              <input
                type="email"
                value={formDetails.name}
                onChange={handleChange}
                name="name"
                className="border border-slate-400 p-1 rounded focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
              ></input>
              {nameError && (
                <p className="text-red-700 text-sm font-medium">
                  Please enter Name
                </p>
              )}
            </div>
            <div>
              <label className="mr-2 text-medium font-medium">Sector:</label>
              <select
                value={formDetails.sector}
                onChange={handleChange}
                name="sector"
                className="w-56 border border-slate-400 p-1 rounded focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
              >
                <option value={0}>--select--</option>
                {selectValues.map((val, index) => (
                  <option key={index} value={index + 1}>
                    {val}
                  </option>
                ))}
              </select>
              {sectoError && (
                <p className="text-red-700 text-sm font-medium">
                  Please select Sector.
                </p>
              )}
            </div>
            <div>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formDetails.agreeTerms}
                onChange={handleChange}
                className="accent-cyan-600"
              ></input>
              <label className="ml-2 text-medium font-medium">
                Agree to Terms
              </label>
              {agreeTermsError && (
                <p className="text-red-700 text-sm font-medium">
                  Please check the Terms.
                </p>
              )}
            </div>
          </form>
          <div className="self-start sm:self-center space-y-2">
            <button
              onClick={onSave}
              className="w-20 bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 rounded-full p-1 text-white text-medium font-semibold"
            >
              Save
            </button>
          </div>
        </div>
        {showDetails && (
          <div className="self-start sm:self-center">
            <Details
              name={formDetails.name}
              sector={formDetails.sector}
              prevName={prevName}
              sectorValues={selectValues}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
