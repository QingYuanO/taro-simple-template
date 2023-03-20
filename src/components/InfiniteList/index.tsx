import { Fragment, PropsWithChildren, ReactNode } from 'react';
import { View } from '@tarojs/components';
import { Empty, EmptyProps } from '@nutui/nutui-react-taro';

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
  hasEmpty?: boolean;
} & Omit<LoadMoreLoadingProps, 'isLoading' | 'hasMore'> &
  Partial<Omit<EmptyProps, 'className'>>;

export default function InfiniteList<Item = unknown>(props: PropsWithChildren<ListProps<Item>>) {
  const { data, itemKey, isFetchingNextPage, hasNextPage, listWrapClassName, containerWrapClassName, renderItem } = props;
  const { emptyClassName, description, image, imageSize } = props;
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
        hasEmpty && <Empty description={description} image={image} imageSize={imageSize} className={emptyClassName} />
      )}
    </Fragment>
  );
}
