import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { View, Text , Pressable, Alert, ScrollView, Linking} from "react-native";
import houseData from "@/assets/data/houses.json"
import { useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useDeleteProduct, useProduct, useUpdateProduct } from "@/api/products";
import { useAuth } from "@/providers/AuthProvider";
import { useUpdateProductSubscription } from "@/api/products/subscriptions";
import RemoteImage from "@/components/RemoteImage";



//const statuses = ['sold', 'process', 'active'];

const ProductDetailsScreen = () => {
    const { mutate: deleteProduct } = useDeleteProduct();
    
    const {id: idString} = useLocalSearchParams();
    const {session, loading, profile, setProfile} = useAuth();

    const productId = parseFloat(typeof idString === 'string' ? idString : idString[0]);

    const {data: product, error, isLoading} = useProduct( profile.workspace, productId );
    const {mutate: updateProduct} = useUpdateProduct();
    useUpdateProductSubscription(profile.workspace, productId);
    const statusTypes : string[] = ['Active', 'Sold', 'Process'];
    const updateStatus = async (status: string) => {
        updateProduct({
            ...product, status: status
            });

    };

    const defalutImageUri = "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 


    const onDelete = () => {
        console.log('delte')
        deleteProduct(productId, {
        onSuccess: (data) => {
            console.log('donge')
            router.navigate('/(tabs)/products');
            },
        });
    }
    const confirmDelete = () =>{
        Alert.alert('Confirm', 'Are you sure you want to delete?', [
            {
                text: 'Cancel'
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete,
            }
        ])
    }



    if (!product) {
        return <View>
            <Text>invalid id</Text>
        </View>
    }
    return (
        <View>
            <Stack.Screen options={{title: 'Details '+ product.id, headerRight: ()=> (
                <>
                    
                    <Pressable onPress={confirmDelete} className="mr-6">
                        {({pressed}) =>(
                            <FontAwesome name="trash" size={25} color='black' style={{marginRight:1, opacity: pressed? 0.5: 1}}></FontAwesome>
                        )}
                    </Pressable>
                    
                    <Link href={`/(tabs)/products/create?id=${product.id}`} asChild>
                        <Pressable>
                            {({pressed}) =>(
                                <FontAwesome name="pencil" size={25} color='black' style={{marginRight:1, opacity: pressed? 0.5: 1}}></FontAwesome>
                            )}
                        </Pressable>
                    </Link>
                </>
            )}}/>

                <ScrollView>
                <RemoteImage  
                    path={product.image}
                    fallback={defalutImageUri}
                    className='w-full aspect-[4/3]'
                    dataLink='product-images'
                    resizeMode="auto"/>

                <View className="mx-3">

                    
                <View className="flex-row flex-wrap justify-start items-end mt-2">
                    <Text className="text-3xl">{product.apartments.name} </Text>
                    <Text className="text-xl mb-1">{product.dong} dong {product.ho} ho</Text>
                    
                </View>
                {
                    product.trade_type == 'Sale' ? (
                        <View>
                            <Text className="text-2xl font-bold text-red-500">Sale {product.sale_price}₩</Text>
                        </View>
                    ): product.trade_type == 'Jeonse' ? (
                        <View>
                            <Text className="text-2xl font-bold text-red-500">Jeonse {product.jeonse_price}₩</Text>
                        </View>
                    ): product.trade_type == 'Rent' ? (
                        <View>
                            <Text className="text-2xl font-bold text-red-500">Rent {product.rent_deposit}/{product.rent_price}₩</Text>
                        </View>
                    ):<></>
                }
                <View className="flex-row flex-wrap justify-start items-center">
                    <Text className="text-lg text-slate-600">APARTMENT </Text>
                    <Text className="text-sm text-slate-600"> | </Text>
                    <Text className="text-lg text-slate-600"> {product.size}M² </Text>
                    <Text className="text-sm text-slate-600"> | </Text>
                    <Text className="text-lg text-slate-600 "> {product.floor}F </Text>
                    <Text className="text-sm text-slate-600"> | </Text>
                    <Text className="text-lg text-slate-600"> {product.house_type} TYPE </Text>
                </View>


                <Text className="text-lg">{product.apartments.address}</Text>
                <Text className="text-lg mb-1">Features: {product.features}</Text>

                


                <Text style={{ fontWeight: 'bold' }}>Status</Text>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                    {statusTypes.map((status) => (
                        <Pressable
                        key={status}
                        onPress={() => updateStatus(status)}
                        className={`p-2.5 border rounded-3xl m-1 px-7 ${
                            product.status === status ? 'bg-blue-200 border-blue-600 border-2' : 'border-slate-300 bg-transparent border-2'
                            }` }>
                        <Text
                            className={`${
                                product.status === status ? 'text-blue-600' : 'text-slate-700'
                                }`}>
                            {status}
                        </Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={{ fontWeight: 'bold' }}>Owner details</Text>
                <Pressable onPress={() => {
                        Linking.openURL(`tel:${product.phone}`);
                    }} className="flex-row flex-wrap justify-center items-center p-2.5 border rounded-3xl m-1 px-7 border-slate-400">
                    <Text className='text-lg font-bold text-gray-500' >{product.owner} : </Text>
                    <Text className='text-lg font-bold text-gray-500' >{product.phone}</Text>
                </Pressable>



                </View>
                </ScrollView>
        
            </View>
                
    );
};

export default ProductDetailsScreen;