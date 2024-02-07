import { ArrowsRightLeftIcon, QueueListIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { config } from '@/config';

export const Header = () => {
  return <header className="flex p-4 justify-between items-center sticky whitespace-nowrap z-30 text-lg dark:bg-slate-900">
    <Link href="/" className="font-medium dark:text-gray-100">{config.appName}</Link>
    <nav className="inline-flex ">
      <Link href="/bridge" className="flex items-center mx-5 dark:text-gray-100">
        <ArrowsRightLeftIcon className="h-5 w-5 mr-2 align-middle dark:text-gray-100" />
        Bridge
      </Link>
      <Link href="/transfers" className="flex items-center mx-5 dark:text-gray-100">
        <QueueListIcon className="h-5 w-5 mr-2 align-middle dark:text-gray-100" />
        Transfers
      </Link>
      <Link href="/tokens" className="flex items-center mx-5 dark:text-gray-100">
        <PlusCircleIcon className="h-5 w-5 mr-2 align-middle dark:text-gray-100" />
        Listed Tokens
      </Link>
    </nav>
    <div className="flex dark:text-gray-100">
      Account
    </div>
  </header>;
};
