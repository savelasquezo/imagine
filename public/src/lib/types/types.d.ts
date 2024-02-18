import { Session } from 'next-auth';

export type SessionInfo = {
    session: Session | null | undefined;
};

export type ModalFunction = {
    closeModal: () => void;
};

export type ForgotPasswordConfirmProps = {
    updateForgotPasswordModalState: (value: boolean) => void;
};

export type CarrierData = {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    vehicle_type: string;
    license: string
}

export type ClientData = {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    company: string;
    nit: string
}

export type PackageData = {
    id: number;
    code: string;
    weight: number;
    height: number;
    width: number;
    depth: number;
    source: string;
    address: string;
    state: string;
    date_joined: string;
    date_delivery: string;
    is_paid: boolean;
    carrier: CarrierData | null;
    client: ClientData;
};

export type SessionModal = SessionInfo & ModalFunction;
export type ForgotPasswordConfirmModal = ForgotPasswordConfirmProps & ModalFunction;
