import { useRegister } from "@/hooks/pages/register/useRegister";
import TabContent from "@/components/Tabs/TabContent";
import Tabs from "@/components/Tabs/Tabs";
import ContentPasteTab from "@/pages/RegisterPage/components/ContentPasteTab";
import DirectInputTab from "@/pages/RegisterPage/components/DirectInputTab";
import LinkRegisterTab from "@/pages/RegisterPage/components/LinkRegisterTab";

export default function RegisterFetcher() {
  const { activeTab, setActiveTab } = useRegister();

  const tabs = ["링크로 추가", "직접 입력", "강남맛집 본문 등록"];

  return (
    <>
      <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      <TabContent activeTab={activeTab} index={0}>
        <LinkRegisterTab />
      </TabContent>
      <TabContent activeTab={activeTab} index={1}>
        <DirectInputTab />
      </TabContent>
      <TabContent activeTab={activeTab} index={2}>
        <ContentPasteTab />
      </TabContent>
    </>
  );
}
