import React from "react";
import { Easing, Animated } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

import { Block } from "galio-framework";

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import AnomalyNotisDetail from "../screens/AnomalyNotisDetail";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
import RegisterVisitor from "../screens/RegisterVisitor";
import Visitor from "../screens/Visitor";
import Statistics from "../screens/Statistics";
import VisitorDetails from "../screens/VisitorDetails";
import todayVisitor from "../screens/todayVisitor";
import ManageVisitors from "../screens/ManageVisitors";

import ManageVisitorDetails from "../screens/ManageVisitorDetails";
import TodayVisitorDetails from "../screens/TodayVisitorDetails";
import VisitorHistory from "../screens/VisitorHistory";
import Logout from "../screens/Logout";
import Anomalies from "../screens/Anomalies";
import AnomalyDetail from "../screens/AnomalyDetail";
import AnomaliesStats from "../screens/AnomaliesStats";
import VisitorsStats from "../screens/VisitorsStats";

import AboutUs from "../screens/AboutUs";

// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";

// header for screens
import Header from "../components/Header";
import Register from "../screens/Register";
import Privacy from "../screens/Privacy";
import AnomalyNotis from "../screens/AnomalyNotis";

import PicCamera from "../screens/PicCamera";



const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Search";

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const ElementsStack = createStackNavigator({
  Elements: {
    screen: Elements,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Elements" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ArticlesStack = createStackNavigator({
  Articles: {
    screen: Articles,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Articles" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white transparent title="Profile" iconColor={'#FFF'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
    transitionConfig
  }
);

const HomeStack = createStackNavigator(
  {
      Login: {
          screen: Login,
          navigationOptions: ({ navigation }) => ({
              headerTransparent: true
          })
      },
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="Home" navigation={navigation} />
      })
    },
      PicCamera: {
          screen: PicCamera,
          navigationOptions: ({ navigation }) => ({
              headerTransparent: true
          })
      },
      RegisterVisitor: {
          screen: RegisterVisitor,
          navigationOptions: ({ navigation }) => ({
              header: <Header search options title="Register Visitor" navigation={navigation} />
          })
      },
      Visitor: {
          screen: Visitor,
          navigationOptions: ({navigation}) => ({
              header: <Header search options title="Visitors" navigation={navigation}/>
          })
      },
      VisitorDetails: {
          screen: VisitorDetails,
          navigationOptions: ({navigation}) => ({
              header: <Header search options title="Visitor Details" navigation={navigation}/>
          })
      },
      VisitorHistory: {
          screen: VisitorHistory,
          navigationOptions: ({navigation}) => ({
              header: <Header search options title="Visitor History" navigation={navigation}/>
          })
      },
      ManageVisitorDetails: {
        screen: ManageVisitorDetails,
          navigationOptions: ({navigation}) => ({
              header: <Header search options title="Manage Visitor Details" navigation={navigation}/>
          })
    },
      todayVisitor: {
          screen: todayVisitor,
          navigationOptions: ({ navigation }) => ({
              header: (<Header search options title="Today Visitors" navigation={navigation}/>
              ),
          })
      },
      TodayVisitorDetails: {
        screen: TodayVisitorDetails,
          navigationOptions: ({ navigation }) => ({
              header: (<Header search options title="Today Visitor Details" navigation={navigation}/>
              ),
          })
    },
      ManageVisitors: {
          screen: ManageVisitors,
          navigationOptions: ({ navigation }) => ({
                  header: (<Header search options title="Manage Visitors" navigation={navigation}/>
              ),
          })
      },
      Anomalies: {
          screen: Anomalies,
          navigationOptions: ({navigation}) => ({
              header: <Header search options title="Anomalies" navigation={navigation}/>
          })
      },
      AnomalyDetail: {
          screen: AnomalyDetail,
          navigationOptions: ({navigation}) => ({
              header: <Header search options title="Anomaly Images" navigation={navigation}/>
          })
      },


  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const RegisterVisitorStack = createStackNavigator(
    {
        PicCamera: {
            screen: PicCamera,
            navigationOptions: ({ navigation }) => ({
                headerTransparent: true
            })
        },
        RegisterVisitor: {
            screen: RegisterVisitor,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <Header left={<Block />} white transparent title="" navigation={navigation} />
                ),
                headerTransparent: true
            })
        }

    },
    {
        cardStyle: {
            backgroundColor: "#F8F9FE"
        },
        transitionConfig
    }
);
const AnomalyStack = createStackNavigator(
    {
      AnomalyNotis: {
        screen: AnomalyNotis,
        navigationOptions: ({navigation}) => ({
          header: <Header search options title="Anomaly Alert" navigation={navigation}/>
        })
      },
        AnomalyNotisDetail: {
            screen: AnomalyNotisDetail,
            navigationOptions: ({ navigation }) => ({
                headerTransparent: true
            })
        },

    }
);
const StatisticsStack = createStackNavigator(
    {
        Statistics: {
            screen: Statistics,
            navigationOptions: ({navigation}) => ({
                header: <Header search options title="Statistics" navigation={navigation}/>
            })
        },
        VisitorsStats: {
            screen: VisitorsStats,
            navigationOptions: ({navigation}) => ({
                header: <Header search options title="Visitors Stats" navigation={navigation}/>
            })
        },
        AnomaliesStats: {
            screen: AnomaliesStats,
            navigationOptions: ({navigation}) => ({
                header: <Header search options title="Anomalies Stats" navigation={navigation}/>
            })
        },

    }
);
const AccountStack = createStackNavigator(
    {


      Register: {
        screen: Register,
        navigationOptions: ({navigation}) => ({
          headerTransparent: true
        })
      },
    Privacy:{
  screen: Privacy,
      navigationOptions: ({ navigation }) => ({
    headerTransparent: true
  })
},
},
    {
      cardStyle: { backgroundColor: "#FFFFFF" },
      transitionConfig
    }
);

