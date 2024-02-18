import React from 'react';
import { useSession } from 'next-auth/react';

import Logistics from '@/components/logistics/components/page';

export default function Page() {
  const { data: session } = useSession();
  return (
    <header>
      <Logistics session={session} />
    </header>
  );
}
