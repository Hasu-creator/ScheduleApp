import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { LinearGradient } from "expo-linear-gradient";

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, authError, loading, user, clearAuthError } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSignUp = async () => {
    setLocalError("");

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    await signUp(email, password);
  };
  useEffect(() => {
    if (!loading && user) {
      router.replace("/(tabs)/home");
    }
  }, [user, loading]);
  useEffect(() => {
    if (authError || localError) {
      Alert.alert("Sign Up Failed", authError || localError, [
        {
          text: "OK",
          onPress: () => {
            clearAuthError();
            setLocalError("");
          },
        },
      ]);
    }
  }, [authError, localError]);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFE7D4CC", "#BBC8F8"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
      />

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create a new account</Text>

        {/* Username Field */}
        <Text style={styles.label}>Username</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="person" size={24} style={styles.icon} />
          <TextInput
            placeholder="Enter username"
            placeholderTextColor="#A4A6AB"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>

        {/* Email Field */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail" size={24} style={styles.icon} />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#A4A6AB"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        {/* Password Field */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed" size={24} style={styles.icon} />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#A4A6AB"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <Pressable
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              style={styles.iconEye}
            />
          </Pressable>
        </View>

        {/* Confirm Password Field */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed" size={24} style={styles.icon} />
          <TextInput
            placeholder="Confirm your password"
            placeholderTextColor="#A4A6AB"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
          />
        </View>

        {/* Submit */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.link} onPress={() => router.push("/login")}>
            Sign in
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: {
    marginTop: 60,
    marginLeft: 20,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 8,
    alignSelf: "flex-start",
    elevation: 2,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
    marginBottom: 4,
    marginTop: 12,
    fontFamily: "Inter_500Medium",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginBottom: 4,
    width: "100%",
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 14,
  },
  icon: {
    marginRight: 8,
    color: "#A4A6AB",
  },
  iconEye: {
    color: "#A4A6AB",
  },
  eyeIcon: {
    paddingHorizontal: 4,
    color: "#A4A6ABF",
  },
  button: {
    backgroundColor: "#3979ED",
    borderRadius: 8,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
  link: {
    color: "#3366FF",
    fontFamily: "Inter_400Regular",
  },
});
