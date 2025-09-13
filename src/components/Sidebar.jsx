import { WiCloud } from "react-icons/wi";
import { MdHome, MdDateRange } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

export default function Sidebar() {
  return (
    <div
      className="fixed left-0 top-0 h-[680px] w-20 flex flex-col shadow-2xl z-10 rounded-3xl mt-5"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)"
      }}>

      <nav className="flex flex-col items-center py-8 h-full">
        <div
          className="w-[40px] h-[40px] flex items-center justify-center mb-10"
          style={{
            backgroundColor: "white",
            borderRadius: "50%",
          }}>
          <button className="text-[32px] text-black font-bold">
            <WiCloud />
          </button>
        </div>

        <div className="flex flex-col gap-10">
          <button className="text-[24px] text-white hover:text-black transition-colors p-2 rounded-lg hover:bg-white">
            <MdHome />
          </button>
          <button className="text-[24px] text-white hover:text-black transition-colors p-2 rounded-lg hover:bg-white">
            <FaMapMarkedAlt />
          </button>
        </div>

        <div className="mt-auto mb-8">
          <button className="text-[24px] text-white hover:text-black transition-colors p-2 rounded-lg hover:bg-white">
            <FiSettings />
          </button>
        </div>
      </nav>
    </div>
  );
}
