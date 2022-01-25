import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

import { Box, useColorModeValue, Text, VStack, HStack } from 'native-base'
import { View } from 'react-native';
import IconImg from '../imageSvg/Icon';
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerActions } from '@react-navigation/native'

export default function Sidebar(props) {

    const bgSchemer = useColorModeValue('#F5F5F5', '#40514E');

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props} style={{
                backgroundColor: '#F5F5F5',
                padding: 10
            }}>
                <HStack justifyContent={'flex-end'} mb={5}>
                    <TouchableOpacity onPress={() => {
                        props.navigation.dispatch(DrawerActions.closeDrawer())
                    }}>
                        <Box p={2} borderRadius={30} borderWidth={2} borderColor={'#40514E'}>
                            <AntDesign name="left" size={24} color='#40514E' />
                        </Box>
                    </TouchableOpacity>
                </HStack>
                <Box height={120} mb={5} px={3} >
                    <View style={{
                        width: '90%',
                        height: 2,
                        backgroundColor: '#40514E',
                        position: 'absolute',
                        bottom: 0,
                        right: 10
                    }}></View>
                    <IconImg />
                </Box>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    )
}