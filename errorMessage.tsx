const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  if (!errorMessage) return null;

  return <p className="ms-1 mt-1 text-red-600 text-[10px]">{errorMessage}</p>;
};

export default ErrorMessage;
