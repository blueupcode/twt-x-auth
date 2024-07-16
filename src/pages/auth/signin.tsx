// pages/auth/signin.tsx
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import withGuest from "../../hoc/withGuest";

const SignIn: NextPage = () => {
  return (
    <div>
      <h1>Sign in</h1>
      <div>
        <button onClick={() => signIn("twitter")}>
          Sign in with Twitter
        </button>
      </div>
    </div>
  );
};

export default withGuest(SignIn);
