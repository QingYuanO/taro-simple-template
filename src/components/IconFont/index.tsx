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

const ReedIcon: FunctionComponent<Props & ViewProps> = (props) => {
  const { name, size, color, style, className,...other } = props;
  return (
    <View style={{ display: "inline-flex", ...(style as CSSProperties) }} {...other} className={className}>
      <IconFont name={name} size={size} color={color} />
    </View>
  );
};
ReedIcon.defaultProps = {
  size: 18,
};

export default ReedIcon;
