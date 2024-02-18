import React from 'react';
import { SessionModal } from '@/lib/types/types';


const UpdatePackageModal: React.FC<SessionModal & { selectedPackageId: string | null }> = ({ closeModal, session, selectedPackageId }) => {

    return (
        <div className='w-full h-full'>
            <p> El valor {selectedPackageId}</p>
        </div>
    );
};

export default UpdatePackageModal;
