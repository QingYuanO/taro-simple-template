import { Fragment, PropsWithChildren, ReactNode } from 'react';
import { View } from '@tarojs/components';
import { twMerge } from 'tailwind-merge';

import LoadMoreLoading, { LoadMoreLoadingProps } from '../LoadMoreLoading';

export type ListProps<Item = unknown> = {
  data?: Item[];
  renderItem: (item: Item) => ReactNode;
  itemKey: string;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  listWrapClassName?: string;
  containerWrapClassName?: string;
  emptyClassName?: string;
  description?: string;
  hasEmpty?: boolean;
} & Omit<LoadMoreLoadingProps, 'isLoading' | 'hasMore'>;

export default function InfiniteList<Item = unknown>(props: PropsWithChildren<ListProps<Item>>) {
  const { data, itemKey, isFetchingNextPage, hasNextPage, listWrapClassName, containerWrapClassName, renderItem } = props;
  const { emptyClassName, description } = props;
  const { hasEmpty = true, loadingText, notMoreText } = props;
  return (
    <Fragment>
      {data && data.length > 0 ? (
        <View className={containerWrapClassName ?? ''}>
          <View className={listWrapClassName ?? ''}>
            {data?.map(item => (
              <Fragment key={item[itemKey]}>{renderItem(item)}</Fragment>
            ))}
          </View>
          <LoadMoreLoading isLoading={isFetchingNextPage} hasMore={hasNextPage} notMoreText={notMoreText} loadingText={loadingText} />
        </View>
      ) : (
        hasEmpty && <View className={twMerge('h-20 flex-center', emptyClassName)}>{description}</View>
      )}
    </Fragment>
  );
}
