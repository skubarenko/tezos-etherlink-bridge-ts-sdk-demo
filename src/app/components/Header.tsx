import { ArrowsUpDownIcon, QueueListIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { config } from '@/config';

export const Header = () => {
  return <header className="grid grid-cols-3 content-center p-4 sticky whitespace-nowrap z-30 text-lg dark:bg-slate-900">
    <Link href="/" className="justify-self-start font-medium dark:text-gray-100 dark:hover:text-blue-300">{config.appName}</Link>
    <nav className="inline-flex justify-self-center">
      <Link href="/bridge" className="flex items-center mx-5 dark:text-gray-100 dark:hover:text-blue-300">
        <ArrowsUpDownIcon className="h-5 w-5 mr-2 align-middle" />
        Bridge
      </Link>
      <Link href="/transfers" className="flex items-center mx-5 dark:text-gray-100 dark:hover:text-blue-300">
        <QueueListIcon className="h-5 w-5 mr-2 align-middle" />
        Transfers
      </Link>
      <Link href="/tokens" className="flex items-center mx-5 dark:text-gray-100 dark:hover:text-blue-300">
        <PlusCircleIcon className="h-5 w-5 mr-2 align-middle" />
        Listed Tokens
      </Link>
    </nav>
    <div className="inline-flex justify-self-end dark:text-gray-100">
      {/* <ThemeSwitcher /> */}
    </div>
  </header>;
};
