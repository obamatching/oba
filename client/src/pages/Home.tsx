import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Shield } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white rounded-full p-6 shadow-xl">
                <Heart className="w-16 h-16 text-rose-500" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            あなたにピッタリの
            <br />
            <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              出会い系サイト
            </span>
            <br />
            を診断
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            たった5つの質問に答えるだけで
            <br />
            あなたに最適なサービスが見つかります
          </p>

          {/* CTA Button */}
          <Link href="/quiz">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-12 py-6 text-lg rounded-full shadow-2xl hover:shadow-rose-300/50 transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              無料で診断を始める
            </Button>
          </Link>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>完全無料</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>個人情報不要</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>所要時間1分</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-rose-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-rose-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">簡啘5ステップ</h3>
            <p className="text-gray-600">
              年代、求める関係、出会いのスピードなど5つの質問で、あなたにピッタリのサイトが分かります
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Heart className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">11サイトから厳選</h3>
            <p className="text-gray-600">
              既婚者向けマッチングサイトと大手出会い系サイト合わせて11サービスから、あなたに最適なサイトを提案します
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-pink-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">相性度を表示</h3>
            <p className="text-gray-600">
              診断結果では相性度とその理由、サイトの特徴を詳しく解説。納得して選べます
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <p>© 2025 出会い系サイト診断. All rights reserved.</p>
      </footer>
    </div>
  );
}

