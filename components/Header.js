import React from "react";
import { View, StyleSheet, Platform } from "react-native";

import TitleText from "./TitleText";
import colors from "../constants/colors";

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid }),
      }}
    >
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,

    alignItems: "center",
    justifyContent: "center",
  },
  headerIOS: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: colors.primary,
  },
  title: {
    color: Platform.OS === "ios" ? colors.primary : "white",
  },
});

export default Header;
