'use client';

import dotenv from 'dotenv';
dotenv.config();

import React from 'react';
import { SessionProvider } from 'next-auth/react';

import Header from '@/components/header/index';

export default function Home() {
  return (
    <SessionProvider >
      <main className='w-full h-full'>
        <Header/>
      </main>
    </SessionProvider>
  );
}
