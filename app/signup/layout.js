import config from "@/config";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: `Create account - ${config.appName}`,
  canonicalUrlRelative: "/auth/signup",
});

export default function Layout({ children }) {
  return <>{children}</>;
} 