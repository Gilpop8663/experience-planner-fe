import { useVerifyEmail } from "@/hooks/mutation/verification/useVerifyEmail";
import { useFormInput } from "@/hooks/useInput";

// 커스텀 훅 정의
export const useVerificationCode = (email: string) => {
  const { handleVerifyEmail } = useVerifyEmail();
  const { onChange, value, resetInputValue } = useFormInput();

  const handleVerificationCode = async () => {
    const result = await handleVerifyEmail({ email, code: value });

    return result;
  };

  return {
    onChange,
    value,
    handleVerificationCode,
    resetInputValue,
  };
};
