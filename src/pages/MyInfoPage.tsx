import React, { ChangeEvent, FormEvent, Suspense, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { useMyProfile } from "@/hooks/query/user/useMyProfile";
import useOpen from "@/hooks/useOpen";
import { Eye, EyeOff } from "lucide-react";
import { useEditProfile } from "@/hooks/mutation/user/useEditProfile";
import { useCheckPassword } from "@/hooks/mutation/user/useCheckPassword";
import ExpiredCampaignListSortedByDeadline from "@/fetchers/ExpiredCampaignListSortedByDeadline";
import { useDeleteAccount } from "@/hooks/mutation/user/useDeleteAccount";
import DeleteAccountModal from "@/components/modal/DeleteAccountModal";

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

const ExperienceRegistration: React.FC = () => {
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

  return (
    <Layout>
      <Card className="w-full max-w-3xl mx-auto mt-28">
        <CardHeader>
          <CardTitle>사용자 정보</CardTitle>
        </CardHeader>
        <CardContent>
          {!isOpen && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span>이메일: </span>
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>닉네임: </span>
                <span>{user.nickname}</span>
              </div>
              <Button onClick={open}>비밀번호 변경하기</Button>
            </div>
          )}
          {isOpen && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-2">
                <span>이메일: </span>
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>닉네임: </span>
                <span>{user.nickname}</span>
              </div>
              <div>
                <Label htmlFor="prevPassword">이전 비밀번호</Label>
                <div className="mt-1 relative">
                  <Input
                    id="prevPassword"
                    name="prevPassword"
                    type={showPassword.prevPassword ? "text" : "password"}
                    autoComplete="current-password"
                    minLength={8}
                    maxLength={64}
                    required
                    value={formData.prevPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => handleShowPassword("prev")}
                  >
                    {showPassword.prevPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {errors.prevPassword && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.prevPassword}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="password">새로운 비밀번호</Label>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword.password ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={64}
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => handleShowPassword("password")}
                  >
                    {showPassword.password ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">새로운 비밀번호 확인</Label>
                <div className="mt-1 relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    maxLength={64}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => handleShowPassword("confirm")}
                  >
                    {showPassword.confirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
              <Button type="submit">저장하기</Button>
            </form>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-center p-8">
        <Card className="w-full max-w-screen-2xl">
          <CardHeader>
            <CardTitle>종료된 캠페인</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<span>로딩중 ...</span>}>
              <ExpiredCampaignListSortedByDeadline />
            </Suspense>
          </CardContent>
        </Card>
      </div>
      <Card className="w-full max-w-3xl mx-auto py-8 mb-28">
        <CardHeader>
          <CardTitle>회원 탈퇴</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={deleteModal.toggleOpen} className="bg-red-600">
            회원 탈퇴하기
          </Button>
        </CardContent>
        <DeleteAccountModal
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.close}
          onConfirm={handleDelete}
        />
      </Card>
    </Layout>
  );
};

export default ExperienceRegistration;
