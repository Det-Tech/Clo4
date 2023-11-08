// third party
import Web3 from 'web3';

// next
import { useSession } from 'next-auth/react';

import Clo4_ABI from './Clo4.json';
import { useCallback, useEffect, useState } from 'react';

const web3 = new Web3('https://eth-goerli.g.alchemy.com/v2/KqDagOiXKFQ8T_QzPNpKBk1Yn-3Zgtgl');
const musdContract = new web3.eth.Contract(Clo4_ABI as any[], '0xe2B4A37D165Aec2a0626F34EAc72cD09B6A31F36');

export const useCurrentBalance = () => {
  const { data: session } = useSession();
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);

  const refresh = useCallback(() => {
    if (session && web3 && musdContract) {
      setLoading(true);
      musdContract.methods
        .balanceOf(session.token.walletAddress)
        .call({ from: web3.utils.toChecksumAddress('0x000000000000000000000000000000000000abcd') })
        .then((res: string) => {
          setBalance(Number(web3.utils.fromWei(res, 'ether')));
          setLoading(false);
        })
        .catch((err: any) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [session]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { balance, isLoading, refresh };
};
