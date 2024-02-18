import React, { Suspense } from 'react';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

import Auth from '@/components/auth/components/page';

type HeaderProps = {
  session: Session | null | undefined;
};

const Logistics: React.FC<HeaderProps> = ({ session  }) => {
  return (
    <div className="w-full h-14 flex items-center justify-between bg-white shadow-lg px-4 md:px-8 lg:px-4 py-2.5">
      <Link href="#"><Image width={512} height={128} src={"/images/logo0.webp"} className="h-12 w-auto grayscale sm:h-9 object-fit self-start mr-4 z-10" alt="" /></Link>
      <Suspense fallback={<p>...</p>}>
        <Auth session={session} />
      </Suspense>
    </div>
  );
};

export default Logistics;