import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export default async function checkBalance(sdk: ThirdwebSDK, userAddress: any) {
  const editionDrop = await sdk.getContract(
    process.env.CONTRACT_ADDRESS as string, "edition-drop");

  const balance = await editionDrop.balanceOf(userAddress, 1); // 1 = token ID

  // gt = greater than
  return balance.gt(0);
}

