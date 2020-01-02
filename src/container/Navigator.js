import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome
} from "@expo/vector-icons";
import Login from "../Login";
import Register from "../Register";
import Loading from "./Loading";
import Home from "../Pages/Home";
import Settings from "../Pages/Settings";
import CreatePosts from "../Pages/CreatePosts";
import CommentPost from "../Pages/CommentPost";
import Referrals from "../Pages/Referrals";
import Exchange from "../Pages/Exchange";
import Notifications from "../Pages/Notifications";
import Exit from "../Pages/Exit";

const HomePage = createStackNavigator({
  Home,
  CreatePosts,
  CommentPost,
  Notifications
});

const SettingsPage = createStackNavigator({
  Settings
});

const ReferralsPage = createStackNavigator({
  Referrals
});

const ExchangePage = createStackNavigator({
  Exchange
});

const MainNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: {
        tabBarLabel: "Inicio",
        tabBarIcon: (
          <MaterialCommunityIcons name="home-outline" size={30} color="red" />
        )
      }
    },
    Referrals: {
      screen: ReferralsPage,
      navigationOptions: {
        tabBarLabel: "Referidos",
        tabBarIcon: <Feather name="users" size={27} color="red" />
      }
    },
    Exchange: {
      screen: ExchangePage,
      navigationOptions: {
        tabBarLabel: "Canjear",
        tabBarIcon: <FontAwesome name="exchange" size={30} color="red" />
      }
    },
    Settings: {
      screen: SettingsPage,
      navigationOptions: {
        tabBarLabel: "Configuración",
        tabBarIcon: <Feather name="settings" size={28} color="red" />
      }
    },
    Exit: {
      screen: Exit,
      navigationOptions: {
        tabBarLabel: "Salir",
        tabBarIcon: <Ionicons name="md-exit" size={30} color="red" />
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    App: MainNavigator,
    Login,
    Register,
    Loading
  },
  {
    initialRouteName: "Loading",
    mode: "modal",
    headerMode: "none",
    cardStyle: {
      backgroundColor: "#691919"
    }
  }
);

export default createAppContainer(SwitchNavigator);
