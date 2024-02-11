import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

import { combineClassNames } from '@/utils';

type ExternalLinkProps = { showArrowIcon?: boolean } & Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'target' | 'blank'
>;

export const ExternalLink = ({ showArrowIcon, ...props }: ExternalLinkProps) => {
  return <a {...props} target="_blank" rel="noreferrer"
    className={`${combineClassNames('flex items-center dark:text-violet-300 dark:hover:text-violet-400', props.className)}`}
  >
    {props.children}
    {(showArrowIcon ?? true) && <ArrowUpRightIcon className="inline h-4 w-4 ml-1 -mb-0.5" />}
  </a>;
};
