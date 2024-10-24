import {
  Zap,
  Monitor,
  Airplay,
  MessageCircleQuestion,
  Mails,
  Headset,
  ChartNetwork,
  Library,
} from "lucide-react";
import { Navbar } from "../ui/navbar";

const menu = [
  {
    name: "خدماتنا",
    href: "/services",
    icon: <Zap className="h-4 w-4 ml-1" />,
    subMenu: [
      {
        name: "خدمة الإعراب",
        href: "/services/parsing",
        icon: <Monitor className="h-4  w-4 ml-1" />,
      },
      {
        name: "خدمة التشكيل",
        href: "/services/formation",
        icon: <ChartNetwork className="h-4  w-4 ml-1" />,
      },
      {
        name: "خدمة التدقيق اللغوي",
        href: "/services/proof-reading",
        icon: <ChartNetwork className="h-4  w-4 ml-1" />,
      },
      {
        name: "خدمة توليد نصوص",
        href: "/services/text-generation",
        icon: <Headset className="h-4  w-4 ml-1" />,
        subItems: [
          {
            name: "نصوص تسويقية",
            href: "/services/text-generation/marketing-texts",
            icon: <MessageCircleQuestion className="h-4  w-4 ml-1" />,
          },
          {
            name: "رسائل بريد الكتروني احترافية",
            href: "/services/text-generation/professional-emails",
            icon: <Mails className="h-4  w-4 ml-1" />,
          },
          {
            name: "قصص الأمثال العربية للأطفال",
            href: "/services/text-generation/children-stories",
            icon: <Airplay className="h-4  w-4 ml-1" />,
          },
        ],
      },
    ],
  },
  {
    name: "من نحن",
    href: "/about-us",
    icon: <Library className="h-4 w-4 ml-1" />,
  },
];

function Header() {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-[#DEF4F7] w-[80vw] border-2 border-base-400 rounded-box px-5 shadow-xl">
      <Navbar menu={menu} />
    </div>
  );
}

export default Header;
