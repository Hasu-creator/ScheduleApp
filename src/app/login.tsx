import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter, Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import SocialButtons from "../components/SocialButtons";

export default function SignInScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const handleGoHomeScreen = () => {
    try {
      router.replace("/(tabs)/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>
          Hi, welcome back, you've been missed
        </Text>

        {/* Email */}
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

        {/* Password */}
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

        {/* Remember me & Forgot password */}
        <View style={styles.row}>
          <Pressable
            onPress={() => setRememberMe((prev) => !prev)}
            style={styles.checkboxRow}
          >
            <Ionicons
              name={rememberMe ? "checkbox" : "square-outline"}
              size={20}
              color="#3979ED"
            />
            <Text style={styles.rememberText}>Remember me</Text>
          </Pressable>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.button} onPress={handleGoHomeScreen}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Or Continue With */}
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or continue with</Text>
          <View style={styles.line} />
        </View>

        {/* Social Buttons */}
        <SocialButtons />

        {/* Sign Up Link */}
        <Text style={styles.footerText}>
          Don’t have an account?{" "}
          <Text style={styles.link} onPress={() => router.push("/signup")}>
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
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
  eyeIcon: {
    paddingHorizontal: 4,
  },
  iconEye: {
    color: "#A4A6AB",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    marginLeft: 6,
    color: "#3979ED",
    fontSize: 14,
  },
  forgotText: {
    color: "#3979ED",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#3979ED",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#999",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  link: {
    color: "#3366FF",
  },
});
