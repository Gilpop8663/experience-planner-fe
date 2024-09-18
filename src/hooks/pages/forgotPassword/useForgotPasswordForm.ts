import { useForgotPassword } from "@/hooks/mutation/user/useForgotPassword";
import { ChangeEvent, FormEvent, useState } from "react";

export const useForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { handleForgotPassword } = useForgotPassword();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const result = await handleForgotPassword({ email });

      if (!result.data?.forgotPassword.ok) {
        setError(
          result.data?.forgotPassword.error || "이메일 전송에 실패했습니다.",
        );
        return;
      }

      setSuccess("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
    } catch (err) {
      setError("서버에 문제가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  return { email, handleChange, handleSubmit, error, success };
};
