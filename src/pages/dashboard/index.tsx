import Layout from "@/components/Layout/layout";
import { Button } from "@/components/utils";
import { useDisclosure, useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const DashboardMain = dynamic(
  () => import("@/components/dashboard/DashboardMain"),
  {
    ssr: false, // Disable server-side rendering
  }
);
import { useEffect, useState } from "react";

export default function Dashboard() {
  const toast = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout
      page="Dashboard"
      secondaryElement={
        <Button
          type="fit"
          text="Import ADP"
          onClick={() => {
            onOpen();
          }}
          className="font-semibold"
        />
      }
    >
      <DashboardMain onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
    </Layout>
  );
}
