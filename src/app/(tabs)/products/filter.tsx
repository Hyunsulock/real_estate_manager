
import { supabase } from '@/lib/supabase';
import { Slider } from '@miblanchard/react-native-slider';
import {Link, router, Stack } from 'expo-router'
import { useEffect, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, Text, View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/providers/AuthProvider';

export default function User() {
    const tradeTypes : string[] = ['Sale', 'Jeonse', 'Rent'];
    const statusTypes : string[] = ['Active', 'Sold', 'Process'];
    const {session, loading, profile, setProfile} = useAuth();
    const queryClient = useQueryClient();
    const [selectedApartments , setSelectedApartments] = useState<any[]>([])
    const [apartmentsData , setApartmentsData] = useState<any[]>([])
    const [sizeValue, setSizeValue] = useState<number[]>([45,100]);
    const [salePriceValue, setSalePriceValue] = useState<number[]>([90000,250000]);
    const [jeonsePriceValue, setJeonsePriceValue] = useState<number[]>([10000,150000]);
    const [rentPriceValue, setRentPriceValue] = useState<number[]>([10,500]);
    const [rentDepositPriceValue, setRentDepositPriceValue] = useState<number[]>([500,100000]);
    const [tradeType, setTradeType] = useState<any[]>([])
    const [selectedStatus, setSelectedStatus] = useState<any[]>([])

    const handleSizeValueChange = (newValue: number[]) => {
        setSizeValue(newValue);
    };
    const handleSalePriceValueChange = (newValue: number[]) => {
        setSalePriceValue(newValue);
    };
    const handleJeonsePriceValueChange = (newValue: number[]) => {
        setJeonsePriceValue(newValue);
    };
    const handleRentPriceValueChange = (newValue: number[]) => {
        setRentPriceValue(newValue);
    };
    const handleRentDepositPriceValueChange = (newValue: number[]) => {
        setRentDepositPriceValue(newValue);
    };



    useEffect(() => {
        const fetchApartments = async () => {
            let { data: apartments, error } = await supabase
            .from('apartments')
            .select('*')

            setApartmentsData(apartments!)

        }
        const loadSavedFilters = async () => {
            try {

                const [
                savedSizeValue,
                savedSalePriceValue,
                savedJeonsePriceValue,
                savedRentPriceValue,
                savedRentDepositPriceValue,
                savedTradeType,
                savedSelectedStatus,
                savedSelectedApartments, // New addition to load apartments
            ] = await Promise.all([
                AsyncStorage.getItem('sizeValue'),
                AsyncStorage.getItem('salePriceValue'),
                AsyncStorage.getItem('jeonsePriceValue'),
                AsyncStorage.getItem('rentPriceValue'),
                AsyncStorage.getItem('rentDepositPriceValue'),
                AsyncStorage.getItem('tradeType'),
                AsyncStorage.getItem('selectedStatus'),
                AsyncStorage.getItem('selectedApartments'), // Retrieve selected apartments
            ]);
                
                
                if (savedSelectedApartments) setSelectedApartments(JSON.parse(savedSelectedApartments));
                if (savedSelectedStatus) setSelectedStatus(JSON.parse(savedSelectedStatus));
                if (savedTradeType) setTradeType(JSON.parse(savedTradeType));
                if (savedSizeValue) setSizeValue(JSON.parse(savedSizeValue));
                if (savedSalePriceValue) setSalePriceValue(JSON.parse(savedSalePriceValue));
                if (savedJeonsePriceValue) setJeonsePriceValue(JSON.parse(savedJeonsePriceValue));
                if (savedRentPriceValue) setRentPriceValue(JSON.parse(savedRentPriceValue));
                if (savedRentDepositPriceValue) setRentDepositPriceValue(JSON.parse(savedRentDepositPriceValue));
            } catch (err) {
                console.error('Error loading saved filters:', err);
            }
            };

        fetchApartments()
        loadSavedFilters()
    }, []);

    const saveFilters = async () => {
        
        try {
            await AsyncStorage.setItem('selectedApartments', JSON.stringify(selectedApartments));
            await AsyncStorage.setItem('selectedStatus', JSON.stringify(selectedStatus));
            await AsyncStorage.setItem('tradeType', JSON.stringify(tradeType));
            await AsyncStorage.setItem('sizeValue', JSON.stringify(sizeValue));
            await AsyncStorage.setItem('salePriceValue', JSON.stringify(salePriceValue));
            await AsyncStorage.setItem('jeonsePriceValue', JSON.stringify(jeonsePriceValue));
            await AsyncStorage.setItem('rentPriceValue', JSON.stringify(rentPriceValue));
            await AsyncStorage.setItem('rentDepositPriceValue', JSON.stringify(rentDepositPriceValue));
            
        } catch (err) {
            console.error('Error saving filters:', err);
        } finally {
            await queryClient.invalidateQueries(['products', profile.workspace]);
            router.back()
        }



        
    };


    const toggleApartment = (toggledApartment: any) => {
    if (selectedApartments.some(apartment => apartment.id === toggledApartment.id)) {
        setSelectedApartments(prevAparts => prevAparts.filter(apartment => apartment.id !== toggledApartment.id));
        } else {
        setSelectedApartments(prevAparts => [...prevAparts, toggledApartment]);
        }
    };

    const toggleStatus = (status: string) => {
    if (selectedStatus.includes(status)) {
        setSelectedStatus(prevStatus => prevStatus.filter(s => s !== status));
        } else {
        setSelectedStatus(prevStatus => [...prevStatus, status]);
        }
    };



    return (
        <>
        <ImageBackground className='h-full' source={require('../../../../assets/waiting.jpg')} >
            <Stack.Screen options={{title:  'My Filter', 
                    headerStyle: {backgroundColor: '#4299e1', },
                    headerTintColor: '#fff', 
                    headerTitleStyle: {fontWeight: 'bold',},
                }}/>

            <ScrollView>
            <Text className="text-lg font-semibold mt-4 mb-2 ml-3">Apartment selection</Text>
            <View className="flex-row flex-wrap items-center mb-2 ml-1">
                {apartmentsData.map((apartment) => (
                    <Pressable
                    key={apartment.id}
                    onPress={() => toggleApartment(apartment)}
                    className={`p-2.5 border rounded-3xl m-1 ${
                        selectedApartments.some(selectedApartment => selectedApartment.id === apartment.id) ? 'bg-blue-200 border-blue-600 border-2' : 'border-slate-300 bg-transparent border-2'
                        }` }

                    >
                    <Text
                        className={`${
                        selectedApartments.some(selectedApartment => selectedApartment.id === apartment.id) ? 'text-blue-600' : 'text-slate-700'
                        }`}
                    >
                        {apartment.name}
                    </Text>
                    </Pressable>
                ))}
            </View>
            <Text className="text-lg font-semibold mt-1 mb-2 ml-3">Status selection</Text>
            <View className="flex-row flex-wrap items-center mb-2 ml-1">
                {statusTypes.map((statusTypeString) => (
                    <Pressable
                    key={statusTypeString}
                    onPress={() => toggleStatus(statusTypeString)}
                    className={`p-2.5 border rounded-3xl m-1 px-7 ${
                        selectedStatus.includes(statusTypeString) ? 'bg-blue-200 border-blue-600 border-2' : 'border-slate-300 bg-transparent border-2'
                        }` }

                    >
                    <Text
                        className={`${
                        selectedStatus.includes(statusTypeString) ? 'text-blue-600' : 'text-slate-700'
                        }`}
                    >
                        {statusTypeString}
                    </Text>
                    </Pressable>
                ))
                }
            </View>
            <Text className="text-lg font-semibold mt-2 mb-2 ml-3">Trade type select</Text>
            <View className="flex-row flex-wrap items-center mb-2 ml-1">
            {
                tradeTypes.map((tradeTypeString)=> {
                    return <Pressable
                        key={tradeTypeString}
                        onPress={() => setTradeType([tradeTypeString])}
                        className={`p-2.5 border rounded-3xl m-1 px-8 ${
                            tradeType[0] == tradeTypeString? 'bg-blue-200 border-blue-600 border-2' : 'border-slate-300 bg-transparent border-2'
                            }` }

                        >
                        <Text
                            className={`${
                            tradeType[0] == tradeTypeString ? 'text-blue-600' : 'text-slate-700'
                            }`}
                        >
                            {tradeTypeString}
                        </Text>
                    </Pressable>
                })
            }
            </View>
            <Text className="text-lg font-semibold mt-1 mb-2 ml-3">Size range {sizeValue[0]}-{sizeValue[1]} m²</Text>
                <View className='mb-2 mx-4'>
                    <Slider 
                    animateTransitions
                    value={sizeValue}
                    onValueChange={handleSizeValueChange}
                    maximumTrackTintColor="#d3d3d3"
                    maximumValue={200}
                    minimumTrackTintColor="#4299e1"
                    minimumValue={45}
                    step={2}
                    thumbTintColor="#4299e1"
                    thumbStyle={{ width: 30, height: 30, borderRadius: 15 }} // Custom inline thumb style
                    trackStyle={{ height: 4, borderRadius: 2 }} // Custom inline track style
                    />
                </View>
            
            

            {
                tradeType[0] == 'Sale' ? (
                    <>
                        <Text className="text-lg font-semibold mt-1 mb-2 ml-3">Sale price range {salePriceValue[0]}-{salePriceValue[1]} ₩</Text>
                        <View className='mb-2 mx-4'>
                            <Slider 
                                animateTransitions
                                value={salePriceValue}
                                onValueChange={handleSalePriceValueChange}
                                maximumTrackTintColor="#d3d3d3"
                                maximumValue={250000}
                                minimumTrackTintColor="#4299e1"
                                minimumValue={90000}
                                step={1000}
                                thumbTintColor="#4299e1"
                                thumbStyle={{ width: 30, height: 30, borderRadius: 15 }} // Custom inline thumb style
                                trackStyle={{ height: 4, borderRadius: 2 }} // Custom inline track style
                            />
                        </View>
                    </>
            
            ) : tradeType[0] == "Jeonse" ? (
                    <>
                        <Text className="text-lg font-semibold mt-1 mb-2 ml-3">Jeonse price range {jeonsePriceValue[0]}-{jeonsePriceValue[1]} ₩</Text>
                        <View className='mb-2 mx-4'>
                            <Slider 
                                animateTransitions
                                value={jeonsePriceValue}
                                onValueChange={handleJeonsePriceValueChange}
                                maximumTrackTintColor="#d3d3d3"
                                maximumValue={150000}
                                minimumTrackTintColor="#4299e1"
                                minimumValue={10000}
                                step={1000}
                                thumbTintColor="#4299e1"
                                thumbStyle={{ width: 30, height: 30, borderRadius: 15 }} // Custom inline thumb style
                                trackStyle={{ height: 4, borderRadius: 2 }} // Custom inline track style
                            />
                        </View>
                    </>
                ) : tradeType[0] == "Rent" ? (
                    <>
                        <Text className="text-lg font-semibold mt-1 mb-2 ml-3">Rent price range {rentPriceValue[0]}-{rentPriceValue[1]} ₩</Text>
                        <View className='mb-2 mx-4'>
                            <Slider 
                                animateTransitions
                                value={rentPriceValue}
                                onValueChange={handleRentPriceValueChange}
                                maximumTrackTintColor="#d3d3d3"
                                maximumValue={500}
                                minimumTrackTintColor="#4299e1"
                                minimumValue={10}
                                step={5}
                                thumbTintColor="#4299e1"
                                thumbStyle={{ width: 30, height: 30, borderRadius: 15 }} // Custom inline thumb style
                                trackStyle={{ height: 4, borderRadius: 2 }} // Custom inline track style
                            />
                        </View>
                        <Text className="text-lg font-semibold mt-1 mb-2 ml-3">Rent deposit price range {rentDepositPriceValue[0]}-{rentDepositPriceValue[1]} ₩</Text>
                        <View className='mb-2 mx-4'>
                            <Slider 
                                animateTransitions
                                value={rentDepositPriceValue}
                                onValueChange={handleRentDepositPriceValueChange}
                                maximumTrackTintColor="#d3d3d3"
                                maximumValue={100000}
                                minimumTrackTintColor="#4299e1"
                                minimumValue={500}
                                step={500}
                                thumbTintColor="#4299e1"
                                thumbStyle={{ width: 30, height: 30, borderRadius: 15 }} // Custom inline thumb style
                                trackStyle={{ height: 4, borderRadius: 2 }} // Custom inline track style
                            />
                        </View>
                    </>
                ) : <></>
            }
            <Pressable onPress={saveFilters} className="bg-blue-400 py-3 px-6 mx-4 mb-4 rounded-full items-center mt-5">
                <Text className="text-white text-lg font-bold">Save Filters</Text>
            </Pressable>


            </ScrollView>
            </ImageBackground>
        </>


    )  
}