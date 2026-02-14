import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/firebase/auth";
import { Activity, User } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };
  return (
    <nav className="flex justify-between items-center py-6 px-8 bg-transparent">
      {/* Logo */}
      <div className="flex items-center gap-2 text-[#006E90] font-bold text-2xl">
        <Link href="/" className="flex gap-2">
          <Activity className="w-8 h-8" />
          <span>Lung Sound Learn</span>
        </Link>
      </div>
      {/* Menu Links */}
      <div className="flex items-center gap-6 text-[#008CC9] text-lg font-medium">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="#" className="hover:underline">
          About us
        </Link>
        <div className="flex items-center gap-4 cursor-pointer">
          <span>{user ? user.displayName : "User"}</span>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-blue-400">
            {/* click to logout for testing */}
            <button onClick={handleLogout}>
              <User size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
