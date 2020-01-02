import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import Referrals from "../components/Referrals/Referrals";
import ListEmpty from "../components/Referrals/ListEmpty";

const ReferralsList = props => {
  renderItem = ({ item }) => {
    return <Referrals {...item} />;
  };

  listEmpty = () => {
    return <ListEmpty />;
  };

  if (props.loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#262121" />
      </View>
    );
  } else {
    return (
      <FlatList
        data={props.referrals}
        keyExtractor={item => item.id_referrals.toString()}
        renderItem={renderItem}
        ListEmptyComponent={listEmpty}
      />
    );
  }
};

export default ReferralsList;
