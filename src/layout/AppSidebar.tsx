"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import Icon from "@/components/atoms/Icon";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  roles?: string[];
  path?: string;
  subItems?: {
    name: string;
    path: string;
    roles?: string[];
    pro?: boolean; new?: boolean
  }[];
};

const navItems1: NavItem[] = [
  {
    icon: <Icon name="GridIcon" />,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/", pro: false }],
  },
  {
    icon: <Icon name="CalenderIcon" />,
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: <Icon name="UserCircleIcon" />,
    name: "User Profile",
    path: "/profile",
  },

  {
    name: "Forms",
    icon: <Icon name="ListIcon" />,
    subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  },
  {
    name: "Tables",
    icon: <Icon name="TableIcon" />,
    subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  },
  {
    name: "Pages",
    icon: <Icon name="PageIcon" />,
    subItems: [
      { name: "Blank Page", path: "/blank", pro: false },
      { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
];

const navItems: NavItem[] = [
  {
    icon: <Icon name="BoxCubeIcon" />,
    name: "Dashboard",
    path: "/"
  },

  {
    icon: <Icon name="BoxCubeIcon" />,
    name: "Mills",
    path: "/mills",
    roles: ["Super-Admin"],
  },
  {
    icon: <Icon name="BoxCubeIcon" />,
    name: "Company / Buyer",
    path: "/companies",
    roles: [ "Mill-Admin"],
  },


  {
    icon: <Icon name="BoxCubeIcon" />,
    name: "Products",
    path: "/products",
    roles: ["Mill-Admin"],
  }  
];

const othersItems: NavItem[] = [
  {
    icon: <Icon name="BoxCubeIcon" />,
    name: "Roles",
    path: "/line-chart",
    roles: ["Mill-Admin"], 
  },
  {
    icon: <Icon name="BoxCubeIcon" />,
    name: "Role Permissions",
    path: "/line-chart",
    roles: ["Super-Admin"],
  },
  {
    icon: <Icon name="BoxCubeIcon" />,
    name: "Document Types",
    path: "/line-chart",
    roles: ["Super-Admin"],
  },
  {
    icon: <Icon name="BoxCubeIcon" />,
    name: "States",
    path: "/line-chart",
    roles: ["Super-Admin"],
  },
  {
    icon: <Icon name="BoxCubeIcon" />,
    name: "Cities",
    path: "/setting/city",
    roles: ["Super-Admin"],
  },
];

const othersItems1: NavItem[] = [
  {
    icon: <Icon name="PieChartIcon" />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <Icon name="BoxCubeIcon" />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <Icon name="PlugInIcon" />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const user = useSelector((state: RootState) => state.auth.user);
  
  useEffect(() => {
    console.log("User roles:", user?.roles);
  }, [user]);

  const userRoles: string[] = user?.roles || [];

  const hasAccess = (roles?: string[]) => {
    if (!roles || roles.length === 0) return true;
    return roles.some(role => userRoles.includes(role));
  };

  const isActive = useCallback(
    (path: string) => path === pathname,
    [pathname]
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu(prev =>
      prev?.index === index && prev?.type === menuType
        ? null
        : { index, type: menuType }
    );
  };

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems
        .filter(nav => hasAccess(nav.roles)) // 🔥 ROLE FILTER
        .map((nav, index) => (
          <li key={nav.name}>
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(index, menuType)}
                className={`menu-item group ${openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                    ? "menu-item-active"
                    : "menu-item-inactive"
                  }`}
              >
                <span className="menu-item-icon">
                  {nav.icon}
                </span>

                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}

                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="ml-auto transition-transform">
                    <Icon
                      name="ChevronDownIcon"
                      size={20}
                      className={
                        openSubmenu?.index === index
                          ? "rotate-180 text-brand-500"
                          : ""
                      }
                    />
                  </span>
                )}
              </button>
            ) : (
              nav.path && (
                <Link
                  href={nav.path}
                  className={`menu-item ${isActive(nav.path)
                      ? "menu-item-active"
                      : "menu-item-inactive"
                    }`}
                >
                  <span className="menu-item-icon">{nav.icon}</span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="menu-item-text">{nav.name}</span>
                  )}
                </Link>
              )
            )}

            {/* SUB ITEMS */}
            {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[`${menuType}-${index}`] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height:
                    openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                      ? `${subMenuHeight[`${menuType}-${index}`]}px`
                      : "0px",
                }}
              >
                <ul className="mt-2 ml-9 space-y-1">
                  {nav.subItems
                    .filter(sub => hasAccess(sub.roles)) // 🔥 SUB ROLE CHECK
                    .map(sub => (
                      <li key={sub.name}>
                        <Link
                          href={sub.path}
                          className={`menu-dropdown-item ${isActive(sub.path)
                              ? "menu-dropdown-item-active"
                              : "menu-dropdown-item-inactive"
                            }`}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </li>
        ))}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen bg-white border-r transition-all duration-300
      ${isExpanded || isMobileOpen ? "w-[290px]" : "w-[90px]"}
      ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className="py-8 px-5">
        <Link href="/">
          <Image
            src="/images/logo/logo.svg"
            alt="Logo"
            width={150}
            height={40}
          />
        </Link>
      </div>

      <nav className="px-4">
        <h2 className="text-xs uppercase text-gray-400 mb-4">Menu</h2>
        {renderMenuItems(navItems, "main")}

        <h2 className="text-xs uppercase text-gray-400 mt-6 mb-4">Settings</h2>
        {renderMenuItems(othersItems, "others")}
      </nav>
    </aside>
  );
};



export default AppSidebar;
