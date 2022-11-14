export const ref = {
  render: "CodeRef",
  description: "Import lines of code from a separate file.",
  attributes: {
    path: {
      type: String,
      required: true,
      description: "A path to a file must be specified for the ref block.",
    },
    language: {
      type: String,
      required: true,
      description: "A language must be specified for the ref block.",
    },
    lines: {
      type: String,
      required: false,
      description: "Optional property to specify which lines to parse.",
    },
  },
};
