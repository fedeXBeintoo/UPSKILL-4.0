import React, { useEffect, useState } from "react";
import { typeSensor } from "../../resources/types";
function D7({ titleField, array, openModal, report, title = "Lista sensori" }) {
  let arrayF = [...array];
  let machinarySId = arrayF.map((element) => element.machinaryId);
  const [unique, setUnique] = useState(machinarySId.filter(onlyUnique));
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  useEffect(() => {
    // eslint-disable-next-line
    arrayF = [...array];
    // eslint-disable-next-line
    machinarySId = arrayF.map((element) => element.machinaryId);
    setUnique(machinarySId.filter(onlyUnique));
  }, [array]);
  return (
    // xl:col-span-8
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">{title}</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">{titleField[0]}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    {titleField[1]}
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    {titleField[2]}
                  </div>
                </th>

                <th className="p-2">
                  <div className="font-semibold text-center">
                    {titleField[4]}
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100">
              {/* Row */}
              {unique &&
                unique.map((index) => {
                  const arrayFiltered = array.filter(
                    (element) => element.machinaryId === index
                  );
                  console.log(arrayFiltered);

                  return (
                    <tr
                      key={index}
                      style={report && { cursor: "pointer" }}
                      onClick={() => {
                        openModal && openModal(arrayFiltered[0]);
                      }}
                    >
                      <td className="p-2">
                        <div className="flex items-center">
                          <div className="text-gray-800">{index}</div>
                        </div>
                      </td>

                      <td className="p-2">
                        <div className="text-center">
                          {arrayFiltered.map(
                            (element, index, array) =>
                              `${element.sensorValue}${
                                element.type === typeSensor.temperature
                                  ? "°"
                                  : element.type === typeSensor.pressure
                                  ? " Pa"
                                  : " g/m³"
                              }${index !== array.length - 1 ? "/" : ""}`
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">
                          {arrayFiltered.map(
                            (element, index, array) =>
                              element.type +
                              (index !== array.length - 1 ? "/" : "")
                          )}
                        </div>
                      </td>

                      {/* <td className="p-2">
                        text-light-blue-500 
                        <div className="text-center ">{element.applied}</div>
                      </td> */}

                      <td className="p-2">
                        <div className="flex justify-center">
                          {arrayFiltered.map((element) => (
                            <div
                              className="mx-1"
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: 10,
                                backgroundColor: element.status,
                              }}
                            ></div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              {/* Row */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default D7;
