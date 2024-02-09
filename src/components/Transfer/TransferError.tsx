interface TransferErrorProps {
  message: string;
}

export const TransferError = (props: TransferErrorProps) => {
  return <div className="mt-4 -mb-4 -mx-4 pt-4 pl-4 pb-2 rounded-b-xl overflow-hidden
  dark:text-red-100 dark:bg-red-900">
    <h3 className="text-lg font-medium mb-2">Error, please try again</h3>
    {props.message}
  </div >;
};