const LogoutStack = createStackNavigator(
    {
        Logout: {
            screen: Logout,
            navigationOptions: ({ navigation }) => ({
                header: (
                    <Header left={<Block />} white transparent title="" navigation={navigation} />
                ),
                headerTransparent: true
            })
        },

    },
    {
        cardStyle: { backgroundColor: "#FFFFFF" },
        transitionConfig
    }
);

const OnboardingStack = createStackNavigator(
    {
        Onboarding: {
            screen: Onboarding,
            navigationOptions: ({ navigation }) => ({
                headerTransparent: true
            })
        },
        AboutUs: {
            screen: AboutUs,
            navigationOptions: ({ navigation }) => ({
                headerTransparent: true
            })
        },


    },
    {
        cardStyle: { backgroundColor: "#FFFFFF" },
        transitionConfig
    }
);


// d
const AppStack = createDrawerNavigator(
  {
      OnboardingStack: {
      screen: OnboardingStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
      Account: {
          screen: AccountStack,
          navigationOptions: {
              drawerLabel: () => {}
          }
      },
      Home: {
          screen: HomeStack,
          navigationOptions: navOpt => ({
              drawerLabel: ({ focused }) => (
                  <DrawerItem focused={focused} title="Home" />
              )
          })
      },
      Profile: {
          screen: ProfileStack,
          navigationOptions: navOpt => ({
              drawerLabel: ({ focused }) => (
                  <DrawerItem focused={focused} screen="Profile" title="Profile" />
              )
          })
      },

    Elements: {
      screen: ElementsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Elements" title="Elements" />
        )
      })
    },
    Articles: {
      screen: ArticlesStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Articles" title="Articles" />
        )
      })
    },
      StatisticsStack: {
          screen: StatisticsStack,
          navigationOptions: navOpt => ({
              drawerLabel: ({ focused }) => (
                  <DrawerItem focused={focused} screen="StatisticsStack" title="Statistics"  />
              )
          })
      },

      Logout: {
          screen: LogoutStack,
          navigationOptions: navOpt => ({
              drawerLabel: ({ focused }) => (
                  <DrawerItem focused={focused} screen="Logout" title="Logout" />
              )
          })
      },
      Anomaly:{
          screen:AnomalyStack,
          navigationOptions: navOpt => ({
              drawerLabel: () => {}
          })
      },


  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
