import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface QuizOption {
  id: string;
  text: string;
  score: Record<string, number>;
}

interface QuizQuestion {
  id: number;
  question: string;
  type: string;
  options: QuizOption[];
}

interface QuizData {
  quiz: {
    title: string;
    description: string;
    questions: QuizQuestion[];
  };
}

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    fetch("/quiz-data.json")
      .then((res) => res.json())
      .then((data) => setQuizData(data))
      .catch((err) => console.error("Failed to load quiz data:", err));
  }, []);

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  const questions = quizData.quiz.questions;
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const currentQuestionData = questions[currentQuestion];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = { ...answers, [currentQuestion]: selectedOption };
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(newAnswers[currentQuestion + 1] || "");
    } else {
      // Calculate results
      const scores: Record<string, number> = {};
      
      Object.entries(newAnswers).forEach(([questionIndex, optionId]) => {
        const question = questions[parseInt(questionIndex)];
        const option = question.options.find((opt) => opt.id === optionId);
        
        if (option) {
          Object.entries(option.score).forEach(([site, points]) => {
            scores[site] = (scores[site] || 0) + points;
          });
        }
      });

      // Find top site
      const topSite = Object.entries(scores)
        .sort(([, a], [, b]) => b - a)[0][0];

      // Navigate to result page with the top site
      setLocation(`/result?site=${topSite}`);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] || "");
    } else {
      setLocation("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              質問 {currentQuestion + 1} / {totalQuestions}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="shadow-2xl border-0 mb-8">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              {currentQuestionData.question}
            </h2>

            <div className="space-y-4">
              {currentQuestionData.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedOption === option.id
                      ? "border-rose-500 bg-rose-50 shadow-lg scale-[1.02]"
                      : "border-gray-200 bg-white hover:border-rose-300 hover:bg-rose-50/50"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                        selectedOption === option.id
                          ? "border-rose-500 bg-rose-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedOption === option.id && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-lg font-medium text-gray-900">
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
            className="px-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            戻る
          </Button>

          <Button
            size="lg"
            onClick={handleNext}
            disabled={!selectedOption}
            className="px-8 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion < totalQuestions - 1 ? "次へ" : "結果を見る"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

