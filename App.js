import React, {useState} from "react";
import {StyleSheet, SafeAreaView} from "react-native";
import * as Font from "expo-font";
import {AppLoading} from "expo";

import Header from "./components/Header";
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
	return Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
	});
};

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [guessRounds, setGuessRounds] = useState(0);
	const [dataLoaded, setDataLoaded] = useState(false);

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
				onError={err => console.log(err)}
			/>
		);
	}

	const configureNewGameHandler = () => {
		setGuessRounds(0);
		setUserNumber(null);
	};
	const startGameHandler = selectedNumber => {
		setUserNumber(selectedNumber);
		setGuessRounds(0);
	};
	const gameOverHandler = noOfRounds => {
		setGuessRounds(noOfRounds);
	};
	let content = <StartScreen onStartGame={startGameHandler} />;

	if (userNumber && guessRounds <= 0) {
		content = (
			<GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
		);
	} else if (guessRounds > 0) {
		content = (
			<GameOverScreen
				roundsNo={guessRounds}
				userNo={userNumber}
				onRestartGame={configureNewGameHandler}
			/>
		);
	}
	return (
		<SafeAreaView style={styles.screen}>
			<Header title="Guess A Number" />
			{content}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1
	}
});
