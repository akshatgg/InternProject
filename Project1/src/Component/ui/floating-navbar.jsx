    import React, { useState } from "react";
    import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
    import { cn } from "../../lib/utils"; // Adjust the path to your utility functions

    export const FloatingNav = ({ navItems, className }) => {
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
        let direction = current - scrollYProgress.getPrevious();

        if (scrollYProgress.get() < 0.05) {
            setVisible(false);
        } else {
            setVisible(direction < 0);
        }
        }
    });

    return (
        <AnimatePresence mode="wait">
        <motion.div
            initial={{ opacity: 1, y: -150 }}
            animate={{ y: visible ? 0 : -150, opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
            "flex fixed top-10 inset-x-0 max-w-[90%] mx-auto border border-transparent dark:border-white/[0.2] rounded-full bg-white shadow-xl shadow-[#b1a6f7] z-[5000] px-6 py-4 items-center justify-between space-x-6",
            className
            )}
            // style={{ boxShadow: "0 4px 6px rgba(126, 47, 142, 0.3)" }} // Custom purple shadow
        >

            <div className="flex text-[#7F56D9] text-4xl font-semibold">
                NAVBAR
            </div>
            {/* Leftmost items */}
            <div className="flex space-x-6">
            {navItems.map((navItem, idx) => (
                <div
                key={`navItem-${idx}`}
                className={cn(
                    "relative dark:text-black font-semibold items-center flex space-x-2 hover:text-[#7F56D9] cursor-default"
                )}
                >
                <span className="block sm:hidden text-lg">{navItem.icon}</span>
                <span className="hidden sm:block text-lg">{navItem.name}</span>
                </div>
            ))}
            </div>

            {/* Rightmost items */}
            <div className="flex space-x-4">
            <button
                className="border text-base font-medium relative  px-6 py-3 rounded-xl bg-[#F9F5FF] text-[#6941C6]"
            >
                <span>Login</span>
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
            </button>
            <button
                className="border text-base font-medium relative  px-6 py-3 rounded-xl bg-[#7F56D9] text-white"
            >
                <span>Signup</span>
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-green-500 to-transparent h-px" />
            </button>
            </div>
        </motion.div>
        </AnimatePresence>
    );
    };
