import { Suspense } from "react";
import CenteredLoader from "~/components/loaders/centered-loader";

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<CenteredLoader />}>{children}</Suspense>
);

export default SuspenseWrapper;
