type ErrorElementPropsType = {
  error: string | null | undefined;
};

export default function ErrorElement({ error }: ErrorElementPropsType) {
  return (
    <>
      <span
        className={`block pl-1.5 text-sm text-red-500 transition-[height] ${error ? 'h-5' : 'h-0'}`}
      >{error}</span>
    </>
  );
}
