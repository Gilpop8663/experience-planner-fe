import { ChangeEvent, FormEvent, useState } from "react";
import { useMyProfile } from "@/hooks/query/user/useMyProfile";
import useOpen from "@/hooks/useOpen";
import { useEditProfile } from "@/hooks/mutation/user/useEditProfile";
import { useCheckPassword } from "@/hooks/mutation/user/useCheckPassword";
import { useDeleteAccount } from "@/hooks/mutation/user/useDeleteAccount";

interface FormData {
  prevPassword: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  prevPassword: string;
  password: string;
  confirmPassword: string;
  editPasswordError: string;
}

export const useMyInfo = () => {
  const { user } = useMyProfile();
  const { open, close, isOpen } = useOpen();
  const [formData, setFormData] = useState<FormData>({
    prevPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    prevPassword: false,
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState<FormErrors>({
    prevPassword: "",
    password: "",
    confirmPassword: "",
    editPasswordError: "",
  });
  const deleteModal = useOpen();
  const { handleEditProfile } = useEditProfile();
  const { handleCheckPassword } = useCheckPassword();
  const { handleDeleteAccount } = useDeleteAccount();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShowPassword = (kind: "prev" | "password" | "confirm") => {
    if (kind === "prev") {
      setShowPassword((prev) => ({
        ...prev,
        prevPassword: !prev.prevPassword,
      }));
      return;
    }

    if (kind === "password") {
      setShowPassword((prev) => ({
        ...prev,
        password: !prev.password,
      }));
      return;
    }

    setShowPassword((prev) => ({
      ...prev,
      confirmPassword: !prev.confirmPassword,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      editPasswordError: "",
      prevPassword: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.password) newErrors.password = "비밀번호를 입력해주세요.";
    else if (formData.password.length < 8)
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const passwordResult = await handleCheckPassword({
        password: formData.prevPassword,
      });

      if (!passwordResult.data?.checkPassword.ok) {
        setErrors((prev) => ({
          ...prev,
          prevPassword:
            passwordResult.data?.checkPassword.error ||
            "비밀번호가 맞지 않습니다.",
        }));

        return;
      }

      const result = await handleEditProfile({
        nickname: user.nickname,
        password: formData.password,
      });

      if (!result.data?.editProfile.ok) {
        setErrors((prev) => ({
          ...prev,
          editPasswordError:
            result.data?.editProfile.error || "비밀번호 변경에 실패했습니다.",
        }));
        return;
      }

      setFormData({
        confirmPassword: "",
        password: "",
        prevPassword: "",
      });

      close();
    }
  };

  const handleDelete = async () => {
    await handleDeleteAccount({ userId: user.id });
    deleteModal.close();
  };

  return {
    user,
    isOpen,
    open,
    handleChange,
    handleSubmit,
    showPassword,
    formData,
    errors,
    handleShowPassword,
    deleteModal,
    handleDelete,
  };
};
