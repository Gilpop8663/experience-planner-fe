import { useForgotPasswordForm } from "@/hooks/pages/forgotPassword/useForgotPasswordForm";

const ForgotPasswordPage = () => {
  const { handleSubmit, email, success, error, handleChange } =
    useForgotPasswordForm();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="">
        <h2 className="mt-6 text-center text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900">
          비밀번호 찾기
        </h2>
      </div>

      <div className="mt-8 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
                  required
                  className="appearance-none text-xs md:text-sm block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-xs md:text-sm">{error}</div>
            )}
            {success && (
              <div className="text-green-600 text-xs md:text-sm">{success}</div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex text-xs md:text-sm justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                비밀번호 재설정 링크 보내기
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-center text-xs md:text-sm">
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                로그인 페이지로 돌아가기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
