import React, {
  FC,
  memo,
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
} from 'native-base';
import { ParentContainer } from '../Commons';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import { NavigationService } from '../../utils';
AntDesign.loadFont();

export const Container: FC = ({ children }) => {
  return (
    <ParentContainer style={[styles.container]}>{children}</ParentContainer>
  );
};


export const List: FC = memo(() => {
    const {
        toggleColorMode
    } = useColorMode();
    return(
        <Center pt={20} flex={1} _dark={{
            bg: "coolGray.800"
          }} _light={{
            bg: "warmGray.50"
          }}>
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
                <Box mt='20' borderRadius={'full'} bg={'white'} justifyContent={'flex-start'} shadow={'5'}>
                    <Input
                        InputLeftElement={<Icon as={AntDesign} name="mail" color="coolGray.800" ml={2} />}
                        placeholder="Email"
                        w="75%"
                        maxWidth="300px"
                        variant="rounded"
                        height={'12'}
                    />
                </Box>
                <Box mt='10' borderRadius={'full'} bg={"white"} justifyContent={'flex-start'} shadow={'5'}>
                    <Input
                        InputLeftElement={<Icon as={AntDesign} name="lock" color="coolGray.800" ml={2} />}
                        placeholder="Password"
                        w="75%"
                        maxWidth="300px"
                        variant="rounded"
                        height={'12'}
                    />
                </Box>
                <Box minWidth="300px" mt='10' borderRadius={'full'} alignItems='flex-end' justifyContent={'flex-end'} shadow={'5'}>
                    <Button bg={'orange.400'} borderRadius={'full'} onPress={toggleColorMode}>
                        <View paddingY={1} flexDirection={'row'} alignItems={'center'}>
                            <Text bold _light={{color: 'white'}} paddingX={2} _dark={{color: "warmGray.50"}}>LOGIN</Text>
                            <Icon as={AntDesign} name="arrowright" color="coolGray.800" _light={{color: 'white'}} _dark={{color: "warmGray.50"}} />
                        </View>
                    </Button>
                </Box>
            </Box>
            <Box m='10' borderRadius={'full'} justifyContent={'flex-start'} flexDirection={'row'}>
                <Text _light={{color:'coolGray.400'}} _dark={{color: "white"}} >Don't have an account? </Text> 
                <TouchableOpacity onPress={()=>NavigationService.navigate(NavigationService.ScreenNames.SignUp)}>
                    <Text bold color={'orange.400'} >Sign up</Text>
                </TouchableOpacity>
            </Box>
        </Center>
    )
});
  