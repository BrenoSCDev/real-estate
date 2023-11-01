import React, { useEffect, useState } from 'react';
import { ICustomHiddenProps } from '../interfaces';

const Hidden: React.FC<ICustomHiddenProps> = ({
  xsUp,
  xsDown,
  smUp,
  smDown,
  mdUp,
  mdDown,
  lgUp,
  lgDown,
  xlUp,
  children,
}) => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isHidden = () => {
    if (xsUp && screenSize >= 0) return true;
    if (xsDown && screenSize < 600) return true;
    if (smUp && screenSize >= 600) return true;
    if (smDown && screenSize < 960) return true;
    if (mdUp && screenSize >= 960) return true;
    if (mdDown && screenSize < 1280) return true;
    if (lgUp && screenSize >= 1280) return true;
    if (lgDown && screenSize < 1920) return true;
    if (xlUp && screenSize >= 1920) return true;

    return false;
  };

  return <div style={{ display: isHidden() ? 'none' : 'block' }}>{children}</div>;
};
export default Hidden;