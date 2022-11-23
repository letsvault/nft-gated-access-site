import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

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

  console.log(key);

export const { ThirdWebAuthHandler, getUser } = ThirdwebAuth({
    privateKey: key,
    domain: "example.org",
});