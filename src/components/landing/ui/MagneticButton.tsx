import { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function MagneticButton({ children, className, onClick }: any) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const mouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = ref.current!.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x * 0.4, y: y * 0.4 });
    };

    const mouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const x = useSpring(position.x, springConfig);
    const y = useSpring(position.y, springConfig);

    return (
        <motion.button
            ref={ref}
            onMouseMove={mouseMove}
            onMouseLeave={mouseLeave}
            onClick={onClick}
            style={{ x, y }}
            data-magnetic
            className={className}
        >
            {children}
        </motion.button>
    );
}
