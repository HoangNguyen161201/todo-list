import { Box, HStack, useColorMode, useColorModeValue } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {Keyboard, AsyncStorage} from 'react-native'

export default function Header({openMenu}) {
    const {toggleColorMode, colorMode} = useColorMode()
    const bgScheme = useColorModeValue('#F5F5F5', '#40514E');
    
    return (
        <HStack alignItems={'center'} justifyContent={'space-between'} height={10} paddingX={5}>
            <TouchableOpacity onPress={()=> {
                openMenu(),
                Keyboard.dismiss()
            }}>
                <Box>
                    <Ionicons name="md-menu-outline" size={30} color={bgScheme} />
                </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {
                toggleColorMode()
            }}>
                <Box>
                    {
                        colorMode == 'dark' ? 
                        <Ionicons name="moon" size={20} color={bgScheme} />: <Ionicons name="sunny" size={24} color={bgScheme} />
                    }
                </Box>
            </TouchableOpacity>
           
        </HStack>
    )
}
