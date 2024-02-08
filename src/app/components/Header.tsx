import { ArrowsUpDownIcon, QueueListIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { ThemeSwitcher } from './ThemeSwitcher';
import { config } from '@/config';

export const Header = () => {
  return <header className="grid grid-cols-3 content-center p-4 sticky whitespace-nowrap z-30 text-lg dark:bg-slate-900">
    <Link href="/" className="justify-self-start font-medium dark:text-gray-100">{config.appName}</Link>
    <nav className="inline-flex justify-self-center">
      <Link href="/bridge" className="flex items-center mx-5 dark:text-gray-100">
        <ArrowsUpDownIcon className="h-5 w-5 mr-2 align-middle dark:text-gray-100" />
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
    <div className="inline-flex justify-self-end dark:text-gray-100">
      <ThemeSwitcher />
    </div>
  </header>;
};
