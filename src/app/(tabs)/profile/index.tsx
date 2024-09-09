
import {Link, Redirect, router, Stack } from 'expo-router'
import { ImageBackground, Pressable, Text, View} from 'react-native'
import { supabase } from '@/lib/supabase';
import Button from '@/components/button';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from '@/providers/AuthProvider';
import { useProfile, useUpdateProfile } from '@/api/profile';
import RemoteImage from '@/components/RemoteImage';
import { useState } from 'react';
export default function User() {

    const {session, loading, profile, setProfile, setChecking, setSession} = useAuth();
    const {data: profileData, error, isLoading} = useProfile(profile.id);
    const defalutImageUri = "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
    const [isLoadingP, setIsLoading] = useState(false);
    const { mutate: updateProfle } = useUpdateProfile();
    
    if (!profileData) {
        return <View>
            <Text>invalid id</Text>
        </View>
    }

    const onLeave = async() => {


        setIsLoading(true)
        


        let updateFields = {
            full_name: profileData.full_name,
            username: profileData.username,
            avatar_url: profileData.avatar_url,
            workspace: null
        }

        updateProfle(
            {
                id: profile.id,
                ...updateFields
            },
            {
                onSuccess: () => {
                    setIsLoading(false)
                },

            }
        );
        setProfile({...profile, workspace: null})
        router.replace('/(workspace)/workspaces')
            
    }

    return (
        <ImageBackground className='h-full' source={require('../../../../assets/waiting.jpg')} >
        <View>
            <Stack.Screen options={{title: 'Profile', headerRight: ()=> (
                <>  
                    <Link href={'/(tabs)/profile/edit_profile'} asChild>
                        <Pressable>
                            {({pressed}) =>(
                                <FontAwesome name="pencil" size={25} color='black' style={{marginRight:1, opacity: pressed? 0.5: 1}}></FontAwesome>
                            )}
                        </Pressable>
                    </Link>
                </>
            )}}/>
            <View className='mx-2 my-4 flex justify-center items-center'>
                    <RemoteImage  
                        path={profileData.avatar_url}
                        fallback={defalutImageUri}
                        className='w-1/2 aspect-[4/4] rounded-full'
                        dataLink='avatars'
                        resizeMode="contain"/>
            </View>

            <View className='mx-2'>
                <Text className="text-lg border border-gray-300 rounded-md my-2 px-4 py-2 bg-slate-50">Full Name : {profileData.full_name}</Text>
                <Text className="text-lg border border-gray-300 rounded-md my-2 px-4 py-2 bg-slate-50">Username : {profileData.username}</Text>
            </View>
            

            <View className='mx-2'>
                <Button onPress={async () => 
                    {
                        await supabase.auth.signOut() 
                        setSession(null)
                        router.replace('/')
                    }
                } text="Sign out" />
            </View>
            <View className='mx-3' key={'onLeave'}>
                {
                !isLoadingP ? (
                    <Button onPress={onLeave} text='Leave workspace'></Button>
                ) : <Text>On Loading</Text>
                }

            </View>
            </View>
            </ImageBackground>
        )
}