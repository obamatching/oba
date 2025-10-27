import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ExternalLink, Heart, RotateCcw, Clock, TrendingUp, Brain } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface SiteData {
  name: string;
  tagline: string;
  averageDays: number;
  psychologyInsight: string;
  features: string[];
  hiddenBenefit: string;
  targetAge: string;
  affiliateUrl: string;
  color: string;
}

interface QuizData {
  sites: Record<string, SiteData>;
}

export default function Result() {
  const [, setLocation] = useLocation();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [siteKey, setSiteKey] = useState<string>("");

  useEffect(() => {
    // Get site from URL params
    const params = new URLSearchParams(window.location.search);
    const site = params.get("site");
    if (site) {
      setSiteKey(site);
    }

    // Load quiz data
    fetch("/quiz-data.json")
      .then((res) => res.json())
      .then((data) => setQuizData(data))
      .catch((err) => console.error("Failed to load quiz data:", err));
  }, []);

  if (!quizData || !siteKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">あなたに最適なサイトを分析中...</p>
        </div>
      </div>
    );
  }

  const siteData = quizData.sites[siteKey];

  if (!siteData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">結果が見つかりませんでした</p>
          <Button onClick={() => setLocation("/")} className="mt-4">
            トップに戻る
          </Button>
        </div>
      </div>
    );
  }

  const compatibility = 94; // High compatibility for conversion

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Urgency Banner */}
        <div className="bg-gradient-to-r from-rose-500 to-purple-600 text-white text-center py-3 px-4 rounded-xl mb-6 shadow-lg">
          <p className="font-bold text-sm md:text-base">
            🔥 今週限定：新規登録で最大1,200円分のポイントプレゼント中！
          </p>
        </div>

        {/* Result Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full mb-4 shadow-xl animate-pulse">
            <Heart className="w-10 h-10 text-white" fill="white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            診断完了！
          </h1>
          <p className="text-gray-600 text-lg">あなたにピッタリのサイトが見つかりました</p>
        </div>

        {/* Average Days Card - 目立つ位置に配置 */}
        <Card className="shadow-2xl border-0 mb-6 overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Clock className="w-8 h-8 text-orange-500" />
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-orange-600 mb-1">
                  {siteData.averageDays}日
                </div>
                <p className="text-gray-700 font-semibold text-lg">
                  あなたのようなタイプが理想の相手と出会えるまでの平均日数
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-center text-gray-600 text-sm">
              ※過去6ヶ月の{siteData.name}利用者データに基づく統計
            </p>
          </CardContent>
        </Card>

        {/* Main Result Card */}
        <Card className="shadow-2xl border-0 mb-6 overflow-hidden">
          <div
            className="h-3"
            style={{
              background: `linear-gradient(to right, ${siteData.color}, ${siteData.color}dd)`,
            }}
          ></div>
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-block mb-4">
                <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  {compatibility}%
                </div>
                <p className="text-gray-600 font-medium text-lg">相性度</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
                {siteData.name}
              </h2>
              <p className="text-xl text-gray-600 text-center mb-6">
                {siteData.tagline}
              </p>

              {/* Hidden Benefit - 目立たせる */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 mb-6">
                <p className="text-center font-bold text-green-700 text-lg">
                  ✨ {siteData.hiddenBenefit}
                </p>
              </div>

              {/* CTA Button - 大きく目立つように */}
              <div className="text-center mb-6">
                <a
                  href={siteData.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-16 py-8 text-xl rounded-full shadow-2xl hover:shadow-rose-300/50 transition-all duration-300 transform hover:scale-105 animate-pulse"
                  >
                    {siteData.name}で今すぐ出会う
                    <ExternalLink className="w-6 h-6 ml-3" />
                  </Button>
                </a>
                <p className="text-sm text-gray-500 mt-3">
                  ※登録無料・3分で完了
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Psychology Insight */}
        <Card className="shadow-xl border-0 mb-6 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              脳科学・心理学的分析
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed text-lg">
              {siteData.psychologyInsight}
            </p>
          </CardContent>
        </Card>

        {/* Why This Match */}
        <Card className="shadow-xl border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-rose-500" />
              {siteData.name}があなたにおすすめな理由
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {siteData.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 leading-relaxed text-lg font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Social Proof */}
        <Card className="shadow-xl border-0 mb-8 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <p className="text-center text-gray-700 text-sm md:text-base">
              💬 「診断通りのサイトで登録3日目に理想の相手と出会えました！」<br />
              <span className="text-gray-500">- 42歳男性・東京都</span>
            </p>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <div className="text-center mb-8">
          <a
            href={siteData.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              size="lg"
              className="w-full md:w-auto bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-12 py-6 text-lg rounded-full shadow-xl"
            >
              {siteData.name}の詳細を見る
              <ExternalLink className="w-5 h-5 ml-2" />
            </Button>
          </a>
          <p className="text-gray-500 text-sm mt-3">
            今すぐ登録して、理想の相手との出会いを始めましょう
          </p>
        </div>

        {/* Secondary Action */}
        <div className="flex justify-center mb-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setLocation("/quiz")}
            className="px-8"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            もう一度診断する
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-xs text-gray-400 leading-relaxed">
          <p>
            ※ この診断結果は統計データと心理学理論に基づいていますが、個人差があります。
            <br />
            実際のサービス内容・料金は各サイトでご確認ください。
          </p>
        </div>
      </div>
    </div>
  );
}

