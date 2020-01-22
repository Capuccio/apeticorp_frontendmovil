import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Api from "../../../utils/api";

const Referrals = props => {
  const [User, setUser] = useState({});

  useEffect(() => {
    getUserData = async () => {
      let answer = await Api.getUserData(props.id_referred);
      setUser(answer.user);
    };

    getUserData();
  }, []);

  return (
    <View style={styles.Container}>
      <View>
        {User.use_picture != null ? (
          <Image
            source={{ uri: User.use_picture }}
            style={{ width: 32, height: 32, borderRadius: 20 }}
          />
        ) : (
          <Text>👤</Text>
        )}
      </View>
      <Text style={{ marginLeft: 5 }}>
        {User.use_name} {User.use_lastname}
      </Text>
      <Text> ✉️ {User.use_email} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    alignItems: "center"
  }
});

export default Referrals;
