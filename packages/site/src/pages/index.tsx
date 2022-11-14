import Layout from "../components/Layout";
import Link from "next/link";

const Home = () => {
  return (
    <Layout title="Home">
      <article>
        <p>
          View the{" "}
          <Link href="/code-examples">
            <a>Code Examples</a>
          </Link>{" "}
          page to see examples of how the custom <code>ref</code> tag is used to
          reference external files for inline content display.
        </p>
      </article>
    </Layout>
  );
};

export default Home;
