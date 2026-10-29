export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full px-5 sm:px-10 lg:px-[3.75rem] ${className}`}>
      {children}
    </div>
  );
}
