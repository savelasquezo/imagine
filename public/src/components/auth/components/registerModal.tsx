import React, { useState } from "react";
import { NextResponse } from 'next/server';
import { validatePassword } from "@/utils/passwordValidation";

import CircleLoader from 'react-spinners/CircleLoader';

import {AiOutlineUser} from 'react-icons/ai'
import {CiMail} from 'react-icons/ci'
import {FiLock} from 'react-icons/fi'


import { ModalFunction } from '@/lib/types/types'
  
const RegisterModal: React.FC<ModalFunction> = ({ closeModal }) => {
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
      });

    const {username, email, password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const onSubmit = async (e: React.FormEvent) => {
        const re_password = password;
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');
    
        await new Promise(resolve => setTimeout(resolve, 1000));
        const usernamePattern = /^[a-zA-Z0-9]+$/;
        if (!usernamePattern.test(username)) {
          setError('¡Email Invalido! Unicamente Alfanumericos');
          setLoading(false);
          return;
        } else {
          setError('');
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
          setError('¡Email Invalido! example@domain.com');
          setLoading(false);
          return;
        } else {
          setError('');
        }

        const passwordValidationResult = validatePassword(password);
        if (passwordValidationResult) {
          setError(passwordValidationResult);
          setLoading(false);
          return;
        } else {
          setError('');
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/app/auth/users/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              email,
              password,
              re_password
            }),
          });
      
          const data = await res.json();
          if (!res.ok) {
            setLoading(false);
            return setError("¡Email no Encontrado! Intentalo Nuevamente ");
          }

          setSuccess("¡Enviamos un Correo Electronio de Verificacion! ");
          setRegistrationSuccess(true);

        } catch (error) {
          return NextResponse.json({ error: 'There was an error wtext-gray-200ith the network request' });

        } finally  {
          setLoading(false);
        }
        
    };

    return (
        <div>
            <form onSubmit={onSubmit} className="flex flex-col gap-y-4 p-2">
                <div className="relative h-8 md:h-10 w-full flex items-center min-w-[200px]">
                    <div className="absolute text-gray-500 text-lg top-2/4 left-4 grid h-5 w-5 -translate-y-2/4 items-center"><AiOutlineUser/></div>
                    <input className="h-8 md:h-12 w-full indent-8 text-gray-800 rounded-lg border border-gray-700 bg-transparent px-3 py-2 !pr-9 text-sm outline outline-0 transition-all focus:outline-0 disabled:border-0"
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => onChange(e)}
                        required
                        placeholder="Usuario"
                        readOnly={registrationSuccess}
                    />
                </div>
                <div className="relative h-8 md:h-10 w-full flex items-center min-w-[200px]">
                    <div className="absolute text-gray-400 text-lg top-2/4 left-4 grid h-5 w-5 -translate-y-2/4 items-center"><CiMail/></div>
                    <input className="h-8 md:h-12 w-full indent-8 text-gray-800 rounded-lg border border-gray-700 bg-transparent px-3 py-2 !pr-9 text-sm outline outline-0 transition-all focus:outline-0 disabled:border-0"
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                        placeholder="Email"
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                        readOnly={registrationSuccess}
                    />
                </div>
                 <div className="relative h-8 md:h-10 w-full flex items-center min-w-[200px]">
                    <div className="absolute text-gray-500 text-lg top-2/4 left-4 grid h-5 w-5 -translate-y-2/4 items-center"><FiLock/></div>
                    <input className="h-8 md:h-12 w-full indent-8 text-gray-800 rounded-lg border border-gray-700 focus:border-gray-700 bg-transparent px-3 py-2 !pr-9 text-sm outline-0 ring-0 focus:!ring-0 transition-all focus:outline-0 disabled:border-0"
                        type="password" 
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                        required
                        placeholder="Contraseña"
                        readOnly={registrationSuccess}
                    />
                </div>
                {registrationSuccess ? (
                  <p onClick={closeModal} className="h-10 bg-green-500 text-white font-semibold rounded-md py-2 px-4 w-full text-sm text-center uppercase">
                    Verificar email
                  </p>
                ) : (
                  loading ? (
                    <button type="button" className="h-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full text-center flex items-center justify-center">
                      <CircleLoader loading={loading} size={25} color="#1c1d1f" />
                    </button>
                  ) : (
                    <button type="submit" className="h-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full text-center">
                      Inscribirse
                    </button>
                  )
                )}
            </form>
            { success && (<div className="text-lime-700 text-xs mt-0 md:mt-2">{success}</div>)}
            { error && (<div className="text-red-400 text-xs mt-0 md:mt-2">{error}</div>)}
            { !error && !success && (<div className="text-gray-800 text-xs mt-0 md:mt-2 h-6">¿Necesitas Ayuda? savelasquezo@gmail.com</div>)}
        </div>
    );
};

export default RegisterModal