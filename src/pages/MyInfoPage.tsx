import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ExperienceRegistration: React.FC = () => {
  const [linkInput, setLinkInput] = useState("");
  const [manualInput, setManualInput] = useState({
    title: "",
    siteName: "",
    reviewPeriod: "",
    sponsorshipFee: "",
    reservationLink: "",
    productDetails: "",
    location: "",
    detailsLink: "",
  });

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 링크 처리 로직
    console.log("Submitted link:", linkInput);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 수동 입력 처리 로직
    console.log("Submitted manual input:", manualInput);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>체험 등록</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link">링크로 추가</TabsTrigger>
            <TabsTrigger value="manual">직접 입력</TabsTrigger>
          </TabsList>

          <TabsContent value="link">
            <form onSubmit={handleLinkSubmit} className="space-y-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="link-input">체험단 링크</Label>
              </div>
              <Input
                id="link-input"
                placeholder="https://example.com/experience"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
              />
              <Button type="submit">링크로 추가하기</Button>
            </form>
          </TabsContent>

          <TabsContent value="manual">
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  value={manualInput.title}
                  onChange={(e) =>
                    setManualInput({ ...manualInput, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="siteName">사이트명</Label>
                <Input
                  id="siteName"
                  value={manualInput.siteName}
                  onChange={(e) =>
                    setManualInput({ ...manualInput, siteName: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="reviewPeriod">리뷰 등록 기간</Label>
                <Input
                  id="reviewPeriod"
                  value={manualInput.reviewPeriod}
                  onChange={(e) =>
                    setManualInput({
                      ...manualInput,
                      reviewPeriod: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="sponsorshipFee">협찬비</Label>
                <Input
                  id="sponsorshipFee"
                  value={manualInput.sponsorshipFee}
                  onChange={(e) =>
                    setManualInput({
                      ...manualInput,
                      sponsorshipFee: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="reservationLink">예약하기 링크</Label>
                <Input
                  id="reservationLink"
                  value={manualInput.reservationLink}
                  onChange={(e) =>
                    setManualInput({
                      ...manualInput,
                      reservationLink: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="productDetails">상품 제공 내역</Label>
                <Textarea
                  id="productDetails"
                  value={manualInput.productDetails}
                  onChange={(e) =>
                    setManualInput({
                      ...manualInput,
                      productDetails: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="location">위치</Label>
                <Input
                  id="location"
                  value={manualInput.location}
                  onChange={(e) =>
                    setManualInput({ ...manualInput, location: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="detailsLink">자세히 보기 링크</Label>
                <Input
                  id="detailsLink"
                  value={manualInput.detailsLink}
                  onChange={(e) =>
                    setManualInput({
                      ...manualInput,
                      detailsLink: e.target.value,
                    })
                  }
                />
              </div>
              <Button type="submit">직접 입력하여 추가하기</Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExperienceRegistration;
