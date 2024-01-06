import * as React from 'react';
import { Input as TaroInput, InputProps as TaroInputProps } from '@tarojs/components';

import { cn } from '@/src/utils';

export interface InputProps extends TaroInputProps {}

const Input = React.forwardRef<React.ElementRef<typeof TaroInput>, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <TaroInput
      type={type}
      placeholderClass="flex items-center text-muted-foreground"
      className={cn(
        'flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
