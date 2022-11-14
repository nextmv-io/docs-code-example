import yaml from "js-yaml";

export const parseMarkdocFrontmatter = (ast: any) => {
  return ast.attributes.frontmatter
    ? yaml.load(ast.attributes.frontmatter)
    : {};
};
