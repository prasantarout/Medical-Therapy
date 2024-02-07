import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native';

const useScreenDimension = () => {

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  const handleOrientationChange = () => {
    const newScreenWidth = Dimensions.get('window').width;
    setScreenWidth(newScreenWidth);
    const newScreenHeight = Dimensions.get('window').height;
    setScreenHeight(newScreenHeight);
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', handleOrientationChange);
    return () => {
      subscription.remove();
    };
  }, []);

  return screenWidth;
}

export default useScreenDimension

