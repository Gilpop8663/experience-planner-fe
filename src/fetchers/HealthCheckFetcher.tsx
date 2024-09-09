import { useMyProfile } from "@/hooks/query/user/useMyProfile";

export default function HealthCheckFetcher() {
  const { user } = useMyProfile();

  console.log(user);

  return (
    <div>
      <div>
        <div>이메일: {user.email}</div>
        <div>아이디: {user.id}</div>
        <div>닉네임: {user.nickname}</div>
        <div>포인트: {user.point}</div>
      </div>
    </div>
  );
}
