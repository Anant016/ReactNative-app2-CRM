import {createBottomTabNavigator,
    createStackNavigator,
    createAppContainer,
    BottomTabBar,
    createMaterialBottomTabNavigator,
    createSwitchNavigator,
    createDrawerNavigator
} from 'react-navigation'

import PeopleList from './PeopleList';
import AddPerson from './AddPeople'
import CompanyList from './CompanyList'


const NavigationBar =createSwitchNavigator({
    PeopleList,
    CompanyList,
    AddPerson:{screen:AddPerson}
}, {
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: '#80cbc4',
        swipeEnabled: true,
        showLabel: true,
        style: {
            backgroundColor: '#26a69a',
        },
    },
})

const Navigation=createAppContainer(NavigationBar)

export default Navigation;