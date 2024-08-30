import React from "react";
import { FloatingNav } from "../ui/floating-navbar.jsx";
import { IconHome, IconMessage, IconUser, IconShoppingCart, IconFileText } from "@tabler/icons-react";

const Navbar = () => {
  const navItems = [
    {
      name: "Home",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Products",
      icon: <IconShoppingCart className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Resources",
      icon: <IconFileText className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Pricing",
      icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
      <DummyContent />
    </div>
  );
};

const DummyContent = () => {
  return (
<div>
  
</div>
  );
};

export default Navbar;















