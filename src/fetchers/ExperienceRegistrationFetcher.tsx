import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import ExpiredCampaignListSortedByDeadline from "@/fetchers/ExpiredCampaignListSortedByDeadline";
import DeleteAccountModal from "@/components/modal/DeleteAccountModal";
import { useMyInfo } from "@/hooks/pages/myInfo/useMyInfo";

export default function ExperienceRegistrationFetcher() {
  const {
    user,
    isOpen,
    open,
    deleteModal,
    errors,
    formData,
    handleChange,
    handleDelete,
    handleShowPassword,
    handleSubmit,
    showPassword,
    data,
  } = useMyInfo();

  return (
    <div>
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
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <Button type="submit">저장하기</Button>
            </form>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-center p-8">
        <Card className="w-full max-w-screen-2xl">
          <div className="flex justify-evenly">
            <div>
              <CardHeader>
                <CardTitle>총 협찬 비용</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-lg">
                  {data.getTotalSponsorshipCostAndConsumption.totalSponsorshipCost.toLocaleString(
                    "ko-KR",
                  )}
                  원
                </span>
              </CardContent>
            </div>
            <div>
              <CardHeader>
                <CardTitle>총 소비한 비용</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-lg">
                  {data.getTotalSponsorshipCostAndConsumption.totalConsumptionCost.toLocaleString(
                    "ko-KR",
                  )}
                  원
                </span>
              </CardContent>
            </div>
          </div>
          <CardHeader>
            <CardTitle>종료된 캠페인</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpiredCampaignListSortedByDeadline />
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
    </div>
  );
}
