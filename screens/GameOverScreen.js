import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

import Colors from "../constants/colors";

const GameOverScreen = (props) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.screen}>
          <TitleText>The Game is over!</TitleText>
          <View style={styles.imageContainer}>
            <Image
              //source={require("../assets/success.png")}
              source={{
                uri:
                  "https://media.npr.org/assets/img/2014/07/17/clark-little-big-blue-1000-oahu-hawaii_custom-a6621d6bfe11ce7277b045c77bbcecefa19b6c1f-s800-c85.jpg",
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>
              Your phone needed{" "}
              <Text style={styles.highlight}>{props.roundsNo}</Text> rounds to guess
              the number <Text style={styles.highlight}>{props.userNo}</Text>
            </BodyText>
          </View>
          <MainButton onPress={props.onRestartGame}>NEW GAME</MainButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 60,
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
