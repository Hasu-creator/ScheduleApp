import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../images/bg_home.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Image
        source={require("../images/bg_radiant1.png")}
        style={styles.imageBg1}
      />
      <Image
        source={require("../images/bg_radiant2.png")}
        style={styles.imageBg2}
      />
      <Text style={styles.title}>Ready to own your{"\n"}study time?</Text>
      <Text style={styles.subtitle}>
        Create schedules, track progress, and never{"\n"}miss a deadline again.
      </Text>

      <Button style={styles.button} onPress={() => router.push("/signup")}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    position: "relative",
  },
  image: {
    width: 390,
    height: 418,
    marginBottom: 20,
    zIndex: 1,
  },
  imageBg1: {
    position: "absolute",
    top: 75,
    left: 112,
    width: 274,
    height: 335,
    zIndex: 0,
  },
  imageBg2: {
    position: "absolute",
    width: 223,
    height: 202,
    bottom: 0,
    left: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Inter_700Bold",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
    fontFamily: "Inter_400Regular",
  },
  button: {
    backgroundColor: "##F9FAFB",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "##F9FAFB",
  },
  buttonText: {
    color: "#000",
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
  },
});
