import { useAuthStore } from "@/stores/authStore";
import { JWT_CREDS } from "@/utils/constants";
import { getCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const me = useAuthStore((state) => state.me);

    // Simulate authentication check
    const isAuthenticated = me?.id || getCookie(JWT_CREDS.ACCESS_TOKEN);

    // Redirect to the dashboard if the user is already authenticated
    useEffect(() => {
      if (isAuthenticated) {
        router.replace(`/${me?.username}`);
      }
    }, [isAuthenticated, router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
