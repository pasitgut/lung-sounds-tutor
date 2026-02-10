interface ScoreSummaryProps {
  score: number;
  totalQuestions: number;
}

const ScoreSummary: React.FC<ScoreSummaryProps> = ({
  score,
  totalQuestions,
}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h2 className="text-3xl font-bold text-[#1E74BC] mb-2">สรุปผลคะแนน</h2>
        <p className="text-gray-500 mb-6">คุณทำแบบทดสอบเสร็จสิ้นแล้ว</p>

        <div className="text-6xl font-extrabold text-[#2B79C2] mb-8">
          {score}{" "}
          <span className="text-2xl text-gray-400 font-medium">
            / {totalQuestions}
          </span>
        </div>

        <button
          onClick={() => console.log("Back to home")}
          className="w-full py-3 bg-[#1E74BC] text-white rounded-xl font-bold text-lg hover:bg-[#165a96] transition-all shadow-md hover:shadow-lg"
        >
          กลับหน้าหลัก
        </button>
      </div>
    </div>
  );
};

export default ScoreSummary;
