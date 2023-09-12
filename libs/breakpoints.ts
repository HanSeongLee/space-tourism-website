import gsap from 'gsap';

export const breakpoints = {
    mobile: 568,
    tablet: 767,
    desktop: 1339,
};

export const createMatchMedia = (func: gsap.ContextFunc, scope?: Element | string | object) => {
    const mm = gsap.matchMedia();
    mm.add({
        isDesktop: `(min-width: ${breakpoints.desktop}px)`,
        isTablet: `(min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop}px)`,
        isMobile: `(max-width: ${breakpoints.tablet}px)`,
    }, func, scope);
    return mm;
};
