import { Suspense } from "react";
import Loading from "../loading";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loading></Loading>}>{children}</Suspense>;
}
