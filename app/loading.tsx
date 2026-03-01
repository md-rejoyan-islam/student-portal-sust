import { BaseLoading } from "@/components/loading";

export default function Loading() {
  return (
    <BaseLoading
      fullScreen
      showLogo
      showFooter
      title={"Loading Student Portal"}
      subtitle={"Preparing your learning experience..."}
    />
  );
}
