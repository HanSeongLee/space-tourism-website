import { useEffect, useState } from 'react';

export const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState<{
        x: number;
        y: number;
    }>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(() => {
                setScrollPosition({
                    x: window.scrollX,
                    y: window.scrollY,
                });
            });
        };

        setScrollPosition({
            x: window.scrollX,
            y: window.scrollY,
        });

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollPosition;
};
