import React, { useState, useEffect, ChangeEvent } from "react";
import { NextResponse } from 'next/server';
import CircleLoader from 'react-spinners/CircleLoader';
import { SessionModal } from '@/lib/types/types';

const DeletePackageModal: React.FC<SessionModal & { selectedPackageId: string | null }> = ({ closeModal, session, selectedPackageId }) => {
    
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const onSubmit = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/app/core/send-message/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${session?.user?.accessToken}`,
                },
                body: JSON.stringify({
                    id: selectedPackageId,
                }),
            });
            const data = res.headers.get('content-type')?.includes('application/json') ? await res.json() : {};
            if (!data.error) {
                setRegistrationSuccess(true);
            }
        } catch (error) {
            return NextResponse.json({ error: 'There was an error with the network request' });
        }
        setLoading(false);
    };

    return (
        <div className='w-full h-full bg-red-400'>
            <p> El valorsss {selectedPackageId}</p>
            {loading ? (
            <button type="button" className="h-10 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md py-2 px-4 w-full text-center flex items-center justify-center">
                <CircleLoader loading={loading} size={25} color="#1c1d1f" />
            </button>
            ) : (
            <button type="submit" className="h-10 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md py-2 px-4 w-full text-center z-50">
                <p>Eliminar</p>           
            </button>
            )}
        </div>
    );
};

export default DeletePackageModal;
