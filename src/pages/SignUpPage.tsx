import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Label } from "@/components/Label";
import { useSignUp } from "@/hooks/pages/signUp/useSignUp";

const SignUpPage: React.FC = () => {
  const {
    formData,
    handleChange,
    handleSendVerification,
    handleSubmit,
    showPassword,
    showVerificationField,
    errors,
    handleShowPassword,
    verificationCode,
    handleVerificationCode,
    isVerificationSuccess,
    verificationError,
    createAccountError,
  } = useSignUp();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          회원가입
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">이메일</Label>
              <div className="flex justify-between gap-4">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <Button
                  className="text-xs w-auto"
                  type="button"
                  onClick={handleSendVerification}
                  disabled={showVerificationField}
                >
                  인증번호 받기
                </Button>
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {showVerificationField && (
              <>
                <div className="text-sm mt-2">
                  이메일로 인증번호를 보냈습니다. 확인해주세요.
                </div>
                <Label htmlFor="verificationCode" className="block mt-4">
                  인증번호
                </Label>
                <Input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  maxLength={6}
                  disabled={isVerificationSuccess}
                  {...verificationCode}
                />
                <Button
                  type="button"
                  className="mt-2 text-sm"
                  onClick={handleVerificationCode}
                  disabled={isVerificationSuccess}
                >
                  인증번호 확인
                </Button>

                {/* 인증 성공 메시지 표시 */}
                {isVerificationSuccess && (
                  <p className="mt-2 text-sm text-green-600">
                    이메일 인증이 완료되었습니다!
                  </p>
                )}
                {/* 인증 실패 메시지 표시 */}
                {verificationError && (
                  <p className="mt-2 text-sm text-red-600">
                    {verificationError}
                  </p>
                )}
              </>
            )}

            <div>
              <Label htmlFor="password">비밀번호</Label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
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
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <div className="mt-1">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  maxLength={64}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            <div className="">
              <Button type="submit">가입하기</Button>
              {createAccountError && (
                <p className="mt-2 text-sm text-red-600">
                  {createAccountError}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
