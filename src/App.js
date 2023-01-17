import { useEffect, useState } from "react";
import Details from "./Details";

function App() {
  const [formDetails, setFormDetails] = useState({
    name: "",
    sector: "select",
    agreeTerms: false,
  });
  const [showDetails, setShowDetails] = useState(false);
  const [nameError, setNameError] = useState();
  const [sectoError, setSectorError] = useState();
  const [agreeTermsError, setAgreeTermsError] = useState();

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
      setShowDetails((prev) => !prev);
      return;
    }

    return;
  }

  function onReset(e) {
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
  }, [formDetails]);

  return (
    <div>
      <main className="flex flex-col justify-center items-stretch sm:justify-start mt-5 space-y-20">
        <div className="flex flex-col items-stretch space-y-4 ml-2">
          <div className="self-start sm:self-center text-lg font-semibold">
            Please fill the form
          </div>
          <form className="self-start sm:self-center space-y-4">
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
                className="w-32 border border-slate-400 p-1 rounded focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
              >
                <option value="select">--select--</option>
                <option>Manufacturing</option>
                <option>Construction materials</option>
                <option>Electronics and Optics</option>
                <option>Food and Beverage</option>
                <option>confectionery products</option>
                <option>Beverages</option>
                <option>fish products</option>
                <option>meat products</option>
                <option>dairy products</option>
                <option>Other</option>
                <option>snack food</option>
                <option>Furniture</option>
                <option>Bathroom/sauna</option>
                <option>Bedroom</option>
                <option>Childrens Room</option>
                <option>Kitchen</option>
                <option>Living Room</option>
                <option>Office</option>
                <option>Other</option>
                <option>Outdoor Project</option>
                <option>Furniture</option>
                <option>Machinery</option>
                <option>Machinery components</option>
                <option>Machinery Equipments</option>
                <option>Manufacture of machinery</option>
                <option>Maritime</option>
                <option>Aluminium and steel workboats</option>
                <option>Boat/Yacht building</option>
                <option>Boat/Yacht building</option>
                <option>Metal structures</option>
                <option>Other</option>
                <option>Repair and maintenance service</option>
                <option>MetalWorking</option>
                <option>Construction of metal structures</option>
                <option>Houses and buildings</option>
                <option>Metal products</option>
                <option>Metal works</option>
                <option>CNC-machining</option>
                <option>Forgings, Fasteners</option>
                <option>Gas, Plasma, Laser cutting</option>
                <option>MIG, TIG, Aluminum welding</option>
                <option>Plastic and Rubber</option>
                <option>Packaging</option>
                <option>Plastic goods</option>
                <option>Plastic processing technology</option>
                <option>Blowing</option>
                <option>Moulding</option>
                <option>Plastics welding and processing</option>
                <option>Plastic profiles</option>
                <option>Printing</option>
                <option>Advertising</option>
                <option>Book/Periodicals printing</option>
                <option>Labelling and packaging printing</option>
                <option>Textile and Clothing</option>
                <option>Clothing</option>
                <option>Textile</option>
                <option>Wood</option>
                <option>Other (Wood)</option>
                <option>Wooden building materials</option>
                <option>Wooden houses</option>
                <option>Other</option>
                <option>Creative industries</option>
                <option>Energy technology</option>
                <option>Environment</option>
                <option>Service</option>
                <option>Business services</option>
                <option>Engineering</option>
                <option>Information Technology and Telecommunications</option>
                <option>Data processing, Web portals, E-marketing</option>
                <option>Programming, Consultancy</option>
                <option>Software</option>
                <option>Transport and Logistics</option>
                <option>Air</option>
                <option>Rail</option>
                <option>Road</option>
                <option>Water</option>
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
              className="mr-3 w-20 bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 rounded-full p-1 text-white text-medium font-semibold"
            >
              Save
            </button>
            <button
              onClick={onReset}
              className="w-20 bg-gray-500 hover:bg-gray-700 active:bg-gray-800 rounded-full p-1 text-white text-medium font-semibold"
            >
              Reset
            </button>
          </div>
        </div>
        {showDetails && (
          <div className="self-start sm:self-center">
            <Details name={formDetails.name} sector={formDetails.sector} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
