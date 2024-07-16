import { getSession } from "next-auth/react";
import { NextPage, NextPageContext } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Session } from "next-auth";

interface WithGuestProps {
  session: Session | null;
}

const withGuest = <P extends object>(WrappedComponent: NextPage<P>) => {
  const ComponentWithGuest: NextPage<P & WithGuestProps> = (props) => {
    const { session } = props;
    const router = useRouter();

    useEffect(() => {
      if (session) {
        router.push("/profile");
      }
    }, [session, router]);

    return <WrappedComponent {...props} />;
  };

  ComponentWithGuest.getInitialProps = async (context: NextPageContext) => {
    const session = await getSession(context);

    if (session && context.res) {
      context.res.writeHead(302, { Location: "/profile" });
      context.res.end();
      return {} as P & WithGuestProps; // Ensure the return type matches
    }

    let wrappedComponentProps = {} as P;
    if (WrappedComponent.getInitialProps) {
      wrappedComponentProps = await WrappedComponent.getInitialProps(context) as P;
    }

    return { ...wrappedComponentProps, session: session as Session | null };
  };

  return ComponentWithGuest;
};

export default withGuest;
