import Link from "next/link";

const LockModule: React.FC = () => {
  return (
    <div className="flex flex-col bg-white min-h-screen items-center justify-center content-center">
      <div className="text-center text-black">
        <div className="mb-4 text-lg font-semibold">
          คุณยังไม่ปลดล็อค Module นี้
        </div>
      </div>
      <Link href="/">
        <button className="rounded-lg bg-[#008CC9] px-4 py-2 text-white hover:bg-[#007bb5]">
          กลับสู่หน้าหลัก
        </button>
      </Link>
    </div>
  );
};

export default LockModule;
