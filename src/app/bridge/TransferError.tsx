interface TransferErrorProps {
  message: string;
}

export const TransferError = (props: TransferErrorProps) => {
  return <div className="w-full max-w-xl p-4 my-4 rounded-xl overflow-hidden
  dark:text-red-100 dark:bg-red-900">
    <h3 className="text-xl font-medium mb-2">Error</h3>
    {props.message}
  </div >;
};
