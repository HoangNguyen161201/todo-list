import { Box, FlatList, HStack, ScrollView, Text, useColorModeValue, VStack } from 'native-base'
import TodoImg2 from './imageSvg/TodoImg2';
import { Ionicons } from '@expo/vector-icons'
import Task from './common/Task';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react';
import AddTask from './common/AddTask';

export default function Todo() {

    const bgSchemer = useColorModeValue('#F5F5F5', '#40514E');
    const bgScheme = useColorModeValue('#40514E', '#F5F5F5');
    const colorSchemer = useColorModeValue('#2F89FC', '#30E3CA')
    const [data, setData] = useState([])
    const [isOpen, setIsOpen] = useState(false)



    useEffect(() => {

        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                const dataStore = JSON.parse(result)
                setData(dataStore)
            }
        })
    }, [])

    const AddNewTask = async (result) => {
        console.log(result)
        const newData = [
            result,
            ...data
        ]

        await AsyncStorage.setItem('data', JSON.stringify(newData))
        setData(newData)
        setIsOpen(false)

    }

    const UpdateTask = async ({id, isDid}) => {
        const allTasks = await AsyncStorage.getItem('data').then(e=> e)
        if(allTasks) {
            const newTasks = await JSON.parse(allTasks).map(item=> {

                if(item.id == id) {
                    return {
                        ...item,
                        isDid
                    }
                }
                   
                return item
            })
        
            await AsyncStorage.setItem('data', JSON.stringify(newTasks))
        }
    }

    const deleteTask = async (id)=> {
        const allTasks = await AsyncStorage.getItem('data').then(e=> e)
        const newTasks = await JSON.parse(allTasks).filter((value)=> {
            return value.id != id
        })
        await AsyncStorage.setItem('data', JSON.stringify(newTasks))

    }

    return (
        <Box flexGrow={1}>
            <Box paddingX={5} my={5} position={'relative'} minH={'30%'} height={'30%'} display={'flex'} >
                <TodoImg2 color={bgSchemer} />
            </Box>
            <Box paddingX={5} marginBottom={5}>
                <Text fontSize={30} color={colorSchemer} fontWeight={'bold'} >
                    What's up ?
                </Text>
            </Box>
            <Box flexGrow={1} background={bgSchemer} paddingX={5} paddingTop={5} borderTopLeftRadius={30} borderTopRightRadius={30}>
                <HStack justifyContent={'flex-end'}>
                    <TouchableOpacity onPress={() => {
                        setIsOpen(!isOpen)
                    }}>
                        <VStack justifyContent={'center'} alignItems={'center'} w={10} h={10} bg={bgScheme} borderRadius={35}>
                            <Ionicons name="add" size={30} color={bgSchemer} />
                        </VStack>
                    </TouchableOpacity>
                </HStack>
                <Box style={{
                    marginBottom: 6
                }}>
                    <AddTask handleSubmit={AddNewTask} colorCheckbox={colorSchemer}
                        task={'ddd'}
                        color={bgScheme}
                        backgroundColor={bgSchemer}
                        isOpen={isOpen}
                    />
                </Box>

                <ScrollView scrollEnabled={true} flex={1} showsVerticalScrollIndicator={false}>
                    <VStack flex={1} height={'100%'} mb={5}>
                        {
                            data.map((item) => <Task
                                key={item.id}
                                colorCheckbox={colorSchemer}
                                task={item.task}
                                color={bgScheme}
                                backgroundColor={bgSchemer}
                                did={item.isDid}
                                id={item.id}
                                UpdateTask={UpdateTask}
                                deleteTask={deleteTask}
                            />
                            )
                        }
                    </VStack>
                </ScrollView>
            </Box>
        </Box>
    )
}
