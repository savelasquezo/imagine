import React, { useState, useEffect } from "react";
import { NextResponse } from 'next/server';
import CircleLoader from 'react-spinners/CircleLoader';
import { SessionModal, PackageData, CarrierData, ClientData } from '@/lib/types/types'


export const fetchAllCarrier = async (accessToken: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/app/user/fetch-all-carrier/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${accessToken}`,
          },
        },
      );
      if (!res.ok) {
        return NextResponse.json({ error: 'Server responded with an error' });
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return NextResponse.json({ error: 'There was an error with the network request' });
    }
}

export const fetchAllClient = async (accessToken: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/app/user/fetch-all-client/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${accessToken}`,
          },
        },
      );
      if (!res.ok) {
        return NextResponse.json({ error: 'Server responded with an error' });
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return NextResponse.json({ error: 'There was an error with the network request' });
    }
}



const UpdatePackageModal: React.FC<SessionModal & { selectedPackage?: PackageData }> = ({ closeModal, session, selectedPackage }) => {

    const [loading, setLoading] = useState(false);

    const [listCarrier, setListCarrier] = useState<CarrierData[]>([]);
    const [listClient, setListClient] = useState<ClientData[]>([]);

    const [formData, setFormData] = useState({
        weight: selectedPackage?.weight ?? 0,
        height: selectedPackage?.height ?? 0,
        width: selectedPackage?.width ?? 0,
        depth: selectedPackage?.depth ?? 0,
        source: selectedPackage?.source ?? '',
        address: selectedPackage?.address ?? '',
        state: selectedPackage?.state ?? '',
        carrier: selectedPackage?.carrier?.id ?? '',
        client: selectedPackage?.client?.id ?? '',
    });

    const states = [
        { value: 'hold', label: 'Pendiente' },
        { value: 'delivered', label: 'Entregado' },
        { value: 'refused', label: 'Devuelto' }
    ]

    const updateCarrier = (selectedCarrier: any) => {
        setFormData(prevState => ({
            ...prevState,
            carrier: selectedCarrier
        }));
    };
    
    const updateClient = (selectedClient: any) => {
        setFormData(prevState => ({
            ...prevState,
            client: selectedClient
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            if (session) {
                const accessToken = session?.user?.accessToken;
                try {
                    const AllCarrier = await fetchAllCarrier(accessToken);
                    setListCarrier(AllCarrier || []);

                    const AllClient = await fetchAllClient(accessToken);
                    setListClient(AllClient || []);
                    
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };
        fetchData();
    }, [session]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/app/logistics/request-package/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${session?.user?.accessToken}`,
                },
                body: JSON.stringify({
                    id: selectedPackage?.id,
                    ...formData,
                }),
            });
            const data = res.headers.get('content-type')?.includes('application/json') ? await res.json() : {};
            if (!data.error) {
                closeModal();
            }
        } catch (error) {
            return NextResponse.json({ error: 'There was an error with the network request' });
        }
        setLoading(false);
    };

    return (
        <div className='w-full h-full'>
            {selectedPackage && (
            <form method="PUT" onSubmit={(e) => onSubmit(e)} className="relative flex flex-col w-full h-full text-center gap-y-2">
                <div className="flex flex-row gap-x-4 mt-8">
                    <select name="carrier" value={formData.carrier} onChange={(e) => updateCarrier(e.target.value)} className="h-10 w-1/2 indent-6 text-gray-800 rounded-sm border border-gray-700 bg-transparent px-3 py-2 !pr-9 text-sm outline outline-0 transition-all focus:outline-0 disabled:border-0">
                        <option value="">Seleccionar Transportista</option>
                        {listCarrier.map((carrier) => (
                            <option key={carrier.id} value={carrier.id}>{carrier.username}</option>
                        ))}
                    </select>
                    <select name="client" value={formData.client} onChange={(e) => updateClient(e.target.value)} className="h-10 w-1/2 indent-6 text-gray-800 rounded-sm border border-gray-700 bg-transparent px-3 py-2 !pr-9 text-sm outline outline-0 transition-all focus:outline-0 disabled:border-0">
                        <option value="">Seleccionar Cliente</option>
                        {listClient.map((client) => (
                            <option key={client.id} value={client.id}>{client.username}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-row gap-x-4">
                    <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="Peso" className="h-8 w-1/4 indent-6 text-gray-800 rounded-sm border border-gray-700 bg-transparent px-3 py-2 !pr-9 text-sm outline outline-0 transition-all focus:outline-0 disabled:border-0"/>
                    <input type="number" name="height" value={formData.height} onChange={handleInputChange} placeholder="Alto" className="h-8 w-1/4 indent-6 text-gray-800 rounded-sm border border-gray-700 bg-transparent px-3 py-2 !pr-9 text-sm outline outline-0 transition-all focus:outline-0 disabled:border-0"/>
                    <input type="number" name="width" value={formData.width} onChange={handleInputChange} placeholder="Ancho" className="h-8 w-1/4 indent-6 text-gray-800 rounded-sm border border-gray-700 bg-transparent px-3 py-2 !pr-9 text-sm outline outline-0 transition-all focus:outline-0 disabled:border-0"/>
                    <input type="number" name="depth" value={formData.depth} onChange={handleInputChange} placeholder="Largo" className="h-8 w-1/4 indent-6 text-gray-800 rounded-sm border border-gray-700 bg-transparent px-3 py-2 !pr-9 text-sm outline outline-0 transition-all focus:outline-0 disabled:border-0"/>
                </div>
                <div className="flex flex-row gap-x-4">
                    <input type="text" name="source" value={formData.source} onChange={handleInputChange} placeholder="Origen" className="h-10 w-1/3 indent-8 text-gray-800 rounded-sm border border-gray-700 bg-transparent px-3 py-2 !pr-9 text-sm outline outline-0 transition-all focus:outline-0 disabled:border-0"/>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Direccion" className="h-10 w-1/3 indent-8 text-gray-800 rounded-sm border border-gray-700 bg-transparent px-3 py-2 !pr-9 text-sm outline outline-0 transition-all focus:outline-0 disabled:border-0"/>
                    <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="h-10 w-1/3 indent-8 text-gray-800 rounded-sm border border-gray-700 bg-transparent px-3 py-2 !pr-9 text-sm outline outline-0 transition-all focus:outline-0 disabled:border-0"
                    >
                        {states.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                {loading ? (
                    <button type="button" className="h-10 mt-4 mb-2 bg-blue-900 text-white font-semibold rounded-sm py-2 px-4 w-full text-center flex items-center justify-center">
                        <CircleLoader loading={loading} size={25} color="#1c1d1f" />
                    </button>
                ) : (
                    <button type="submit" className="h-10 mt-4 mb-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-sm py-2 px-4 w-full text-center">
                        <p className="uppercase text-sm">Actualizar</p>           
                    </button>
                )}
            </form>
            )}
        </div>
    );
};

export default UpdatePackageModal;
