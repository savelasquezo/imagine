import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { SessionInfo } from "@/lib/types/types";
import ReactPaginate from "react-paginate";
import { PackageData } from "@/lib/types/types";

import CreatePackageModal from "@/components/logistics/components/createPackageModal";
import UpdatePackageModal from "@/components/logistics/components/updatePackageModal";
import DeletePackageModal from "@/components/logistics/components/deletePackageModal";

import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";

const Logistics: React.FC<SessionInfo> = ({ session }) => {

  const [showModal, setShowModal] = useState(false);
  const [closingModal, setClosingModal] = useState(false);

  const [activeTab, setActiveTab] = useState('');
  const [selectedObject, setSelectedObject] = useState<PackageData>();

  const openModal = (tab: string, obj?: PackageData) => {
    setShowModal(true);
    setActiveTab(tab);
    if (obj) {
      setSelectedObject(obj)
    }
  };

  const closeModal = () => {
      setClosingModal(true);
      setTimeout(() => {
      setShowModal(false);
      setClosingModal(false);
      }, 500);
  };

  const [listPackage, setListPackage] = useState<PackageData[]>([]);
  const [filterCarrier, setFilterCarrier] = useState("");
  const [filterClient, setFilterClient] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const pageElements = 7;
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
    <div className="w-full h-full ">
      {!session?.user ? (
        <div className="w-full h-full flex flex-col justify-start items-center mt-8 px-16">
          <div className="w-full flex flex-row items-center justify-start my-4">
            <p className="font-bold text-3xl text-slate-700">IMAGINE APPS</p>
            <p className="ml-4">{"-->"} SR Fullstack - Simon Velasquez </p>
          </div>
          <p className="text-sm">
            La aplicación está desarrollada con el fin de validar los conocimientos técnicos, para la vacante de 
            Senior Fullstack con Python se optó por hacer una API-RestFull con WebShockets para la visualización 
            de la Información, para mayor comodidad la interfaz completa está integrada en una única vista, 
            Así como el CRUD referente a la aplicación "logistics" solicitada. <br /><br />
            La lógica del proyecto se realizó con Django REST en Modo ASGI, gestionado por Djoser con JWT 
            para la gestión de usuarios, se uso Redis para el almacenamiento en Cache, El proyecto cuenta con una interfaz desarrollada en JavaScript haciendo 
            uso de React con Nextjs. El repositorio del proyecto se encuentra en GitHub el cual contiene 
            el archivo README.md donde se especifica el paso a paso para la instalación del proyecto. 
            En caso de un inconveniente no previsto, favor comunicármelo. <br /><br />
            GitHub-<a href="https://github.com/savelasquezo/imagine" className="text-blue-800 font-semibold">https://github.com/savelasquezo/imagine</a><br />
           <span className="text-xs">
              El repositorio ya incluye las variables de entorno .env para mayor facilidad en la revisión del proyecto, 
              se aclara que esto solo se hace por tratarse de una prueba técnica.
            </span><br /><br />
            Admin-<a href="http://localhost:8000/app/admin/" className="text-blue-800 font-semibold">http://localhost:8000/app/admin/</a><br />
            <span className="text-xs">
            La gestión de usuarios se puede realizar desde el panel administrativo de Django, allí podrán agregar clientes y transportistas de prueba para evaluar la aplicación.
            </span><br /><br />
            Challenges-<a href="http://localhost:3000/extra" className="text-blue-800 font-semibold">http://localhost:3000/extra</a><br />
            <span className="text-xs">
            Los desafios planteado al final del documento los pueden encontrar desarrollados en la "extras" una vez se tenga instalado y ejecutando el servicio de NextJs
            </span><br /><br /><br />
              Espero que se hayan especificado con suficiente claridad los parámetros del proyecto. 
              Debido al limitado tiempo el cual pude dedicarle al proyecto, he pasado algunas cosas 
              por alto y hay muchas cosas que pueden mejorar; sin embargo, se cumplió a 
              cabalidad con los objetivos del proyecto.
          </p>
        </div>
      ) : (
          <div className={`w-11/12 h-[calc(100vh-7rem)] mx-auto mt-5 flex justify-between items-center  ${!session?.user? "animate-fade-out animate__animated animate__fadeOut": "animate-fade-in animate__animated animate__fadeIn"}`}>
            <div className="relative w-full h-full bg-gray-200 rounded-md p-6">
              <button onClick={() => openModal('add')} className="absolute top-10 right-10 text-3xl text-green-600 hover:text-green-800 transition-colors duration-300"><FaCirclePlus /></button>
              <div className="w-full flex flex-row gap-x-4 items-center justify-start">
                <input
                  type="text"
                  placeholder="Filtrar Transportistas"
                  value={filterCarrier}
                  onChange={(e) => setFilterCarrier(e.target.value)}
                  className="mb-4 px-4 py-2 border border-gray-400 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Filtrar Clientes"
                  value={filterClient}
                  onChange={(e) => setFilterClient(e.target.value)}
                  className="mb-4 px-4 py-2 border border-gray-400 rounded-md"
                />
              </div>
              {filteredList.length > 0 ? (
                <div className="h-full w-full text-gray-500">
                  <table className="min-w-full text-center text-sm font-light">
                    <thead className="font-medium text-gray-800">
                      <tr className="border-b border-slate-900 uppercase text-xs">
                        <th scope="col" className=" px-6 py-2">Codigo</th>
                        <th scope="col" className=" px-6 py-2">Transportista</th>
                        <th scope="col" className=" px-6 py-2">Cliente</th>
                        <th scope="col" className=" px-6 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredList?.slice(pageNumber * pageElements,(pageNumber + 1) * pageElements).map((obj, index) => (
                          <tr key={index} className="border-b border-slate-700 uppercase text-xs text-gray-800">
                            <td className="whitespace-nowrap px-6 py-2 font-Courier font-semibold">{obj.code}</td>
                            <td className="whitespace-nowrap px-6 py-2 hidden sm:table-cell">{obj.carrier?.username ?? "N/A"}</td>
                            <td className="whitespace-nowrap px-6 py-2">{obj.client.username}</td>
                            <td className="whitespace-nowrap px-6 py-2 flex justify-center gap-x-2">
                              <button onClick={() => openModal('put', obj)} className="text-base text-yellow-600 hover:text-yellow-800 transition-colors duration-300"><FaPencilAlt /></button>
                              <button onClick={() => openModal('del', obj)} className="text-lg text-red-600 hover:text-red-800 transition-colors duration-300"><AiFillDelete /></button>
                            </td>
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
                    className={"absolute bottom-5 left-0 w-full flex flex-row items-center justify-center gap-x-2"}
                    pageClassName={"bg-gray-500 text-white rounded-full !px-3 !py-0 transition-colors duration-300"}
                    activeClassName={"bg-gray-500 text-white rounded-full !px-3 !py-0 transition-colors duration-300"}
                    previousClassName={"absolute left-5 bg-gray-500 text-white rounded-full p-1 transition-colors duration-300"}
                    nextClassName={"absolute right-5 bg-gray-500 text-white rounded-full p-1 transition-colors duration-300"}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center -mt-10">
                  <p className="text-center text-gray-800 text-sm">
                    ¡Aun No hay registros disponible de Paquetes!
                  </p>
                </div>
              )}
            </div>
          </div>
      )}
      {showModal && (
      <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition bg-opacity-50 bg-slate-300 backdrop-blur-sm z-40 ${closingModal ? "animate-fade-out animate__animated animate__fadeOut" : "animate-fade-in animate__animated animate__fadeIn"}`}>
          <div className={`relative w-11/12 sm:w-3/5 md:w-3/5 lg:w-2/5 max-w-[40rem] bg-white rounded-lg p-6 lg:pb-2`}>
              <button onClick={closeModal} className='absolute z-10 top-4 right-4 text-xl text-red-900 hover:text-gray-600 transition-colors duration-300' ><AiOutlineClose /></button>
              <div className={`h-full ${activeTab === 'add' ? 'block' : 'hidden'}`}>
                <CreatePackageModal closeModal={closeModal} session={session}/>
              </div>
              <div className={`h-full ${activeTab === 'put' ? 'block' : 'hidden'}`}>
                <UpdatePackageModal closeModal={closeModal} session={session} selectedPackage={selectedObject} />
              </div>
              <div className={`h-full ${activeTab === 'del' ? 'block' : 'hidden'}`}>
                <DeletePackageModal closeModal={closeModal} session={session} selectedPackage={selectedObject} />
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logistics;
