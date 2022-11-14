import React from "react";
import Head from "next/head";
import Link from "next/link";
import { LayoutProps } from "./Layout.types";

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <Head>
        <title>{title}</title>
      </Head>

      <header
        className="
          w-[90%]
          max-w-[980px]
          h-[60px]
          flex
          justify-between
          items-baseline
          py-4
          border-b
          border-solid
          border-gray-200
        "
      >
        <h1 className="font-sans text-lg font-bold">
          <Link href="/">
            <a className="!text-inherit">Docs</a>
          </Link>
        </h1>

        <nav>
          <ul className="flex flex-row">
            <li className="ml-5 shrink-0">
              <Link href="/about">
                <a className="">About</a>
              </Link>
            </li>
            <li className="ml-5 shrink-0">
              <Link href="/code-examples">
                <a className="">Code Examples</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main
        className="
          main
          w-[90%]
          max-w-[980px]
          grow
          prose
          pt-6
        "
      >
        {title && <h1>{title}</h1>}

        {children}
      </main>

      <footer
        className="
          w-[90%]
          max-w-[980px]
          h-[120px]
          pt-6
          pb-7
          relative
          bg-white
        "
      >
        <p className="text-sm text-gray-600">
          Docs site demo with custom Markdoc tag to display code snippets.
        </p>
        <p className="text-sm text-gray-600">
          <a href="https://nextmv.io/" target="_blank" rel="noreferrer">
            <strong>Read the blog post</strong>
          </a>{" "}
          for more context.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          By{" "}
          <a href="https://nextmv.io/" target="_blank" rel="noreferrer">
            Nextmv
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
