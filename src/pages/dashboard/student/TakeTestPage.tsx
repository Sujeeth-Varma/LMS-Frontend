import React, { useEffect, useState } from "react";
import { testApi } from "../../../services/testApi";
import type { Attempt, Question } from "../../../types";

interface TakeTestProps {
  testId: number;
  onClose: () => void;
}

const TakeTest: React.FC<TakeTestProps> = ({ testId, onClose }) => {
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const startTest = async () => {
      try {
        setLoading(true);
        const [attemptResponse, questionsResponse] = await Promise.all([
          testApi.startAttempt(testId),
          testApi.getQuestions(testId),
        ]);

        if (attemptResponse.success && attemptResponse.data) {
          setAttempt(attemptResponse.data);
        } else {
          setError(attemptResponse.message);
        }

        if (questionsResponse.success && questionsResponse.data) {
          setQuestions(questionsResponse.data);
        } else {
          setError(questionsResponse.message);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to start test");
      } finally {
        setLoading(false);
      }
    };

    startTest();
  }, [testId]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitAnswer = async (questionId: number) => {
    const answerText = answers[questionId];
    if (!answerText) return;

    try {
      await testApi.submitAnswer(attempt!.id, { questionId, answerText });
      // Move to next question
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit answer");
    }
  };

  const handleSubmitTest = async () => {
    if (!attempt) return;

    setSubmitting(true);
    try {
      await testApi.submitAttempt(attempt.id);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit test");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8">
          <div className="text-text">Loading test...</div>
        </div>
      </div>
    );
  }

  if (error || !attempt || questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md">
          <div className="text-center">
            <div className="text-red-600 mb-4">{error || "Failed to load test"}</div>
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
          <h2 className="text-lg font-semibold text-text">Taking Test</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <div className="text-sm text-text-secondary">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-text mb-2">
              {currentQuestion.questionText}
            </h3>
            <div className="text-sm text-text-secondary mb-4">
              Marks: {currentQuestion.marks} | Negative: {currentQuestion.negativeMarks}
            </div>

            {currentQuestion.questionType === "MCQ" && (
              <div className="space-y-2">
                {["A", "B", "C", "D"].map(option => {
                  const optionText = currentQuestion[`option${option}` as keyof Question] as string;
                  if (!optionText) return null;
                  return (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={option}
                        checked={answers[currentQuestion.id] === option}
                        onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-text">{option}. {optionText}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {currentQuestion.questionType === "MAQ" && (
              <div className="space-y-2">
                {["A", "B", "C", "D"].map(option => {
                  const optionText = currentQuestion[`option${option}` as keyof Question] as string;
                  if (!optionText) return null;
                  return (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        value={option}
                        checked={answers[currentQuestion.id]?.includes(option) || false}
                        onChange={() => {
                          const current = answers[currentQuestion.id] || "";
                          const newAnswer = current.includes(option)
                            ? current.replace(option, "").replace(/,,/g, ",").replace(/^,|,$/g, "")
                            : (current ? current + "," + option : option);
                          handleAnswerChange(currentQuestion.id, newAnswer);
                        }}
                        className="mr-2"
                      />
                      <span className="text-text">{option}. {optionText}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {currentQuestion.questionType === "FILL_BLANK" && (
              <input
                type="text"
                value={answers[currentQuestion.id] || ""}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your answer"
              />
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={() => handleSubmitAnswer(currentQuestion.id)}
                disabled={!answers[currentQuestion.id]}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                disabled={submitting}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Test"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeTest;