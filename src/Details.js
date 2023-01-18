import { useEffect, useState } from "react";
import axios from "axios";

function Details({ name, sector, prevName, sectorValues }) {
  const [nameFromDB, setNameFromDB] = useState("");
  const [sectorFromDB, setSectorFromDB] = useState("");
  const [editData, setEditData] = useState(false);

  useEffect(() => {
    if (!editData && name.length > 0) {
      axios({
        method: "get",
        url: `/user/${name}`,
      })
        .then((res) => {
          setNameFromDB(res.data[0]);
          setSectorFromDB(res.data[1]);
          setEditData(true);
        })
        .catch((err) => err);
    }
  }, [name, sector, nameFromDB, sectorFromDB, editData]);

  return (
    <div className="flex flex-col items-stretch space-y-8 ml-2">
      <div className="self-start sm:self-center text-lg font-semibold">
        Details
      </div>
      <div className="self-start sm:self-center text-lg font-semibold text-green-700">
        Retrieved from Database
      </div>
      <div className="self-start flex flex-col items-stretch space-y-8">
        <div className="self-start">
          <div className="flex flex-wrap">
            <div className="mr-2 text-medium font-medium">Name:</div>
            <div className="text-medium font-small">
              {editData ? name : nameFromDB}
            </div>
          </div>
          <div className="self-start">
            <div className="flex flex-wrap">
              <div className="mr-2 text-medium font-medium">Sector:</div>
              <div className="text-medium font-small">
                {editData ? sectorValues[sector - 1] : sectorFromDB}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-start sm:self-center text-lg font-semibold text-red-700">
        You can still edit the data.
      </div>
    </div>
  );
}

export default Details;
