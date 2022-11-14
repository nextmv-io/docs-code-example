import { Ast, Node } from "@markdoc/markdoc";

const getLineNumberArray = (rangeArray: string[]) => {
  return rangeArray.reduce((acc: number[], curr: string) => {
    // range specified
    if (curr.includes("-")) {
      const [low, high] = curr.split("-");
      const numberLow = Number(low);
      const numberHigh = Number(high);

      // syntax error in lines attribute, skip this entry
      if (typeof numberLow !== "number" || typeof numberHigh !== "number") {
        return acc;
      } else {
        // walk through range and add numbers to array
        for (let i = numberLow; i <= numberHigh; i++) {
          acc.push(i);
        }
      }
    }
    // assume single number, add to array
    else {
      acc.push(Number(curr));
    }

    return acc;
  }, []);
};

const getTabCountMin = (fileContentsByLine: string[]): number | undefined => {
  return fileContentsByLine.reduce(
    (tabCount: number | undefined, line: string) => {
      const lineTabCount = line.length - line.replace(/\t/g, "").length;
      if (!tabCount) return lineTabCount;
      if (lineTabCount < tabCount) {
        return lineTabCount;
      } else {
        return tabCount;
      }
    },
    undefined
  );
};

const trimTabs = (fileContentsByLine: string[], tabCountMin?: number) => {
  const tabCountRegex = new RegExp(`^[\t]{${tabCountMin}}`, "m");
  return fileContentsByLine.map((line: string) => {
    return line.replace(tabCountRegex, "");
  });
};

type GetCodeSampleParams = {
  fileContents: string;
  lines?: string;
};

export const getCodeSample = ({ fileContents, lines }: GetCodeSampleParams) => {
  // no lines specified, assign all of file
  if (!lines) {
    return fileContents;
  }
  // lines specified, get proper excerpt
  else {
    // convert string range to array of numbers
    const rangeArray = lines.split(", ");
    const lineNumberArray = getLineNumberArray(rangeArray);

    // check to make sure no NaN from incorrect "lines" syntax
    // if found, return undefined
    if (
      lineNumberArray.find(
        (lineNumber: number | string) => typeof lineNumber !== "number"
      )
    ) {
      return;
    }

    // get specified lines of code ref
    const fileContentsByLine = fileContents
      .split("\n")
      .filter((_line, index) => lineNumberArray.includes(index + 1));

    // determine how much spacing to trim
    const tabCountMin = getTabCountMin(fileContentsByLine);

    // something weird happened, escape
    // (should always be at least a zero count for either)
    if (tabCountMin === undefined) return;

    // at least one line for both is flush left, no adjustments needed
    if (tabCountMin === 0) {
      return fileContentsByLine.join("\n");
    }
    // trim lines by min tab count to set code sample flush left;
    // logic is a bit odd here, but check to see which one is zero
    // and then trim the other; assumption is mixed spaces and tabs
    // is in error
    else {
      return trimTabs(fileContentsByLine, tabCountMin).join("\n");
    }
  }
};

type GetCodeRefFilePath = {
  directory: string;
  node: Node;
};
export const getCodeRefFilePath = ({ directory, node }: GetCodeRefFilePath) => {
  const { path } = node.attributes;
  if (!path) return;

  return directory + path.replace("@docs/", "/../../../../");
};

type CreateNewFenceNode = {
  codeSample: string;
  language: string;
};
export const createNewFenceNode = ({
  codeSample,
  language,
}: CreateNewFenceNode) =>
  new Ast.Node("fence", { content: codeSample, language: language });
