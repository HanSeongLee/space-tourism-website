import React from 'react';

export const usePreventAnimation = () => {
    React.useEffect(() => {
        const releasePreventAnimation = () => {
            const html = document.querySelector('html');

            if (html) {
                html.classList.remove('prevent-animation');
            }
        };

        const handleResize = () => {
            const html = document.querySelector('html');

            if (html) {
                html.classList.add('prevent-animation');
                setTimeout(releasePreventAnimation, 100);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
};
