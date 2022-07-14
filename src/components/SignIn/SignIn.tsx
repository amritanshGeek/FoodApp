import React, {
  FC,
  memo,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  View,
  Text,
  Box,
  Center,
  Button,
  useColorMode,
  useColorModeValue,
  Input,
  Icon,
  useToast,
  KeyboardAvoidingView,
  ScrollView,
} from 'native-base';
import { ParentContainer } from '../Commons';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { NavigationService } from '../../utils';
import { useSelector } from 'react-redux';
import { dispatch } from '../../store';
import { setAccessToken, setUserDetails } from '../../Features';
import { AuthContext } from '../../navigators/AuthProvider';
AntDesign.loadFont();

export const Container: FC = ({ children }) => {
  return (
    <ParentContainer style={[styles.container]}>{children}</ParentContainer>
  );
};


export const List: FC = memo(() => {
    const [email,setEmail]=useState<string | undefined>('Amritanshm21@gmail.com');
    const [pass,setPass]=useState<string | undefined>('Test@123');
    const [isVisible,setIsVisible]=useState<boolean | undefined>(false);
    const toast = useToast();
    const allData = useSelector(state => state.allUserDetails.data);
    const {login}= useContext(AuthContext);
       
    const onSignIn=()=>{
        if(!email?.trim()?.length){
            toast.show({description: "Please Enter a email"})
            return;
        }
        if(!pass?.trim()?.length){
            toast.show({description: "Please Enter a password"})
            return;
        }
        login(email,pass);
        // if(allData?.length){
        //     allData.map((data)=>{
        //         if(data.email.toLocaleLowerCase()===email.toLocaleLowerCase()){
        //             if(data.password===pass){
        //                 dispatch(setAccessToken(data._id));
        //                 dispatch(setUserDetails(data));
        //                 NavigationService.replace('App');
        //                 toast.show({description: "Logged In SuccessFully"})
        //             }else{
        //                 toast.show({description: "Password does not match"})
        //             }
        //         }else{
        //             toast.show({description: "User does not exist"})
        //         }
        //     })
        // }else{
        //     toast.show({description: "There is no users"})
        // }
        // let token = Date.now();
        // dispatch(setAccessToken(token));
        // dispatch(setUserDetails({name,email,password:pass,_id:token}));
        // dispatch(setUsersDataDetails([{name,email,password:pass,_id:token}]));
        // NavigationService.replace('App');
    }

    return(
        <ScrollView pt={20} flex={1} _dark={{
            bg: "coolGray.800"
        }} _light={{
            bg: "warmGray.50"
        }}
            contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
        >
            <Box flex="1" alignItems='flex-start' mt='20' bg={useColorModeValue("warmGray.50", "coolGray.800")} >
                <Text bold fontSize="3xl" display="flex"  _dark={{
                        bg: "coolGray.800"
                    }} _light={{
                        bg: "warmGray.50"
                    }}>
                        {'Login'}
                </Text>
                <Text fontSize="14px">
                    {'Please sign in to continue'}
                </Text>
                <Box mt='20' bg={'white'} justifyContent={'flex-start'} >
                    <Input
                        InputLeftElement={<Icon as={AntDesign} name="mail" color="coolGray.800" ml={4} />}
                        placeholder="Email"
                        w="75%"
                        maxWidth="300px"
                        variant='outline'
                        height={'12'}
                        onChangeText={(text)=>setEmail(text)}
                    />
                </Box>
                <Box mt='10' bg={"white"} justifyContent={'flex-start'} >
                    <Input
                        InputLeftElement={<Icon as={AntDesign} name="lock" color="coolGray.800" ml={4} />}
                        placeholder="Password"
                        w="75%"
                        maxWidth="300px"
                        variant='outline'
                        height={'12'}
                        type={isVisible?'text':'password'}
                        onChangeText={(text)=>setPass(text)}
                        InputRightElement={
                            <TouchableOpacity activeOpacity={1} onPress={()=>setIsVisible(!isVisible)}>
                                <Icon as={Ionicons} name={isVisible?"eye":"eye-off"} color="orange.400" mr={4} />
                            </TouchableOpacity>
                        }
                    />
                </Box>
                <Box minWidth="300px" mt='10' borderRadius={'full'} alignItems='flex-end' justifyContent={'flex-end'} >
                    <Button bg={'orange.400'} borderRadius={'full'} onPress={onSignIn}>
                        <View paddingY={1} flexDirection={'row'} alignItems={'center'}>
                            <Text bold _light={{color: 'white'}} paddingX={2} _dark={{color: "warmGray.50"}}>LOGIN</Text>
                            <Icon as={AntDesign} name="arrowright" color="coolGray.800" _light={{color: 'white'}} _dark={{color: "warmGray.50"}} />
                        </View>
                    </Button>
                </Box>
            </Box>
            <Box m='10' borderRadius={'full'} justifyContent={'flex-start'} flexDirection={'row'} >
                <Text _light={{color:'coolGray.400'}} _dark={{color: "white"}} >Don't have an account? </Text> 
                <TouchableOpacity onPress={()=>NavigationService.navigate(NavigationService.ScreenNames.SignUp)}>
                    <Text bold color={'orange.400'} >Sign up</Text>
                </TouchableOpacity>
            </Box>
        </ScrollView>
    )
});
  