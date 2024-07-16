import { signOut, useSession } from "next-auth/react";
import { NextPage } from "next";
import withAuth from "@/hoc/withAuth";

const Profile: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Profile</h1>
      <p>
        Signed in as {session?.user?.name} ({session?.user?.username})
      </p>
      <p>User ID: {session?.user?.id}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default withAuth(Profile);
