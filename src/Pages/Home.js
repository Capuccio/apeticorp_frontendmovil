import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  AsyncStorage
} from "react-native";
import * as Network from "expo-network";
import { LinearGradient } from "expo-linear-gradient";
import Api from "../../utils/api";
import PostsLists from "../container/PostsLists";
import HeaderHome from "../components/Headers/HeaderHome";

const Home = props => {
  const [PagePost, setPagePost] = useState(2);
  const [Loading, setLoading] = useState({
    pageLoading: true,
    refreshLoading: false,
    footerLoading: false
  });
  const [PostsData, setPostsData] = useState([]);
  const [UserData, setUserData] = useState({});

  useEffect(() => {
    getNewPosts("pageLoading", 1);
  }, [props]);

  getNewPosts = async (whatRefresh, newPage) => {
    let posts = await getAllPosts(newPage);
    setPostsData(posts);

    setPagePost(2);

    let userLocalData = await AsyncStorage.getItem("user_data");
    setUserData(JSON.parse(userLocalData));

    setLoading({
      ...Loading,
      [whatRefresh]: false
    });
  };

  getOldPosts = async () => {
    setLoading({
      ...Loading,
      footerLoading: true
    });

    let posts = await getAllPosts(PagePost);
    if (posts.length > 0) {
      let principalArray = PostsData.slice();

      let newPrincipalArray = principalArray.concat(posts);

      setPostsData(newPrincipalArray);
      setPagePost(PagePost + 1);
    }

    setLoading({
      ...Loading,
      footerLoading: false
    });
  };

  getAllPosts = async Page => {
    try {
      let connectionData = await Network.getNetworkStateAsync();

      if (connectionData.isConnected) {
        let data = await Api.getAllPosts(Page);

        if (data.error) {
          Alert.alert(data.msg);
          return [];
        } else {
          return data.posts;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  likeClick = async idPost => {
    let PostsArray = PostsData.slice();
    for (let i = 0; i < PostsArray.length; i++) {
      if (PostsArray[i]._id == idPost) {
        if (PostsArray[i].likesNumber.indexOf(UserData.id_users) > -1) {
          PostsArray[i].likesNumber.splice(
            PostsArray[i].likesNumber.indexOf(UserData.id_users),
            1
          );
        } else {
          PostsArray[i].likesNumber.push(UserData.id_users);
        }
      }
    }

    setPostsData(PostsArray);
    const like = await Api.likePost({ idPost, idUser: UserData.id_users });

    if (like.error) {
      Alert.alert("Error", like.msg);
    }
  };

  createPosts = () => {
    props.navigation.navigate("CreatePosts");
  };

  notificationsPage = () => {
    props.navigation.navigate("Notifications");
  };

  if (Loading.pageLoading) {
    return (
      <View style={styles.Container}>
        <ActivityIndicator size="large" color="#262121" />
      </View>
    );
  } else {
    return (
      <LinearGradient colors={["#691919", "#262121"]}>
        <PostsLists
          postData={PostsData}
          likeClick={likeClick}
          myAccount={UserData}
          navigation={props.navigation}
          loading={Loading}
          getOldPosts={getOldPosts}
          getNewPosts={getNewPosts}
        />
      </LinearGradient>
    );
  }
};

Home.navigationOptions = {
  header: <HeaderHome />
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Home;
