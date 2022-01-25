import { Box, HStack } from 'native-base';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Keyboard, TextInput, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import uuid from 'react-native-uuid'

export default function AddTask({ isOpen, color, colorCheckbox, backgroundColor, handleSubmit }) {

    const [isDid, setIsDid] = useState(false)
    const [inputVl, setVl] = useState('')
    const input = useRef()

    // animate decorate
    const animateDecorate = useRef(new Animated.Value(isDid ? 1 : 0), []).current

    // animate checkbox
    const animateCheck = useRef(new Animated.Value(30), []).current
    let AnimatePath = useMemo(() => {
        return Animated.createAnimatedComponent(Path)
    }, [])

    // animate when open input to add new task
    const animateOpacity = useRef(new Animated.Value(1), []).current
    const animatedMt = useRef(new Animated.Value(-30), []).current
    let AnimateTask = useMemo(() => {
        return Animated.createAnimatedComponent(HStack)
    }, [])

    const openInput = async () => {

        Animated.parallel([
            Animated.sequence([
                Animated.timing(animatedMt, {
                    useNativeDriver: false,
                    duration: 200,
                    toValue: 20
                }),
                Animated.timing(animatedMt, {
                    useNativeDriver: false,
                    duration: 200,
                    toValue: 12
                }),
            ]),
            Animated.timing(animateOpacity, {
                delay: 200,
                toValue: 1,
                duration: 200,
                useNativeDriver: false
            })
        ]).start()

        setTimeout(() => {

            input.current.focus()
        }, 400)
    }

    useEffect(() => {
        if (isOpen) {
            openInput()
        } else {
            Animated.parallel([

                Animated.timing(animatedMt, {
                    useNativeDriver: false,
                    duration: inputVl ? 0 : 200,
                    toValue: -30
                }),
                Animated.timing(animateOpacity, {
                    toValue: 0,
                    duration: inputVl ? 0 : 200,
                    useNativeDriver: false
                })

            ]).start()


            setTimeout(() => {
                setVl('')
                setIsDid(false)
                Keyboard.dismiss()
            }, 400)
        }
    }, [isOpen])

    useEffect(() => {
        Animated.parallel([
            Animated.timing(animateCheck, {
                toValue: isDid ? 60 : 30,
                useNativeDriver: false
            }),
            Animated.timing(animateDecorate, {
                toValue: isDid ? 1: 0,
                useNativeDriver: false
            })
        ]).start()
    }, [isDid])


    const toggleDoTask = () => {
        console.log(isDid)
        setIsDid(!isDid)
    }

    return (
        <Box overflow={'hidden'} >
            <AnimateTask alignItems={'center'} style={{
                opacity: animateOpacity,
                marginTop: animatedMt
            }} space={5} >
                <Svg onPress={() => {
                    toggleDoTask()
                }} width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Rect x="0.7" y="0.7" width="18.6" height="18.6" rx="2.8" fill={backgroundColor} stroke={colorCheckbox} strokeWidth="2" />
                    <AnimatePath d="M22 2.5C18.3333 4 10.9 8.7 10.5 15.5C9.66667 13 7 8.2 3 9" stroke={color} strokeDasharray={30} strokeWidth="2" strokeDashoffset={animateCheck} strokeLinecap="round" />
                </Svg>
                <Box overflow={'hidden'} flexShrink={1}>
                    <TextInput onSubmitEditing={(task) => {
                        handleSubmit({
                            task: inputVl,
                            isDid,
                            id: uuid.v4()
                        })
                    }} value={inputVl} onChangeText={(value) => {
                        setVl(value)
                    }} ref={input} style={{
                        marginRight: 40,
                        color: color
                    }} placeholder='Enter your task' />
                    <Animated.View style={{
                        minHeight: 2,
                        backgroundColor: backgroundColor,
                        position: 'absolute',
                        top: '50%',
                        left: '-100%',
                        width: '200%',
                        transform: [{ scaleX: animateDecorate }]

                    }}></Animated.View>
                </Box>
            </AnimateTask>
        </Box>
    )
}
