/* tslint:disable */
/* eslint-disable */

import { CSSProperties, FunctionComponent } from 'react';
import { View } from '@tarojs/components';
import { ViewProps } from '@tarojs/components/types/View';
import IconFont, { IconNames } from '../OriginalIconFont';

interface Props {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const QIcon: FunctionComponent<Props & ViewProps> = props => {
  const { name, size = 40, color, style, className, ...other } = props;
  return (
    <View style={{ display: 'inline-flex', ...(style as CSSProperties) }} {...other} className={className}>
      <IconFont name={name} size={size} color={color} />
    </View>
  );
};

export default QIcon;
