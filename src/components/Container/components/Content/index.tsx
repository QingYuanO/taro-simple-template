import { View } from '@tarojs/components';
import { ContentProps } from '../../types';

export default function Content(props: ContentProps) {
  const { children, ...otherViewProps } = props;
  return <View {...otherViewProps}>{children}</View>;
}
