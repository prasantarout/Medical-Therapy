import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native';

const useScreenWidth = () => {

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  const handleOrientationChange = () => {
    const newScreenWidth = Dimensions.get('window').width;
    setScreenWidth(newScreenWidth);
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', handleOrientationChange);
    return () => {
      subscription.remove();
    };
  }, []);

  return screenWidth;
}

export default useScreenWidth

