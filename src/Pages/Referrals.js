import React, { useState, useEffect } from "react";
import { View, AsyncStorage, Alert } from "react-native";
import ReferralsList from "../container/ReferralsList";
import Api from "../../utils/api";
import Tips from "../components/Tips";

const Referrals = props => {
  const [Loading, setLoading] = useState(true);
  const [UserData, setUserData] = useState({});
  const [Referrals, setReferrals] = useState([]);

  useEffect(() => {
    getUserLocalData();
  }, [props]);

  getUserLocalData = async () => {
    try {
      let user = await AsyncStorage.getItem("user_data");
      setUserData(JSON.parse(user));

      getReferredUsers();
    } catch (error) {
      console.log("Error local storage: ", error);
    }
  };

  getReferredUsers = async () => {
    try {
      let answer = await Api.getReferredUsers(UserData.id_users);

      if (answer.error) {
        Alert.alert(answer.title, answer.msg);
      } else {
        setReferrals(answer.referred);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error query referred: ", error);
    }
  };

  return (
    <View>
      <Tips
        tipsMsg="Esta es la lista de usuarios que han usado tu código de referido.
          Código:"
        codeReferral={UserData.id_users}
      />

      <ReferralsList referrals={Referrals} loading={Loading} />
    </View>
  );
};

Referrals.navigationOptions = {
  title: "Referidos"
};

export default Referrals;
