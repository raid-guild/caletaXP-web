import React, { useState, useEffect, createContext } from 'react';
import Web3Connect from 'web3connect';
import { w3connect, providerOptions, createWeb3User } from '../utils/Auth';
import { getChainData } from '../utils/Chains';
import ERC20Abi from '../contracts/erc20.json';

export const LoaderContext = createContext(false);
export const Web3ConnectContext = createContext();
export const CurrentUserContext = createContext();

const addresses = {
  main: {
    upToken: '0x089eac7e3180b7995fe218c18440a0d262ae8985',
  },
  kovan: {
    upToken: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
  }
  
};

const Store = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);
  const [web3Connect, setWeb3Connect] = useState(
    new Web3Connect.Core({
      network: getChainData(+process.env.REACT_APP_CHAIN_ID).network, // optional
      providerOptions, // required
      cacheProvider: true,
    }),
  );

  useEffect(() => {



    const initCurrentUser = async () => {
      let user;
      const upAddress = +process.env.REACT_APP_CHAIN_ID === 42 ? addresses.kovan.upToken : addresses.main.upToken;
      try {
        const w3c = await w3connect(web3Connect);
        const [account] = await w3c.web3.eth.getAccounts();
        setWeb3Connect(w3c);
        user = createWeb3User(account);
        
        const contract = new w3c.web3.eth.Contract(ERC20Abi, upAddress);

        const upBalanceInWei = await contract.methods
          .balanceOf(user.username)
          .call();
        const upBalance = w3c.web3.utils.fromWei('' + upBalanceInWei);
        // get Eth Balance
        const ethBalanceInWei = await w3c.web3.eth.getBalance(
          user.username,
        );
        const ethBalance = w3c.web3.utils.fromWei('' + ethBalanceInWei);
        
        setCurrentUser({ ...user, ...{ upBalance, ethBalance } });

      } catch (e) {
        console.error(`Could not log in with web3`);
      }
    };
    if (web3Connect.cachedProvider) {
      initCurrentUser();
    }
  }, [web3Connect]);

  return (
    <LoaderContext.Provider value={[loading, setLoading]}>
      <Web3ConnectContext.Provider value={[web3Connect, setWeb3Connect]}>
        <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
          {children}
        </CurrentUserContext.Provider>
      </Web3ConnectContext.Provider>
    </LoaderContext.Provider>
  );
};

export default Store;
