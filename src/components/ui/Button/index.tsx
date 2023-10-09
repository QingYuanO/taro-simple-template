import { ButtonProps as BProps, Button as TaroButton, View } from '@tarojs/components';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/utils';

export type ButtonVariantProps = VariantProps<typeof button>;

const button = cva('relative flex items-center justify-center', {
  variants: {
    type: {
      primary: 'bg-primary text-primary-foreground',
      plain: 'border border-solid border-border bg-secondary text-secondary-foreground',
      text: 'm-0 inline-block bg-transparent p-0 text-primary-foreground ',
    },
    size: {
      small: ['text-xs', 'py-1', 'px-2'],
      base: ['text-base', 'py-2', 'px-3'],
      medium: ['text-lg', 'py-2.5', 'px-4'],
    },
    round: {
      true: 'rounded-full',
      false: '',
    },
    block: {
      true: 'w-full',
      false: '',
    },
    disabled: {
      true: 'opacity-60',
      false: 'active:opacity-90',
    },
  },
  compoundVariants: [{}],
  defaultVariants: {
    size: 'base',
    type: 'primary',
  },
});

export interface ButtonProps extends Omit<BProps, 'size' | 'type' | 'disabled'>, ButtonVariantProps {}

function Button(props: ButtonProps) {
  const { type, size, round, block, className, children, disabled, ...other } = props;
  const booleanDisabled = !!disabled;
  return (
    <View className={cn(button({ type, size, round, block, disabled: booleanDisabled, className }))}>
      <TaroButton {...other} disabled={booleanDisabled} className=" absolute inset-0 border-none p-0 opacity-0"></TaroButton>
      {children}
    </View>
  );
}

export default Button;
