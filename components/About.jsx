import { Avatar, Box, HStack, Text, useColorModeValue, VStack } from 'native-base'
import { ScrollView, Linking } from 'react-native';
import { SvgUri } from 'react-native-svg'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import TodoImg from './imageSvg/Todoimg';

export default function About() {
    const bgSchemer = useColorModeValue('#F5F5F5', '#40514E');
    const bgScheme = useColorModeValue('#40514E', '#F5F5F5');
    const imgSchemer = useColorModeValue('https://res.cloudinary.com/hoang161201/image/upload/v1642864137/Group_21_csnfua.svg',
        'https://res.cloudinary.com/hoang161201/image/upload/v1642864137/Group_211_sr9ag3.svg')
    const colorSchemer = useColorModeValue('#2F89FC', '#30E3CA')

    const openInfor = (link) => {
        Linking.openURL(link)
    }

    return (
        <Box flexGrow={1}>
           <Box paddingX={5} my={5} position={'relative'} minH={'30%'} height={'30%'} display={'flex'} >
                <TodoImg color={bgSchemer}/>
            </Box>
            <Box paddingX={5} marginBottom={5}>
                <Text fontSize={30} color={colorSchemer} fontWeight={'bold'} >
                    About this app
                </Text>
            </Box>
            <Box flexGrow={1} background={bgSchemer} paddingX={5} paddingTop={5} borderTopLeftRadius={30} borderTopRightRadius={30}>
                <Box background={bgSchemer}>
                    <Avatar
                        marginBottom={5}
                        bg="green.500"
                        size="xl"
                        borderWidth={2}
                        borderColor={colorSchemer}
                        source={require('../assets/avatar.png')}
                    >HN</Avatar>
                </Box>

                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

                    <VStack space={5}>

                        <Text fontSize={16} color={bgScheme} lineHeight={30}>
                            Store tasks or tasks that need to be done during the day. this is my first react native project.
                        </Text>
                        <Text color={colorSchemer} fontSize={24} fontWeight={'bold'}>
                            Infor
                        </Text>
                        <VStack marginBottom={5} space={4}>
                            <TouchableOpacity onPress={() => {
                                openInfor('http://youtube.com')
                            }}>
                                <HStack space={4} alignItems={'center'}>
                                    <AntDesign name="google" size={24} color={bgScheme} />
                                    <Text color={bgScheme} fontSize={16}>
                                        hoangdev161201@gmail.com
                                    </Text>
                                </HStack>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                openInfor('http://youtube.com')
                            }}>
                                <HStack space={4} alignItems={'center'}>
                                    <AntDesign name="facebook-square" size={24} color={bgScheme} />
                                    <Text color={bgScheme} fontSize={16}>
                                        Facebook
                                    </Text>
                                </HStack>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                openInfor('http://youtube.com')
                            }}>
                                <HStack space={4} alignItems={'center'}>
                                    <AntDesign name="github" size={24} color={bgScheme} />
                                    <Text fontSize={16} color={bgScheme}>
                                        Github
                                    </Text>
                                </HStack>
                            </TouchableOpacity>
                        </VStack>

                    </VStack>


                </ScrollView>
            </Box>
        </Box>

    )
}

