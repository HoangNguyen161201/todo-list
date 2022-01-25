import { HStack, VStack } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, Dimensions} from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons'
import {memo} from 'react'

function Task({ 
                                did,
                                id,
                                UpdateTask,
                                task,
                                color,
                                colorCheckbox,
                                backgroundColor,
                                deleteTask
                            }) {

    const [fistShow, setFirstShow] = useState(true)

    const taskWidth = Dimensions.get('screen').width
    var timeOut = null

    const animateDecorate = useRef(new Animated.Value(did ? 1 : 0), []).current
    const animateMargin = useRef(new Animated.Value(0), []).current
    const animateCheck = useRef(new Animated.Value(did ? 60 : 30), []).current
    let AnimatePath = Animated.createAnimatedComponent(Path)

    // animate when delete
    const animateScale = useRef(new Animated.Value(40), []).current
    let AnimateScrollView = Animated.createAnimatedComponent(ScrollView)

    const [isDid, setIsDid] = useState(did)

    const animateTask = () => {
        Animated.parallel([
            Animated.timing(animateDecorate, {
                toValue: isDid ? 1 : 0,
                useNativeDriver: false
            }),
            Animated.sequence([
                Animated.timing(animateMargin, {
                    toValue: 20,
                    useNativeDriver: false,
                    duration: 200
                }),
                Animated.timing(animateMargin, {
                    toValue: 0,
                    useNativeDriver: false,
                    duration: 200
                })
            ]),
            Animated.timing(animateCheck, {
                toValue: isDid ? 60 : 30,
                useNativeDriver: false
            })
        ]).start()
    }

    const toggleDoTask = () => {
        setIsDid(!isDid)
    }

    const handleDelete = () => {
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            Animated.timing(animateScale, {
                duration: 200,
                useNativeDriver: false,
                toValue: 0
            }).start()
            
            deleteTask(id)
        }, 30)

    }

    useEffect(() => {
        if (fistShow) {
            setFirstShow(false)
        } else {
            animateTask()
            UpdateTask({
                id, isDid
            })
        }
    }, [isDid])



    return (


        <AnimateScrollView style={{
            flex: 1,
            height: animateScale,
            overflow: 'hidden'
        }} onMomentumScrollEnd={({ nativeEvent }) => {
            const checkEnd = nativeEvent.layoutMeasurement.width + nativeEvent.contentOffset.x
            if (nativeEvent.contentSize.width - (taskWidth / 4) < checkEnd) {
                handleDelete()
            }
        }} disableIntervalMomentum={true} snapToOffsets={[taskWidth - 40, taskWidth / 2]} showsHorizontalScrollIndicator={false} horizontal={true}>
            <HStack alignItems={'center'} space={5} style={{
                width: taskWidth - 40
            }} >
                <Svg onPress={() => {
                    toggleDoTask()
                }} width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Rect x="0.7" y="0.7" width="18.6" height="18.6" rx="2.8" fill={backgroundColor} stroke={colorCheckbox} strokeWidth="2" />
                    <AnimatePath d="M22 2.5C18.3333 4 10.9 8.7 10.5 15.5C9.66667 13 7 8.2 3 9" stroke={color} strokeDasharray={30} strokeWidth="2" strokeDashoffset={animateCheck} strokeLinecap="round" />
                </Svg>
                <VStack overflow={'hidden'} alignItems={'center'} position='relative'>
                    <Animated.Text style={{
                        marginLeft: animateMargin,
                        color: color
                    }} fontSize={16}>{task}</Animated.Text>
                    <Animated.View style={{
                        minHeight: 2,
                        backgroundColor: backgroundColor,
                        position: 'absolute',
                        top: '27%',
                        left: '-100%',
                        width: '200%',
                        transform: [{ scaleX: animateDecorate }]
                    }}>
                    
                    </Animated.View>
                </VStack>
            </HStack>
            <HStack justifyContent={'center'} alignItems={'center'} style={{
                width: taskWidth / 2
            }} bg={'red.300'}>
                <AntDesign name="delete" size={16} color="#fb6565" />
            </HStack>
        </AnimateScrollView>
    )
}

export default memo(Task) 