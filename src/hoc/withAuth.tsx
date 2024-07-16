// hoc/withAuth.tsx
import { getSession, useSession } from "next-auth/react";
import { NextPage, NextPageContext } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Session } from "next-auth";

interface WithAuthProps {
  session: Session | null;
}

const withAuth = (WrappedComponent: NextPage) => {
  const ComponentWithAuth: NextPage<WithAuthProps> = ({
    session: initialSession,
  }) => {
    const { data: session = initialSession, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/auth/signin");
      }
    }, [status, router]);

    if (status === "loading") {
      return <p>Loading...</p>;
    }

    if (!session) {
      return <p>You are not signed in</p>;
    }

    return <WrappedComponent />;
  };

  ComponentWithAuth.getInitialProps = async (context: NextPageContext) => {
    const session = await getSession(context);

    if (!session && context.res) {
      context.res.writeHead(302, { Location: "/auth/signin" });
      context.res.end();
      return { session: null };
    }

    let wrappedComponentProps = {};
    if (WrappedComponent.getInitialProps) {
      wrappedComponentProps = await WrappedComponent.getInitialProps(context);
    }

    return { ...wrappedComponentProps, session: session as Session | null };
  };

  return ComponentWithAuth;
};

export default withAuth;
