import { ArrowsUpDownIcon, QueueListIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { AccountsPure } from './Accounts';
import { config } from '@/config';

export const Header = () => {
  return <header className="flex justify-center sm:justify-between items-center flex-wrap sm:flex-nowrap
    py-4 px-2 xsm:px-4 top-0 
    sticky whitespace-nowrap z-30
    text-lg dark:text-gray-100 dark:bg-slate-900"
  >
    <div className="flex items-center">
      <Link href="/" className="sm:mr-4 font-medium dark:hover:text-blue-300">{config.app.name}</Link>
      <nav className="inline-flex">
        <Link href="/bridge" className="flex items-center mx-3 dark:hover:text-blue-300">
          <ArrowsUpDownIcon className="h-5 w-5 mr-1 align-middle" />
          Bridge
        </Link>
        <Link href="/transfers" className="flex items-center mx-3 dark:hover:text-blue-300">
          <QueueListIcon className="h-5 w-5 mr-1 align-middle" />
          Transfers
        </Link>
      </nav>
    </div>
    <div className="flex items-center pt-4 sm:pt-0">
      {/* <ThemeSwitcher /> */}
      <AccountsPure />
    </div>
  </header>;
};
