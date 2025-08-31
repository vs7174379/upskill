import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Github, GitBranch, MessageCircle } from "lucide-react";

export default function SocialIcons() {
  const socials = [
    { icon: Facebook, base: "text-[#0b16f1]", hover: "hover:text-blue-500 hover:shadow-[0_0_15px_#0b16f1]" },
    { icon: Twitter, base: "text-[#cbc3c3]", hover: "hover:text-gray-400 hover:shadow-[0_0_15px_#cbc3c3]" },
    { icon: Linkedin, base: "text-[#1e17ea]", hover: "hover:text-blue-600 hover:shadow-[0_0_15px_#1e17ea]" },
    { icon: Github, base: "text-[#c2baba]", hover: "hover:text-gray-400 hover:shadow-[0_0_15px_#c2baba]" },
    { icon: GitBranch, base: "text-[#e01d1d]", hover: "hover:text-red-500 hover:shadow-[0_0_15px_#e01d1d]" },
    { icon: MessageCircle, base: "text-[#0fc865]", hover: "hover:text-green-500 hover:shadow-[0_0_15px_#0fc865]" }
  ];

  return (
    <div className="flex items-center gap-4 mt-5 ml-1 mb-2 max-md:mt-4">
      {socials.map(({ icon: Icon, base, hover }, i) => (
        <Link
          key={i}
          to=""
          className={`group flex items-center justify-center w-11 h-11 rounded-full 
                      bg-white/5 backdrop-blur-md border border-white/10 shadow-md
                      transition-all duration-300 transform hover:scale-110 ${base} ${hover}`}
        >
          <Icon size={22} strokeWidth={2} />
        </Link>
      ))}
    </div>
  );
}
