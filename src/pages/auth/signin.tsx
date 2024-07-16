import { NextPage } from "next";
import { getProviders, signIn, LiteralUnion, ClientSafeProvider } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import withGuest from "@/hoc/withGuest";

type SignInProps = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
};

const SignIn: NextPage<SignInProps> = ({ providers }) => {
  return (
    <div>
      <h1>Sign in</h1>
      {providers && Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      ))}
    </div>
  );
};

SignIn.getInitialProps = async (context) => {
  const providers = await getProviders();
  return { providers };
};

export default withGuest(SignIn);
