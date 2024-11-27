import React from "react";

export const Footer = () => {
  return (
    <footer className="m-4 rounded-lg bg-white shadow dark:bg-gray-800">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          <a href="https://github.com/orgs/mejaiKR" className="hover:underline">
            github
          </a>
        </span>
      </div>
    </footer>
  );
};
