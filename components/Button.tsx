import Link from "next/link";

/* Button styles measured on the Wix site, hover colours included. */
const variants = {
  rect: "rounded-md bg-blue px-6 py-3 text-base text-white hover:bg-lime hover:text-blue sm:px-7 sm:py-4 sm:text-lg",
  pillBlue: "rounded-full bg-blue px-7 py-3 text-[1.0625rem] text-white hover:bg-blue/90",
  pillWhite: "rounded-full bg-white px-10 py-4 text-base text-black hover:bg-black hover:text-white",
  pillLime: "rounded-full bg-lime px-7 py-3 text-base text-blue hover:bg-blue hover:text-lime",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
};

export default function Button({ href, children, variant = "rect", className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center text-center transition-colors duration-[400ms] ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
