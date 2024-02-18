import React, { useState } from "react";
import { NextResponse } from 'next/server';
import CircleLoader from 'react-spinners/CircleLoader';
import { SessionModal, PackageData } from '@/lib/types/types';

const DeletePackageModal: React.FC<SessionModal & { selectedPackage?: PackageData }> = ({ closeModal, session, selectedPackage }) => {
    
    const [loading, setLoading] = useState(false);
    
    const onSubmit = async (e: React.FormEvent, selectedPackage: number) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/app/logistics/request-package/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${session?.user?.accessToken}`,
                },
                body: JSON.stringify({
                    id: selectedPackage,
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
            <form method="DELETE" onSubmit={(e) => onSubmit(e, selectedPackage.id)} className="relative w-full h-full text-center">
                <p className="text-center font-semibold mt-6">¿Estas segudo que desea eliminar el paquete {selectedPackage.code}?</p>
                <p className="text-xs">Una vez eliminado no podra recuperar la informacion del paquete</p>
                {loading ? (
                    <button type="button" className="h-10 mt-6 mb-2 bg-red-700 text-white font-semibold rounded-sm py-2 px-4 w-full text-center flex items-center justify-center">
                        <CircleLoader loading={loading} size={25} color="#1c1d1f" />
                    </button>
                ) : (
                    <button type="submit" className="h-10 mt-6 mb-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-sm py-2 px-4 w-full text-center z-50">
                        <p className="uppercase text-sm">Eliminar</p>           
                    </button>
                )}
            </form>
            )}
        </div>
    );
};

export default DeletePackageModal;
