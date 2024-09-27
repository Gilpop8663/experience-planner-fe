import { Eye, EyeOff } from "lucide-react";
import { ROUTES } from "@/router/routes";
import { Button } from "@/components/Button";
import { useLoginForm } from "@/hooks/pages/login/useLoginForm";

const LoginPage = () => {
  const {
    error,
    formData,
    handleChange,
    handleShowPassword,
    handleSubmit,
    loading,
    showPassword,
  } = useLoginForm();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="">
        <h2 className="mt-6 text-center text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900">
          로그인
        </h2>
      </div>

      <div className="mt-8 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-md sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-xs md:text-sm font-medium text-gray-700"
              >
                이메일
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  required
                  className="appearance-none text-xs md:text-sm block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs md:text-sm font-medium text-gray-700"
              >
                비밀번호
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none text-xs md:text-sm block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-xs md:text-sm text-gray-900"
                >
                  자동 로그인
                </label>
              </div>

              <div className="text-xs md:text-sm">
                <a
                  href={ROUTES.FORGOT_PASSWORD}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  비밀번호를 잊으셨나요?
                </a>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-xs md:text-sm">{error}</div>
            )}

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="text-xs md:text-sm lg:text-sm"
              >
                로그인
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs md:text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-center">
                <a
                  href={ROUTES.SIGN_UP}
                  className="font-medium text-indigo-600 hover:text-indigo-500 text-xs md:text-sm"
                >
                  계정이 없으신가요? 회원가입
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
