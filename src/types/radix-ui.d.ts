declare module '@radix-ui/react-slot' {
  import * as React from 'react';
  
  interface SlotProps {
    children?: React.ReactNode;
    [key: string]: any;
  }
  
  export const Slot: React.ForwardRefExoticComponent<
    SlotProps & React.RefAttributes<HTMLElement>
  >;
}