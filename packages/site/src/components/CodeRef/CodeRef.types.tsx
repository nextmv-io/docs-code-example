type LanguageSyntaxHighlight = "bash" | "go" | "json";

export type CodeRefProps = {
  children: React.ReactNode;
  language: LanguageSyntaxHighlight;
};
