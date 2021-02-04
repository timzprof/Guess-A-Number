import React, {useState} from "react";
import {
	View,
	StyleSheet,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

import colors from "../constants/colors";

const StartScreen = props => {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState(0);

	const inputHandler = inputText => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""));
	};

	const resetInputHandler = () => {
		setEnteredValue("");
		setConfirmed(false);
	};

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert("Invalid Number", "Number must be in range 1 - 99", [
				{text: "OK", style: "destructive", onPress: resetInputHandler}
			]);
			return;
		}
		setConfirmed(true);
		setEnteredValue("");
		setSelectedNumber(chosenNumber);
		Keyboard.dismiss();
	};

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<BodyText>You selected</BodyText>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<Button
					title="START GAME"
					onPress={() => {
						props.onStartGame(selectedNumber);
					}}
				/>
			</Card>
		);
	}
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.screen}>
				<TitleText style={styles.title}>Start a new Game</TitleText>
				<Card style={styles.inputContainer}>
					<BodyText>Select a Number</BodyText>
					<Input
						style={styles.input}
						blurOnSubmit
						autoCapitalize="none"
						autoCorrect={false}
						keyboardType="number-pad"
						maxLength={2}
						onChangeText={inputHandler}
						value={enteredValue}
					/>
					<View style={styles.buttonContainer}>
						<View style={styles.button}>
							<Button
								title="Reset"
								color={colors.accent}
								onPress={resetInputHandler}
							/>
						</View>
						<View style={styles.button}>
							<Button
								title="Confirm"
								color={colors.primary}
								onPress={confirmInputHandler}
							/>
						</View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center"
	},
	title: {
		marginVertical: 10
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingHorizontal: 15
	},
	inputContainer: {
		width: 300,
		maxWidth: "80%",
		alignItems: "center"
	},
	button: {
		width: 100
	},
	input: {
		width: 50,
		textAlign: "center"
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: "center"
	}
});

export default StartScreen;
