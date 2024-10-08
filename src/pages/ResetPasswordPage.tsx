import { usePasswordResetForm } from "@/hooks/pages/resetPassword/usePasswordResetForm";

const ResetPasswordPage = () => {
  const {
    handleChange,
    handleSubmit,
    confirmPassword,
    password,
    error,
    success,
  } = usePasswordResetForm();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="">
        <h2 className="mt-6 text-center  text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900">
          비밀번호 재설정
        </h2>
      </div>

      <div className="mt-8 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg rounded-md sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-xs md:text-sm font-medium text-gray-700"
              >
                새로운 비밀번호
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none text-xs md:text-sm block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-xs md:text-sm font-medium text-gray-700"
              >
                비밀번호 확인
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none text-xs md:text-sm block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={confirmPassword}
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
                className="w-full text-xs md:text-sm flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                비밀번호 재설정
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
