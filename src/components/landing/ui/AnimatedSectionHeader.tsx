import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';

interface Props {
    title: ReactNode;
    subtitle?: ReactNode;
    isDark?: boolean;
    align?: 'left' | 'center';
}

const AnimatedSectionHeader = ({ title, subtitle, isDark, align = 'center' }: Props) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

    return (
        <motion.div 
            ref={ref}
            style={{ y }}
            className={`relative z-10 ${align === 'center' ? 'text-center mx-auto' : 'text-left'}`}
        >
            <motion.h2 
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`text-3xl sm:text-4xl md:text-[54px] leading-tight font-bold mb-4 md:mb-6 break-words hyphens-auto ${isDark ? 'text-white' : 'text-slate-900'}`}
            >
                {title}
            </motion.h2>
            
            {subtitle && (
                <motion.p 
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                    className={`text-xl font-medium ${align === 'center' ? 'max-w-2xl mx-auto' : ''} ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
                >
                    {subtitle}
                </motion.p>
            )}
        </motion.div>
    );
};

export default AnimatedSectionHeader;
