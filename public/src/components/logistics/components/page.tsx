import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { SessionInfo } from "@/lib/types/types";
import ReactPaginate from "react-paginate";
import { PackageData } from "@/lib/types/types";

import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { FaLink } from "react-icons/fa6";

const Logistics: React.FC<SessionInfo> = ({ session }) => {
  const [listPackage, setListPackage] = useState<PackageData[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [filterCarrier, setFilterCarrier] = useState("");
  const [filterClient, setFilterClient] = useState("");
  const pageElements = 5;

  const pageCount = Math.ceil(listPackage.length / pageElements);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    const websocketURL = `${process.env.NEXT_PUBLIC_WEBSOCKET_APP}/app/ws/all-package/`;
    const client = new W3CWebSocket(websocketURL);

    client.onmessage = (message: any) => {
      let data;
      try {
        data = JSON.parse(message.data as string);
        setListPackage(data);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };
    return () => {
      if (client.readyState === client.OPEN) {
        client.close();
      }
    };
  }, []);

  const filteredList = listPackage.filter((pkg) => {
    const carrierMatch =
      pkg.carrier?.username
        .toLowerCase()
        .includes(filterCarrier.toLowerCase()) || !filterCarrier;
    const clientMatch =
      pkg.client.username.toLowerCase().includes(filterClient.toLowerCase()) ||
      !filterClient;
    return carrierMatch && clientMatch;
  });

  return (
    <div className="w-full h-full z-10">
      {!session?.user ? (
        <div className="">
          <p>Aun no has iniciado session</p>
        </div>
      ) : (
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition ${!session?.user? "animate-fade-out animate__animated animate__fadeOut": "animate-fade-in animate__animated animate__fadeIn"}`}>
          <div className="w-11/12 flex justify-between items-center h-5/6 mt-10">
            <div className="relative w-full h-full bg-gray-200 rounded-md p-6">
              <input
                type="text"
                placeholder="Filtrar por transportista"
                value={filterCarrier}
                onChange={(e) => setFilterCarrier(e.target.value)}
                className="mb-4 px-4 py-2 border border-gray-400 rounded-md"
              />
              <input
                type="text"
                placeholder="Filtrar por cliente"
                value={filterClient}
                onChange={(e) => setFilterClient(e.target.value)}
                className="mb-4 px-4 py-2 border border-gray-400 rounded-md"
              />
              {filteredList.length > 0 ? (
                <div className="relative h-full w-full text-gray-500">
                  <table className="min-w-full text-center text-sm font-light">
                    <thead className="font-medium text-gray-800">
                      <tr className="border-b border-slate-900 uppercase text-xs">
                        <th scope="col" className=" px-6 py-2">Codigo</th>
                        <th scope="col" className=" px-6 py-2">Transportista</th>
                        <th scope="col" className=" px-6 py-2">Cliente</th>
                        <th scope="col" className=" px-6 py-2">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredList?.slice(pageNumber * pageElements,(pageNumber + 1) * pageElements).map((obj, index) => (
                          <tr key={index} className="border-b border-slate-700 uppercase text-xs text-gray-800">
                            <td className="whitespace-nowrap px-6 py-2 font-Courier font-semibold">{obj.code}</td>
                            <td className="whitespace-nowrap px-6 py-2 hidden sm:table-cell">{obj.carrier?.username ?? "N/A"}</td>
                            <td className="whitespace-nowrap px-6 py-2">{obj.client.username}</td>
                            <td className="whitespace-nowrap px-6 py-2 flex justify-center"><FaLink /> </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <ReactPaginate
                    previousLabel={<MdNavigateBefore />}
                    nextLabel={<MdNavigateNext />}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={0}
                    pageRangeDisplayed={5}
                    onPageChange={changePage}
                    className={"absolute bottom-0 w-full flex flex-row items-center justify-center gap-x-2"}
                    pageClassName={"bg-gray-500 text-white rounded-full !px-3 !py-0 transition-colors duration-300"}
                    activeClassName={"bg-gray-500 text-white rounded-full !px-3 !py-0 transition-colors duration-300"}
                    previousClassName={"absolute left-5 bg-gray-500 rounded-full p-1 transition-colors duration-300"}
                    nextClassName={"absolute right-5 bg-gray-500 text-white rounded-full p-1 transition-colors duration-300"}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <p className="text-center text-gray-800 my-4 text-sm">
                    ¡Aun No hay Historial disponible de Paquetes Enviados!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logistics;
