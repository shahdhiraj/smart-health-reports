import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor({ isDark }: { isDark: boolean }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        const mouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('button, a, [data-magnetic]')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseover', mouseOver);
        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseover', mouseOver);
        };
    }, []);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mousePosition.x - 16, springConfig);
    const cursorY = useSpring(mousePosition.y - 16, springConfig);

    return (
        <motion.div
            className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] flex items-center justify-center ${isDark ? 'mix-blend-difference' : 'mix-blend-multiply'}`}
            style={{ x: cursorX, y: cursorY }}
            animate={{ 
                scale: isHovered ? 2.5 : 1,
                backgroundColor: isHovered ? (isDark ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,0.8)') : 'transparent',
                border: isHovered ? 'none' : (isDark ? '2px solid rgba(255,255,255,0.8)' : '2px solid rgba(0,0,0,0.8)')
            }}
            transition={{ duration: 0.15 }}
        >
            {isHovered && <span className={`text-[4px] font-bold ${isDark ? 'text-black' : 'text-white'}`}>Click</span>}
        </motion.div>
    );
}
