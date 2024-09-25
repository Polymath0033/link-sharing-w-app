import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex fixed top-0 left-0 w-full h-screen overflow-hidden items-center justify-center flex-col gap-2">
      <h2 className="text-5xl font-bold text-red">404</h2>
      <p className="text-xl font-semibold text-center">
        This page does not exist
      </p>
      <Link
        href="/"
        className="flex gap-2  justify-center items-center py-[11px] text-heading-s text-white px-[27px]  w-fit rounded-lg bg-purple hover:bg-purple-hover hover:shadow-active-selection"
      >
        Return Home
      </Link>
    </div>
  );
}
