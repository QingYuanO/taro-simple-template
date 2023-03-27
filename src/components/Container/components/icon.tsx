import { View } from '@tarojs/components';

import { IconProps } from '../types';

export const HomeIcon = ({ color, size }: IconProps) => {
  return (
    <View
      style={{
        backgroundImage: `url("data:image/svg+xml, %3Csvg fill-rule='evenodd' clip-rule='evenodd' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' width='${size}px' height='${size}px'%3E%3Cpath d='M18 20C18 20.5523 17.5523 21 17 21H7C6.44771 21 6 20.5523 6 20V14H3.41421C3.149 14 2.89464 13.8946 2.70711 13.7071C2.31658 13.3166 2.31658 12.6834 2.70711 12.2929L11.2929 3.70708C11.6834 3.31655 12.3166 3.31655 12.7071 3.70708L21.2929 12.2929C21.4804 12.4804 21.5858 12.7348 21.5858 13C21.5858 13.5523 21.1381 14 20.5858 14H18V20ZM12 4.69703L3.89706 12.8H7.2V19.8H11V17H13V19.8H16.8V12.8H20.1029L12 4.69703Z' fill='${color}' fill-opacity='1' /%3E%3C/svg%3E")`,
        width: `${size}px`,
        height: ` ${size}px`,
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};

export const BackIcon = ({ color, size }: IconProps) => {
  return (
    <View
      style={{
        backgroundImage: `url("data:image/svg+xml, %3Csvg fill-rule='evenodd' clip-rule='evenodd' viewBox='0 0 12 24' xmlns='http://www.w3.org/2000/svg' width='${size}px' height='${size}px'%3E%3Cpath d='M10.0001 19.4375L8.95459 20.5L1.28098 12.7014C0.898041 12.3122 0.898042 11.6878 1.28098 11.2986L8.95459 3.5L10.0001 4.5625L2.68179 12L10.0001 19.4375Z' fill='${color}' fill-opacity='1' /%3E%3C/svg%3E")`,
        width: `${size}px`,
        height: ` ${size}px`,
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};
