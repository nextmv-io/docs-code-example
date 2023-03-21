# Example docs setup

An example docs site using Yarn Workspaces and powered by Next.js and Markdoc that renders inline code samples using a custom Markdoc component that references real, testable code from a separate workspace.

It turns markdown like this:

```
Leave out the lines attribute to display the entire block:

{% ref path="@docs/code/go/sdk/example.go" label="Go" language="go" /%}

Specify a range of lines:

{% ref path="@docs/code/go/sdk/example.go" label="Go" language="go" lines="3-7" /%}

Specify one line:

{% ref path="@docs/code/go/sdk/example.go" label="Go" language="go" lines="2" /%}

Specify scattered lines:

{% ref path="@docs/code/go/sdk/example.go" label="Go" language="go" lines="1-2, 8-9" /%}
```

Into this:

![Screenshot of linked code files rendered as syntax-highlighted code snippets.](https://uploads-ssl.webflow.com/60dee0fad10d14c8ab66dd74/6419ccfaf8ff0222b43c68f7_Screen%20Shot%202022-08-23%20at%2010.18.24%20AM.png)

See the blog post [Building a docs site with Next.js and Markdoc][blog-post] for more context.

## Quick start

To run the example docs site, first clone the repository and then install the dependencies:

```bash
git clone git@github.com:nextmv-io/docs-code-example.git
cd docs-code-example
yarn install
```

Run the site with:

```bash
yarn dev
```

Visit `http://localhost:3000` in your browser to see the example Docs site with code snippets.

[blog-post]: https://www.nextmv.io/blog/building-a-docs-site-with-next-js-and-markdoc
