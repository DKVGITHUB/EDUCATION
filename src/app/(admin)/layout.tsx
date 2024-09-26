import Footer from "@/components/footer";
import { Header } from "@/components/header";
import { isAdministrator } from "@/lib/admin";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const { userId } = auth(); // Get the userId from the auth function

  // If the user is not a mentor, redirect to the homepage
  if (!isAdministrator(userId)) {
    return redirect("/");
  }
  return (
    <div className="m-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex flex-col max-w-[1380px] px-7 w-full mx-auto overflow-hidden mt-[100px] mb-10">
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default AdminLayout;
