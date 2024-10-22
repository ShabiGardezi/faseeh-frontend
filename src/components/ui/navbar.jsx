"use client";

import { useState, useEffect, useRef } from "react";

import {
  Menu,
  X,
  ChevronDown,
  Zap,
  Layers,
  Monitor,
  Smartphone,
  Globe,
  Airplay,
  ShieldCheck,
  FolderCode,
  Workflow,
  NotepadText,
  ShoppingBag,
  Tally5,
  Youtube,
  NotebookPen,
  Box,
  MessageCircleQuestion,
  Mails,
  UserRoundCog,
  UserRound,
  MonitorCheck,
  Logs,
  Headset,
  ChartNetwork,
  Library,
  Film,
} from "lucide-react";
import Link from "next/link";
import { RiSeoLine } from "react-icons/ri";
import { SiGooglemarketingplatform } from "react-icons/si";
import { PiStrategy } from "react-icons/pi";
import { BsPersonWorkspace } from "react-icons/bs";
import { useRouter } from "next/navigation";

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

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className=" text-[#005bea] transition-all">
      {/* menu items on large screens */}
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* logo image  */}
          <div className="flex items-center">
            <Link href="/" className="ms-0 h-8 md:h-12 w-40">
              <img
                src="/images/logo.png"
                alt="Company Logo"
                className="w-full h-full object-contain"
              />
            </Link>
          </div>

          {/* menu items for large screen  */}
          <div className="hidden md:block" dir="rtl">
            <div className="ml-10 flex items-baseline space-x-4 rounded-lg">
              <button
                onClick={() => router.push("/contact-us")}
                className="ml-8 px-4 py-2 rounded-md text-sm font-medium text-white bg-[#005bea] hover:bg-[#0046b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005bea]"
              >
                تواصل معنا
              </button>
              {menu.map((item) => (
                <Dropdown key={item.name} item={item} />
              ))}
            </div>
          </div>

          {/* burger and cross icon for small screens  */}
          <div className="md:hidden" dir="rtl">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#005bea] hover:text-white hover:bg-[#005bea] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* menu items on small screens */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileMenu menu={menu} />
            <button className="mt-4 w-full px-4 py-2 rounded-md text-sm font-medium text-white bg-[#005bea] hover:bg-[#0046b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005bea]">
            تواصل معنا
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

function Dropdown({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timerRef = useRef(null);
  const router = useRouter();

  const handleMouseEnter = () => {
    // Clear any existing timer when entering
    clearTimeout(timerRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 50); // Delay of 200ms
  };

  const navigateToPage = () => {
    router.push(item.href);
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={navigateToPage}
        className="text-[#005bea] hover:bg-[#005bea] hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
      >
        {item.icon}
        <span className="ml-2">{item.name}</span>
        {item.subMenu && <ChevronDown className="ml-2 h-4 w-4" />}
      </button>
      {isOpen && item.subMenu && (
        <div className="absolute z-10 left-0 mt-2 w-32 rounded-md shadow-lg bg-base-200 ring-1 ring-black ring-opacity-5">
          <div
            className="py-1 rounded-lg"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {item.subMenu.map((subItem) => (
              <DropdownItem key={subItem.name} item={subItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DropdownItem({ item }) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const timerRef = useRef(null);
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const router = useRouter();

  const handleMouseEnter = () => {
    // Clear any existing timer when entering
    clearTimeout(timerRef.current);
    setIsSubMenuOpen(true);
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing
    timerRef.current = setTimeout(() => {
      setIsSubMenuOpen(false);
    }, 50); // Delay of 200ms
  };

  const navigateToPage = () => {
    router.push(item.href);
  };

  return (
    <div
      className="z-100 relative bg-base-200 w-[20vw]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hasSubItems ? (
        <div>
          <button
            onClick={navigateToPage}
            className="w-full text-left px-4 py-2 text-sm text-[#005bea] hover:bg-[#005bea] hover:text-white flex items-center justify-between"
            role="menuitem"
          >
            <span className="flex items-center">
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </span>
            <ChevronDown
              className={`ml-2 h-4 w-4 transform transition-transform duration-150 ${
                isSubMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isSubMenuOpen && (
            <div className="absolute right-full top-0 pl-0 mt-3">
              {item.subItems.map((subItem) => (
                <DropdownItem key={subItem.name} item={subItem} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link
          href={item.href}
          className="block px-4 py-2 text-sm text-[#005bea] hover:bg-[#005bea] hover:text-white flex items-center"
          role="menuitem"
        >
          {item.icon}
          <span className="ml-2">{item.name}</span>
        </Link>
      )}
    </div>
  );
}

const MobileMenu = ({ menu }) => {
  return (
    <div className="mobile-menu p-4">
      {menu.map((menuItem, index) => (
        <MobileMenuItem key={index} menuItem={menuItem} />
      ))}
    </div>
  );
};

const MobileMenuItem = ({ menuItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (e) => {
    // Prevent link navigation when toggling the submenu
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  const navigateToPage = () => {
    router.push(menuItem.href);
  };

  return (
    <div className="mobile-menu-item">
      {/* Menu item with toggle for submenu */}
      <div className="menu-item-header flex justify-between items-center p-2">
        {/* Clicking this navigates to the page */}
        <div className="flex items-center" onClick={navigateToPage}>
          {menuItem.icon}
          <span className="ml-2">{menuItem.name}</span>
        </div>

        {/* Clicking this toggles the submenu */}
        {menuItem.subMenu || menuItem.subItems ? (
          <button onClick={toggleOpen} className="ml-2">
            <ChevronDown
              className={`h-4 w-4 transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        ) : null}
      </div>

      {/* Submenu */}
      {isOpen && (
        <div className="submenu pl-4">
          {menuItem.subMenu && (
            <div className="sub-menu">
              {menuItem.subMenu.map((subMenuItem, index) => (
                <MobileMenuItem key={index} menuItem={subMenuItem} />
              ))}
            </div>
          )}
          {/* SubItems (second level submenu) */}
          {menuItem.subItems && (
            <div className="sub-items">
              {menuItem.subItems.map((subItem, index) => (
                <div key={index} className="sub-item flex items-center p-2">
                  {subItem.icon}
                  <a
                    href={subItem.href}
                    className="ml-2 text-sm hover:text-blue-500"
                  >
                    {subItem.name}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
