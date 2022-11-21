import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { MarketplaceContextProvider } from "/src/context/marketplaceContext";
import Header from "./header";
import "./layout.css";

const Layout = ({ children }) => {
  //const [web3Auth, setWeb3Auth] = React.useEffect(null);
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

 /*  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src =
        "https://unpkg.com/@web3auth/web3auth@latest/dist/web3auth.umd.min.js";
      script.id = "web3auth";
      document.body.appendChild(script);
      script.onload = event => {
        setWeb3Auth(true);
      };
    }
  }, []); */

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: `var(--size-content)`,
          padding: `var(--size-gutter)`,
        }}
      >
        <MarketplaceContextProvider>
          <main>{children}</main>
        </MarketplaceContextProvider>
        <footer
          style={{
            marginTop: `var(--space-5)`,
            fontSize: `var(--font-sm)`,
          }}
        >
          © {new Date().getFullYear()} &middot; Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
