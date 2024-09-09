
import {Link, Redirect , router, Stack} from 'expo-router'
import {StyleSheet, Text, View, Pressable, FlatList, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground} from 'react-native'
import houseData from '../../../../assets/data/houses.json'
import Animated, {
  withDelay,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import React, {useState} from 'react';
import ProductItem from "@/components/productListItem"


import { AnimatedPressable, FloatingActionButton } from '../../../components/floatingBtn';
import { useProductList } from '@/api/products';
import { useAuth } from '@/providers/AuthProvider';
import Octicons from '@expo/vector-icons/Octicons';



export default function Products() {
  const {session, loading, profile} = useAuth();


  const onPressFilter = () => {
    router.push('/(tabs)/products/filter')
  }

  if (!profile.workspace) {
    return <Redirect href={"/(workspace)/workspaces"}/>
  }

  const { data: products, error, isLoading } = useProductList(profile.workspace);


  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }


    return (
      <ImageBackground className='h-full' source={require('../../../../assets/waiting.jpg')} >
      <View className="relative flex-1 bg-white pt-4 px-4">
          <Stack.Screen options={{title: 'Products', headerRight: ()=> (
                <>
                    <Link href={'/(tabs)/products/create'} asChild>
                      <Pressable  className="mr-1">
                          {({pressed}) =>(
                            <Octicons name="diff-added" size={24} color="black" style={{ opacity: pressed? 0.5: 1}}/>
                              
                          )}
                      </Pressable>
                    </Link>
                </>
            )}}/>
            <Pressable 

              onPress={onPressFilter}
              className='bg-blue-400 p-4 rounded-2xl my-2 items-center shadow-2xl'>
              <Text className="text-white text-lg font-semibold">Filters</Text>
            </Pressable>
          
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductItem product={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            
          />
        </View>
        </ImageBackground>
      
    );
}



