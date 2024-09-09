import { Pressable, StyleSheet, Text, View } from 'react-native';

import { forwardRef } from 'react';

type ButtonProps = {
  text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, ...pressableProps }, ref) => {
    return (
      <Pressable ref={ref} {...pressableProps} className='bg-blue-400 p-4 rounded-2xl my-2 items-center shadow-2xl' >
        <Text className="text-white text-lg font-semibold">{text}</Text>


        
      </Pressable>
    );
  }
);



export default Button;