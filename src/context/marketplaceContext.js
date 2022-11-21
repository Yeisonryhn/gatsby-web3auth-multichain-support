import * as React from "react";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";
import {Web3Auth} from "@web3auth/modal";
import Moralis from "moralis";

const defaultValue = {
  connect: () => { },
  disconnect: () => { },
  changeChain: () => { }
};

const MarketplaceContext = React.createContext(defaultValue);

export const MarketplaceContextProvider = ({ children }) => {
  const { provider, enableWeb3 } = useMoralis();
  const [web3auth, setWeb3auth] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [account, setAccount] = React.useState(null);
  let contract;
  let read_only_contract;
  const RPC_URL = "https://polygon-rpc.com/";
  React.useEffect(() => {
    (async () => {
      if (!web3auth) {
        try {
          console.log("conecntando con web3atuh");
          const web3auth = new Web3Auth({
            clientId: process.env.GATSBY_WEB3AUTH_CLIENT_ID, // Get your Client ID from Web3Auth Dashboard
            chainConfig: {
              chainNamespace: "eip155",
              chainId: Moralis.Chains.POLYGON_MAINNET,
              rpcTarget: RPC_URL
            },
            uiConfig: {
              theme: "dark",
              loginMethodsOrder: ["facebook", "google"],
              defaultLanguage: "es",
            },
          });
          setWeb3auth(web3auth);
          await web3auth.initModal();
        } catch (error) {
          console.error(error);
        }
      } else {

      }
    })();
  }, [web3auth])

  return (
    <MarketplaceContext.Provider
      value={{
        connect: () => { },
        disconnect: () => { },
        changeChain: () => { }
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export default MarketplaceContextProvider;

export const useETHMarketplace = () => {
  return React.useContext(MarketplaceContext);
};
