import { ACCESS_TOKEN } from "@/constants/localStorage";
import { useLogin } from "@/hooks/mutation/user/useLogin";
import { ROUTES } from "@/router/routes";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { handleLogin, prefetchMyProfile, loading } = useLogin();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const loginResult = await handleLogin({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      if (loginResult.data?.login.ok) {
        const { token } = loginResult.data.login;

        localStorage.setItem(ACCESS_TOKEN, token ?? "");
        await prefetchMyProfile();
        navigate(ROUTES.HOME);
        return;
      }

      setError(loginResult.data?.login.error || "로그인에 실패했습니다.");
    } catch (err) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    handleChange,
    handleSubmit,
    formData,
    showPassword,
    handleShowPassword,
    error,
    loading,
  };
};
