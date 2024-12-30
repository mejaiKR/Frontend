export const Footer = () => {
  return (
    <footer className="m-4 rounded-lg bg-white shadow dark:bg-gray-800">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="flex w-full justify-between text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          <a
            href="https://forms.gle/4gXMzTzjA2C9wb99A"
            className="hover:underline"
          >
            버그 제보
          </a>
          <a href="https://github.com/orgs/mejaiKR" className="hover:underline">
            github
          </a>
        </span>
      </div>
    </footer>
  );
};
