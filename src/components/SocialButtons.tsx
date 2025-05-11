import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SocialButtons() {
  return (
    <View style={styles.container}>
      <Button
        icon={() => <Icon name="google" size={20} />}
        mode="contained"
        style={[styles.button]}
      >
        Continue with Google
      </Button>
      <Button
        icon={() => <Icon name="apple" size={20} />}
        mode="contained"
        style={[styles.button]}
      >
        Continue with Apple
      </Button>
      <Button
        icon={() => <Icon name="facebook" size={20} />}
        mode="contained"
        style={[styles.button]}
      >
        Continue with Facebook
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  button: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderColor: "#CDCCCF",
    borderWidth: 1,
    color: "#000000",
    fontFamily: "Inter_500Medium",
  },
});
