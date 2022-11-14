import fs from "fs";
import path from "path";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import Layout from "../components/Layout";
import { GetStaticPaths } from "next";
import { parseMarkdocFrontmatter } from "../utils/markdown";
import CodeRef from "../components/CodeRef";
import { ref as schemaRef } from "../schema/Ref.markdoc";
import {
  createNewFenceNode,
  getCodeRefFilePath,
  getCodeSample,
} from "../utils/codeRef";

type GetStaticPropsParams = {
  params: { slug: string[] };
};

type PageProps = {
  frontmatter: {
    title: string;
  };
  content: any;
  slug: string[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const getAllFiles = (directoryPath: string, fileArray: string[]) => {
    const files = fs.readdirSync(directoryPath);

    files.forEach((file) => {
      if (fs.statSync(`${directoryPath}/${file}`).isDirectory()) {
        fileArray = getAllFiles(`${directoryPath}/${file}`, fileArray);
      } else {
        fileArray.push(path.join(directoryPath, "/", file));
      }
    });

    return fileArray;
  };

  const paths = getAllFiles(path.join("content"), []).map((filename) => {
    const slug = filename
      .replace(/^content\//, "") // remove non-user-facing content directory
      .replace(".md", "") // remove file extension
      .split("/");

    return {
      params: {
        slug: slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { slug },
}: GetStaticPropsParams) => {
  if (!slug) {
    // no slug, return 404
    return {
      notFound: true,
    };
  }

  const getFileContents = (filePath: string) => {
    return fs.readFileSync(filePath, "utf-8");
  };

  // set up empty string to hold file contents
  let markdownWithMeta = "";

  const filePath = path.join("content", `${slug.join("/")}.md`);

  if (fs.existsSync(filePath)) {
    markdownWithMeta = getFileContents(filePath);
  } else {
    // some paths are directories, look for index file
    const updatedFilePath = filePath.replace(".md", "/index.md");
    try {
      if (fs.existsSync(updatedFilePath)) {
        markdownWithMeta = getFileContents(updatedFilePath);
      }
    } catch {
      // no file can be found, return 404
      return {
        notFound: true,
      };
    }
  }

  // define any custom markdown tags
  const config = {
    tags: {
      ref: schemaRef,
    },
  };

  // parse markdown into Abstract Syntax Tree (ast)
  // https://en.wikipedia.org/wiki/Abstract_syntax_tree
  const ast = Markdoc.parse(markdownWithMeta);

  // fill in any {% ref /%} blocks
  ast.children.forEach((node, index, astChildren) => {
    // look for standalone {% ref %} blocks
    if (node.tag === "ref") {
      const { language, lines } = node.attributes;

      const filePath = getCodeRefFilePath({ node, directory: __dirname });
      if (!filePath) return;

      if (fs.existsSync(filePath)) {
        const fileContents = fs.readFileSync(filePath, "utf-8");
        const codeSample = getCodeSample({ fileContents, lines });
        if (!codeSample) return;

        // create new node for code sample and add as child node
        // ref block has no children, it's a self-closing tag
        const codeNode = createNewFenceNode({
          codeSample,
          language,
        });

        node.children.push(codeNode);
        astChildren[index] = node;
      }
    }
  });

  // parse ast into render-ready content and frontmatter data
  const content = Markdoc.transform(ast, config);
  const frontmatter = parseMarkdocFrontmatter(ast);

  return {
    props: {
      frontmatter,
      slug,
      // workaround for a data serialization error message
      // https://github.com/vercel/next.js/issues/11993#issuecomment-617375501
      content: JSON.parse(JSON.stringify(content)),
    },
  };
};

const Page = ({ content, frontmatter, slug }: PageProps) => {
  const { title } = frontmatter;

  // setup custom React components to map to custom Markdoc tags
  const components = {
    CodeRef,
  };

  const renderedContent =
    !!content && Markdoc.renderers.react(content, React, { components });

  return <Layout {...{ title }}>{renderedContent && renderedContent}</Layout>;
};

export default Page;
