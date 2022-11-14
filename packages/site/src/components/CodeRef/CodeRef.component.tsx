import React, { useRef } from "react";
import "prismjs";
import "prismjs/components/prism-go";
import "prismjs/themes/prism-tomorrow.min.css";

import Prism from "react-prism";

import { CodeRefProps } from "./CodeRef.types";

const CodeRef = ({ children, language }: CodeRefProps) => {
  const codePreviewRef = useRef<any>(null);

  return (
    <div className="mt-4 pt-5 pb-6 px-6 rounded-lg bg-[#1f2937]">
      <Prism
        key={language}
        component="pre"
        className={`language-${language}`}
        ref={codePreviewRef}
      >
        {children}
      </Prism>
    </div>
  );
};

export default CodeRef;
