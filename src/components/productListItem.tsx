import {Text, View, Pressable, FlatList, TextInput, TouchableOpacity} from 'react-native'
import { Link } from 'expo-router';
import RemoteImage from './RemoteImage';

const defalutImageUri = "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 


const ProductItem = ({ product }) => {

  
  return (
      <Link href={`/products/${product.id}`} asChild>
        <Pressable className="bg-gray-100 p-2 mb-4 rounded-lg border border-gray-300">
          <View className="flex-row items-start">
            <RemoteImage  
            path={product.image}
            fallback={defalutImageUri}
            className='w-2/5 aspect-[4/3]'
            dataLink='product-images'
            resizeMode="contain"/>
            <View className='ml-2 flex-1 justify-center items-start'>
              <Text className="text-xl font-bold">{product.apartments.name}</Text>
                  <View className='flex-row items-start'>
                    <View className={"px-1 border rounded-md bg-gray-200 border-gray-400 mb-1"}>
                      <Text className="text-gray-500 mt-0">{product.dong} Dong {product.ho} Ho </Text>
                    </View>
                  </View>
              
              {
                product.trade_type == 'Sale' ? (
                  <View className='flex-row items-start'>
                    <View className={"px-1 border rounded-md bg-red-200 border-red-400"}>
                      <Text className="text-red-500">Sale</Text>
                    </View>
                    <Text className="text-red-500 font-bold ml-1">{product.sale_price}₩</Text>
                  </View>

                ) : product.trade_type == 'Jeonse' ? (
                  <View className='flex-row items-start'>
                    <View className={"px-1 border rounded-md bg-blue-200 border-blue-400"}>
                      <Text className="text-blue-500">Jeonse</Text>
                    </View>
                    <Text className="text-blue-500 font-bold ml-1">{product.jeonse_price}₩</Text>
                  </View>

                ) : product.trade_type == 'Rent' ? (
                  <View className='flex-row items-start'>
                    <View className={"px-1 border rounded-md bg-gray-200 border-gray-400"}>
                      <Text className="text-gray-500">Rent</Text>
                    </View>
                    <Text className="text-gray-500 font-bold ml-1">{product.rent_deposit}/{product.rent_price}₩</Text>
                  </View>

                ) :<></>
              }
              {
                product.status == 'Active' ? (
                  <View className={"px-1 border rounded-md bg-red-200 border-red-400 mt-1"}>
                    <Text className="text-red-500">Active</Text>
                  </View>
                ) : product.status == 'Sold' ? (
                  <View className={"px-1 border rounded-md bg-gray-200 border-gray-400 mt-1"}>
                    <Text className="text-gray-500">Sold</Text>
                  </View>
                ):  product.status == 'Process' ? (
                  <View className={"px-1 border rounded-md bg-blue-200 border-blue-400 mt-1"}>
                    <Text className="text-blue-500">Process</Text>
                  </View>
                ):<></>
              }

            </View>
          </View>
        </Pressable>
      </Link> 
      )
  

}

export default ProductItem;