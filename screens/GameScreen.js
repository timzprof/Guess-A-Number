import React, {useState, useRef, useEffect} from "react";
import {View, StyleSheet, Button, Alert} from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import MainButton from '../components/MainButton';

import DefaultStyles from "../constants/default-styles";

const generateRandomNumBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomNumBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

const GameScreen = props => {
	const {userChoice, onGameOver} = props;
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomNumBetween(1, 100, userChoice)
	);
	const [rounds, setRounds] = useState(0);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);
	
	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(rounds);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = direction => {
		if (
			(direction === "lower" && currentGuess < userChoice) ||
			(direction === "greater" && currentGuess > userChoice)
		) {
			Alert.alert("Don't lie", "You know this is wrong bruh", [
				{text: "Sorry", style: "cancel"}
			]);
			return;
		}
		if (direction === "lower") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess;
		}
		const nextNumber = generateRandomNumBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		setRounds(currentRounds => currentRounds + 1);
	};
	return (
		<View style={styles.screen}>
			<BodyText style={DefaultStyles.title}>Opponents Guess</BodyText>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton title="LOWER" onPress={() => nextGuessHandler("lower")} />
				<MainButton title="GREATER" onPress={() => nextGuessHandler("greater")} />
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center"
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		width: 400,
		maxWidth: "90%"
	}
});

export default GameScreen;
