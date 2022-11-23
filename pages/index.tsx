import React from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useLogout } from "@thirdweb-dev/react";
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { getUser } from "../auth.config";
import checkBalance from "../util/checkBalance";
import styles from "../styles/Home.module.css";

export default function Home() {
  const logout = useLogout();

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Restricted University Access Page</h1>
      <p className={styles.explain}>Thanks for being a member of our alumni community!</p>
    
      <button
        className={styles.mainButton}
        onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export async function getServerSideProps(context: { req: any; }) {
  const user = await getUser(context.req);

  if (!user) {
    console.log({user})
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    };
  }


  const client = new SecretManagerServiceClient({
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });
  const name = 'projects/204118709939/secrets/University/versions/latest';


  async function getSecretVersion() {
    const [version] = await client.accessSecretVersion({
      name: name,
    });

    const payload = version.payload?.data?.toString();

    return payload;
  };

  const key = await getSecretVersion();

  if (!key) {
    throw new Error("You need to add a PRIVATE_KEY environment variable.")
  }

  const sdk = ThirdwebSDK.fromPrivateKey(
    key,
    "polygon"
  );

  const hasNft = await checkBalance(sdk, user.address);

  if (!hasNft) {
  console.log("User", user.address, "doesn't have NFT! Redirecting...")
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    };
  }

  return {
    props: {},
  }

}