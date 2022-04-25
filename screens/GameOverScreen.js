import { View, Text, Image, StyleSheet } from "react-native";

import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import CustomButton from "../components/ui/CustomButton";

const GameOverScreen = ({roundsNumber, userNumber, onStartNewGame }) => {
  return (
    <View style={styles.rootContiner}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/images/success.png")} />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number{" "}
        <Text style={styles.highlight}>{userNumber}</Text>
      </Text>
      <CustomButton onPress={onStartNewGame}>Start New Game</CustomButton>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContiner: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: 200,
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500
  }
});
