import { useWorkspace } from "@/api/workspaces";
import Button from "@/components/button";
import RemoteImage from "@/components/RemoteImage";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Alert, View, Text, ImageBackground } from "react-native";

const WorkspaceDetailsScreen = () => {

    const {id: idString} = useLocalSearchParams();

    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

    const {data: workspace, error, isLoading} = useWorkspace(id);
    const {session, loading, profile, setProfile} = useAuth();
    const defalutImageUri = "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
    


    const confirmAccess = () =>{
        Alert.alert('Confirm', 'Are you sure you want to access following workspace?', [
            {
                text: 'No'
            },
            {
                text: 'Yes',
                style: 'default',
                onPress: onPress,
            }
        ])
    }

    const onPress = async () => {
        const { data, error } = await supabase
        .from('profiles')
        .update({ workspace: workspace.id })
        .eq('id', profile.id)
        .select()

        if(error) {
            throw new Error('failed to update profile');
        }
        setProfile(data[0])

        router.replace('/')
        
    }


    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Failed to fetch workspace</Text>;
    }

    console.log("work",workspace.owner_profile.avatar_url)




    return  (
        <View>
            
            <ImageBackground className='h-full' source={require('../../../../assets/waiting.jpg')} >
            <Stack.Screen options={{title: 'Workspace detail', headerTransparent: true}}/>
                <View className="mx-3 h-full justify-end item-end">
                    <Text className="text-xl font-bold mx-2">Group workspace</Text>
                    <Text className="text-3xl font-bold mx-2">{workspace.name}</Text>
                    <Text className="text-xl mb-1 mx-2">#{workspace.description}</Text>
                    <View className="flex-row justify-start items-center mb-2 mx-3">
                    {
                        
                        
                        workspace.owner_profile.avatar_url ? (<RemoteImage  path={workspace.owner_profile.avatar_url}
                            fallback={defalutImageUri}
                            className='w-9 aspect-[4/4] rounded-2xl'
                            dataLink='avatars'
                            resizeMode="contain"/> ): <></>
                    }{
                        workspace.owner_profile.username ? (<Text className="text-2xl font"> {workspace.owner_profile.username}</Text>) : (<Text>Ananymous</Text>)
                    }
                    </View>
                    
                    <Button text="Access" onPress={confirmAccess}></Button>
                    <View className="mb-3"></View>
                </View>
            </ImageBackground>

        </View>
    )

}

export default WorkspaceDetailsScreen;