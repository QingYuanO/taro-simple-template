/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import Taro from '@tarojs/taro';

export type IconNames = 'music-play' | 'music-stop' | 'move-up-down' | 'download' | 'sort' | 'copy' | 'vertical-more' | 'note' | 'video' | 'excel' | 'word' | 'pdf' | 'ppt' | 'play-circle' | 'music' | 'play-stop-circle' | 'play-stop-circle1' | 'mediaMaterial' | 'arrow-up-circle' | 'email' | 'phone1' | 'address' | 'x-square' | 'wechart-fill' | 'help-circle' | 'square' | 'subtract-checked' | 'square-ckecked' | 'more-horizontal' | 'unbound' | 'authorization-manage' | 'task' | 'user' | 'gift' | 'qr' | 'partner' | 'stop-circle' | 'log-in' | 'material-square' | 'promote' | 'customer-clues' | 'personal-card' | 'arrow-down' | 'repeat' | 'unlock' | 'leaver' | 'phone-outgoing' | 'logo' | 'empty' | 'women' | 'user-info' | 'service' | 'tip' | 'delete' | 'clear' | 'close' | 'down' | 'doubt' | 'date' | 'file-plus' | 'file-text' | 'lock' | 'id-card' | 'left' | 'external-link' | 'ad-material' | 'edit' | 'camera' | 'men' | 'leaver-message' | 'phone' | 'plus-square' | 'right' | 'plus-circle' | 'message-collect' | 'square-check' | 'send' | 'search' | 'save' | 'up' | 'my-article' | 'warning-circle-fill' | 'warning-circle' | 'wechart' | 'check-circle-fill' | 'alert-rimless' | 'check-circle' | 'alert-circle' | 'delete-circle' | 'grid';

interface Props {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: React.CSSProperties;
}

const IconFont: FunctionComponent<Props> = (props) => {
  const { name, size, color, style } = props;

  // @ts-ignore
  return <iconfont name={name} size={parseFloat(Taro.pxTransform(size))} color={color} style={style} />;
};

IconFont.defaultProps = {
  size: 18,
};

export default IconFont;
