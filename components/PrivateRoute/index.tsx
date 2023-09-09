import { useAuthStore } from "@/stores/authStore";
import { JWT_CREDS } from "@/utils/constants";
import { getCookie } from "@/utils/cookies";
import { redirect } from "next/navigation";

const withAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const me = useAuthStore((state) => state.me);

    // Simulate authentication check
    const isAuthenticated = me?.id || getCookie(JWT_CREDS.ACCESS_TOKEN);

    if (isAuthenticated) {
      redirect(`/${me?.username}`);
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
