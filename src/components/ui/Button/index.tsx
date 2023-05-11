import { ButtonProps as BProps, Button as TaroButton } from '@tarojs/components';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export type ButtonVariantProps = VariantProps<typeof button>;

const button = cva('flex justify-center items-center active:opacity-90', {
  variants: {
    type: {
      primary: 'text-white bg-primary',
      plain: 'text-word-primary bg-white',
      text: 'm-0 p-0 inline-block bg-transparent text-word-primary',
    },
    size: {
      small: ['text-xs', 'py-1', 'px-2'],
      base: ['text-sm', 'py-2', 'px-3'],
      medium: ['text-base', 'py-2.5', 'px-4'],
    },
    round: {
      true: 'rounded-full',
      false: '',
    },
    block: {
      true: 'w-full',
      false: '',
    },
  },
  compoundVariants: [{}],
  defaultVariants: {
    size: 'base',
    type: 'primary',
  },
});

export interface ButtonProps extends Omit<BProps, 'size' | 'type'>, ButtonVariantProps {}

function Button(props: ButtonProps) {
  const { type, size, round, block, className, children, ...other } = props;
  return (
    <TaroButton {...other} className={twMerge(button({ type, size, round, block, className }))}>
      {children}
    </TaroButton>
  );
}

export default Button;
