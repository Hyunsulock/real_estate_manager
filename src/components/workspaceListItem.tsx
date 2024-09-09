import {Text, View, Pressable, FlatList, TextInput, TouchableOpacity, Alert} from 'react-native'
import { Link } from 'expo-router';
import { supabase } from '@/lib/supabase';

type ProductListItemProps = {
  house: House;
}



const WorkspaceItem = ( { workspace } ) => (
  <Link href={`/(workspace)/workspaces/${workspace.id}`} asChild>
  <Pressable 
    className="bg-gray-100 p-4 mb-4 rounded-lg border border-gray-300">
    <Text className="text-2xl font-bold">{workspace.name}</Text>
    <Text className="text-base">Description: {workspace.description}</Text>
    <View className='flex-row items-start'>
    {
      
      workspace.owner_profile.username? 
            <View className={"px-1 border rounded-md bg-blue-200 border-blue-400"}>
              <Text className="text-blue-500">Owner : {workspace.owner_profile.username}</Text>
            </View>
          : 
          <View className={"px-1 border rounded-md bg-red-200 border-red-400 mt-1"}>
            <Text className="text-red-500">Anonymous</Text>
          </View>
    }
    </View>
    </Pressable>
  </Link>
);

export default WorkspaceItem;