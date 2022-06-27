import React, {
    FC,
    memo,
    useContext,
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
} from 'native-base';
import { ParentContainer } from '../Commons';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import { NavigationService } from '../../utils';
import { setUserDetails, setUsersDataDetails, setAccessToken } from '../../Features';
import { dispatch } from './../../store/store';
import { AuthContext } from '../../navigators/AuthProvider';

AntDesign.loadFont();
  
export const Container: FC = ({ children }) => {
    return (
      <ParentContainer style={[styles.container]}>{children}</ParentContainer>
    );
};
  
  
export const List: FC = memo(() => {
    const [name,setName]=useState<string | undefined>();
    const [email,setEmail]=useState<string | undefined>();
    const [pass,setPass]=useState<string | undefined>();
    const [cnfPass,setCnfPass]=useState<string | undefined>();
    const toast = useToast();

    const {register}= useContext(AuthContext);
    
    const onSignUp=()=>{
        // if(!name?.trim()?.length){
        //     toast.show({description: "Please Enter a name"})
        //     return;
        // }
        if(!email?.trim()?.length){
            toast.show({description: "Please Enter a email"})
            return;
        }
        if(!pass?.trim()?.length){
            toast.show({description: "Please Enter a password"})
            return;
        }
        if(!cnfPass?.trim()?.length){
            toast.show({description: "Please Enter a confirm password"})
            return;
        }
        if(cnfPass !== pass){
            toast.show({description: "password and confirm password should be same"})
            return;
        }
        register(email,pass);
        // let token = Date.now();
        // dispatch(setAccessToken(token));
        // dispatch(setUserDetails({name,email,password:pass,_id:token}));
        // dispatch(setUsersDataDetails([{name,email,password:pass,_id:token}]));
        // NavigationService.replace('App');
    }
    
    return(
        <Center pt={20} flex={1} _dark={{
            bg: "coolGray.800"
        }} _light={{
            bg: "warmGray.50"
        }}>
            <View width={'100%'} justifyContent={'flex-start'} alignItems={'flex-start'} >
                <TouchableOpacity onPress={()=>NavigationService.goBack()}>
                    <Icon ml={4} as={AntDesign} size={10} name="arrowleft" color="coolGray.800" _light={{color: 'black'}} _dark={{color: "warmGray.50"}} />
                </TouchableOpacity>
            </View>
            <Box flex="1" alignItems='flex-start' mt='10' bg={useColorModeValue("warmGray.50", "coolGray.800")} >
                <Text bold fontSize="3xl" display="flex"  _dark={{
                        bg: "coolGray.800"
                    }} _light={{
                        bg: "warmGray.50"
                    }}>
                        {'Create Account'}
                </Text>
                {/* <Box mt='20' bg={'white'} justifyContent={'flex-start'} >
                    <Input
                        InputLeftElement={<Icon as={AntDesign} name="user" color="coolGray.800" ml={2} />}
                        placeholder="Full Name"
                        w="75%"
                        maxWidth="300px"
                        variant='outline'
                        height={'12'}
                        onChangeText={(text)=>setName(text)}
                    />
                </Box> */}
                <Box mt='10' bg={'white'} justifyContent={'flex-start'} >
                    <Input
                        InputLeftElement={<Icon as={AntDesign} name="mail" color="coolGray.800" ml={2} />}
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
                        InputLeftElement={<Icon as={AntDesign} name="lock" color="coolGray.800" ml={2} />}
                        placeholder="Password"
                        w="75%"
                        maxWidth="300px"
                        variant='outline'
                        height={'12'}
                        onChangeText={(text)=>setPass(text)}
                    />
                </Box>
                <Box mt='10' bg={"white"} justifyContent={'flex-start'} >
                    <Input
                        InputLeftElement={<Icon as={AntDesign} name="lock" color="coolGray.800" ml={2} />}
                        placeholder="Confirm Password"
                        w="75%"
                        maxWidth="300px"
                        variant='outline'
                        height={'12'}
                        onChangeText={(text)=>setCnfPass(text)}
                    />
                </Box>
                <Box minWidth="300px" mt='10' borderRadius={'full'} alignItems='flex-end' justifyContent={'flex-end'} >
                    <Button bg={'orange.400'} borderRadius={'full'} onPress={onSignUp}>
                        <View paddingY={1} flexDirection={'row'} alignItems={'center'}>
                            <Text bold _light={{color: 'white'}} paddingX={2} _dark={{color: "warmGray.50"}}>SIGN UP</Text>
                            <Icon as={AntDesign} name="arrowright" color="coolGray.800" _light={{color: 'white'}} _dark={{color: "warmGray.50"}} />
                        </View>
                    </Button>
                </Box>
            </Box>
            <Box m='10' borderRadius={'full'} justifyContent={'flex-start'} flexDirection={'row'}>
                <Text _light={{color:'coolGray.400'}} _dark={{color: "white"}} >Already have an account? </Text> 
                <TouchableOpacity onPress={()=>NavigationService.navigate(NavigationService.ScreenNames.SignIn)}>
                    <Text bold color={'orange.400'} >Sign in</Text>
                </TouchableOpacity>
            </Box>
        </Center>
    )
  });
    