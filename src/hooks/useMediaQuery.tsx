import React from 'react'


const useMediaQuery = () => {
  // hook to check if the screen size is mobile
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    // desktop
    const isDesktop = window.matchMedia("(min-width: 1025px)").matches;
    return {
        isMobile,
        isTablet:isMobile,
        isDesktop
    }
}

export default useMediaQuery