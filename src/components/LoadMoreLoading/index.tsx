import { Fragment, PropsWithChildren } from 'react';
import { Text, View } from '@tarojs/components';

export interface LoadMoreLoadingProps {
  isLoading?: boolean;
  hasMore?: boolean;
  loadingText?: string;
  notMoreText?: string;
}

const LoadMoreLoading = (props: PropsWithChildren<LoadMoreLoadingProps>) => {
  const { isLoading, hasMore, loadingText, notMoreText } = props;
  return (
    <View className="py-3 flex items-center justify-center self-stretch text-base text-[#CBCCCF]">
      {hasMore ? isLoading ? <Fragment>{loadingText ?? '加载更多...'}</Fragment> : '' : <Text>{notMoreText ?? '没有更多了...'}</Text>}
    </View>
  );
};

export default LoadMoreLoading;
