import { Header } from "@/components/header";

type Props = {
  children: React.ReactNode;
};

const AssessmentLayout = ({ children }: Props) => {
  return (
    <div className="m-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex flex-col max-w-[1380px] px-7 w-full mx-auto overflow-hidden mt-[100px] mb-10">
        {children}
      </main>
    </div>
  );
};

export default AssessmentLayout;
