import React, { useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import CreatePostsLayout from "../container/CreatePostsLayout";

const CreatePosts = props => {
  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <CreatePostsLayout />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {}
});

export default CreatePosts;
