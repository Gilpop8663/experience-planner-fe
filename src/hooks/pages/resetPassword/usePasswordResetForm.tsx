import { useResetPassword } from "@/hooks/mutation/user/useResetPassword";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const usePasswordResetForm = () => {
  const { token } = useParams(); // URL에서 토큰을 가져옵니다.
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { handleResetPassword } = useResetPassword();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const result = await handleResetPassword({
        code: token ?? "",
        newPassword: password,
      });

      if (!result.data?.resetPassword.ok) {
        setError(
          result.data?.resetPassword.error || "비밀번호 재설정에 실패했습니다.",
        );
        return;
      }

      setSuccess("비밀번호가 성공적으로 재설정되었습니다.");
      navigate("/login");
    } catch (err) {
      setError("서버에 문제가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  return {
    handleChange,
    handleSubmit,
    password,
    confirmPassword,
    error,
    success,
  };
};
