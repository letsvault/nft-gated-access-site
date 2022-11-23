import { useAddress, useMetamask, useContract, useClaimNFT, useNetwork, useNetworkMismatch, useLogin, useUser } from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";


export default function Login() {
    const address = useAddress();
    const connectWithMetamask = useMetamask();

    const [, switchNetwork ] = useNetwork();
    const networkMismatch = useNetworkMismatch();

    const editionDropContract = useContract(process.env.CONTRACT_ADDRESS, "edition-drop").contract;

    const { mutate: claimNft, isLoading: isClaiming } =
        useClaimNFT(editionDropContract);

    const login = useLogin();
    const { user } = useUser();

    return (
        <div className={styles.container}>
            {address ? (
                <>
                    <p>Welcome, {address.slice(0,6)}...</p>

                    <button
                        className={styles.mainButton}
                        style={{width: 256}}
                        onClick={() => login}
                    >
                        Sign In
                    </button>

                    <p>
                        For demo purposes, you can claim an NFT from our collection below:
                    </p>

                    <button
                        className={styles.secondaryButton}
                        onClick={() => {
                            if (networkMismatch && switchNetwork) {
                                switchNetwork(ChainId.Polygon);
                                return;
                            }
                            claimNft({
                                quantity: 1,
                                tokenId: 0,
                                to: address,
                            });
                        }}
                    >
                        {!isClaiming ? "Claim an NFT" : "Claiming..."}
                    </button>
                </>
            ) : (
                <>
                    <button
                        className={styles.mainButton}
                        style={{width: 'fit-content', paddingRight: 16, paddingLeft: 16}}
                        onClick={()=> connectWithMetamask()}
                    >
                        Connect Wallet
                    </button>
                </>
            )}
        </div>
    );
}