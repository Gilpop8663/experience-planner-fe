import { useSendVerifyEmail } from "@/hooks/mutation/verification/useSendVerifyEmail";
import { ChangeEvent, FormEvent, useState } from "react";
import { useVerificationCode } from "./useVerificationCode";
import { useCheckEmail } from "@/hooks/mutation/user/useCheckEmail";
import { useCreateAccount } from "@/hooks/mutation/user/useCreateAccount";
import { useLogin } from "@/hooks/mutation/user/useLogin";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "@/constants/localStorage";
import { ROUTES } from "@/router/routes";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email: string;
  password: string;
  confirmPassword: string;
}

// 커스텀 훅 정의
export const useSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { handleSendVerifyEmail } = useSendVerifyEmail();
  const verificationCode = useVerificationCode(formData.email);
  const { handleCheckEmail } = useCheckEmail();
  const [showPassword, setShowPassword] = useState(false);
  const [showVerificationField, setShowVerificationField] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  // 이메일 인증 성공 여부를 관리하는 상태 변수
  const [isVerificationSuccess, setIsVerificationSuccess] = useState(false);
  const [isCheckNicknameSuccess, setIsCheckNicknameSuccess] = useState(false);
  const [verificationError, setVerificationError] = useState(""); // 오류 메시지 상태
  const [createAccountError, setCreateAccountError] = useState(""); // 오류 메시지 상태
  const { handleCreateAccount } = useCreateAccount();
  const { handleLogin, prefetchMyProfile } = useLogin();

  const handleVerificationCode = async () => {
    const result = await verificationCode.handleVerificationCode();

    if (result.data?.verifyEmail?.ok) {
      setIsVerificationSuccess(true); // 인증 성공
    } else {
      setVerificationError(
        result.data?.verifyEmail?.error || "인증번호가 올바르지 않습니다.",
      ); // 오류 메시지 설정
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setShowVerificationField(false);
      verificationCode.resetInputValue();
      setIsVerificationSuccess(false);
    }

    if (name === "nickname") {
      setIsCheckNicknameSuccess(false);
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.email) newErrors.email = "이메일을 입력해주세요.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "유효한 이메일 주소를 입력해주세요.";

    if (!formData.password) newErrors.password = "비밀번호를 입력해주세요.";
    else if (formData.password.length < 8)
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";

    if (!isVerificationSuccess) newErrors.email = "이메일 인증을 완료해주세요.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await handleCreateAccount({
        email: formData.email,
        password: formData.password,
      });

      if (!result.data?.createAccount.ok) {
        setCreateAccountError(
          result.data?.createAccount.error || "계정 생성에 실패했습니다.",
        );

        return;
      }

      const loginResult = await handleLogin({
        email: formData.email,
        password: formData.password,
        rememberMe: false,
      });

      if (loginResult.data?.login.ok) {
        const { token } = loginResult.data.login;

        localStorage.setItem(ACCESS_TOKEN, token ?? "");
        await prefetchMyProfile();
        navigate(ROUTES.HOME);
        return;
      }

      setCreateAccountError(
        loginResult.data?.login.error || "자동 로그인에 실패했습니다.",
      );
    }
  };

  const handleSendVerification = async () => {
    // 인증번호 발송 로직을 여기에 추가

    let emailError: string = "";

    if (!formData.email) emailError = "이메일을 입력해주세요.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      emailError = "유효한 이메일 주소를 입력해주세요.";

    if (emailError.length > 0) {
      setErrors((prev) => ({
        ...prev,
        email: emailError,
      }));

      return;
    }

    const result = await handleCheckEmail({ email: formData.email });

    if (!result.data?.checkEmail.ok) {
      emailError = "이미 사용 중인 이메일 주소입니다.";
    }

    if (emailError.length > 0) {
      setErrors((prev) => ({
        ...prev,
        email: emailError,
      }));

      return;
    }

    await handleSendVerifyEmail({
      email: formData.email,
    });

    setErrors((prev) => ({
      ...prev,
      email: "",
    }));

    setShowVerificationField(true);
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    errors,
    formData,
    showPassword,
    showVerificationField,
    handleChange,
    handleSubmit,
    handleSendVerification,
    handleShowPassword,
    verificationCode,
    isVerificationSuccess,
    verificationError,
    handleVerificationCode,
    isCheckNicknameSuccess,
    createAccountError,
  };
};
