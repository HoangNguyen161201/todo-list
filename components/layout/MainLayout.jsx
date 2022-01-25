import { DrawerActions } from "@react-navigation/native";
import { useColorModeValue, VStack } from "native-base";
import Header from "../common/Header";

export default function MainLayout({ children, navigation }) {
    const openMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer())
    }

    const bgScheme = useColorModeValue('#40514E', '#F5F5F5');
   
    return (

        <VStack background={bgScheme} paddingTop={42} flex={1}>
            <Header openMenu={openMenu} bgScheme={bgScheme} />
            {
                children
            }
        </VStack>
    )
}
