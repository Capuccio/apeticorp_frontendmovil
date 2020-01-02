import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Button,
  Alert
} from "react-native";
import Tips from "../components/Tips";
import Api from "../../utils/api";

const Exchange = () => {
  const [IdUser, setIdUser] = useState();
  const [Exchange, setExchange] = useState({
    msg: "Canjear",
    disabled: false
  });

  useEffect(() => {
    getLocalData = async () => {
      try {
        let user = await AsyncStorage.getItem("user_data");
        let userJson = JSON.parse(user);
        setIdUser(userJson.id_users);
      } catch (error) {
        console.log("Error query local user: ", error);
      }
    };

    getLocalData();
  }, []);

  validateExchange = async () => {
    setExchange({
      msg: "Canjeando, por favor espere",
      disabled: true
    });

    let answer = await Api.exchangePoints(IdUser);

    Alert.alert(answer.title, answer.msg);

    setExchange({
      msg: "Canjear",
      disabled: false
    });
  };

  return (
    <View>
      <Tips
        tipsMsg="Cuando la cantidad de Referidos llegue a 50, podrás canjear una rebaja
          en los cursos de Apeticorp"
      />

      <View style={styles.Button}>
        <Button
          title={Exchange.msg}
          color="#d14141"
          disabled={Exchange.disabled}
          onPress={validateExchange}
        />
      </View>
    </View>
  );
};

Exchange.navigationOptions = {
  title: "Canjear"
};

const styles = StyleSheet.create({
  Button: {
    marginTop: "20%"
  }
});

export default Exchange;
