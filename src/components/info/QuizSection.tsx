import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

// TODO: Uzupełnij pytania quizu
const QUESTIONS = [
  { id: 'q1', text: 'Kto pierwszy powiedział „kocham cię"?', optionA: 'Ania', optionB: 'Paweł' },
  { id: 'q2', text: 'Kto bardziej się denerwował przed pierwszą randką?', optionA: 'Ania', optionB: 'Paweł' },
  { id: 'q3', text: 'Kto zaproponował wspólne zamieszkanie?', optionA: 'Ania', optionB: 'Paweł' },
];

type Stats = { ania: number; pawel: number };

const QuizSection = () => {
  const [question] = useState(() => QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]);
  const [selected, setSelected] = useState<'ania' | 'pawel' | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('quiz_answers')
      .select('answer')
      .eq('question_id', question.id);

    if (error || !data) return;

    const ania = data.filter((r) => r.answer === 'ania').length;
    const pawel = data.filter((r) => r.answer === 'pawel').length;
    setStats({ ania, pawel });
  };

  const handleAnswer = async (answer: 'ania' | 'pawel') => {
    if (selected) return;
    setSelected(answer);

    await supabase.from('quiz_answers').insert({
      question_id: question.id,
      answer,
    });

    await fetchStats();
  };

  useEffect(() => {
    if (selected) fetchStats();
  }, [selected]);

  const total = stats ? stats.ania + stats.pawel : 0;
  const aniaPercent = total > 0 ? Math.round((stats!.ania / total) * 100) : 50;
  const pawelPercent = 100 - aniaPercent;

  return (
    <div>
      <p className="info-quiz__question">„{question.text}"</p>

      {!selected ? (
        <div className="info-quiz__options">
          <button
            id="quiz-btn-ania"
            className="info-quiz__option"
            onClick={() => handleAnswer('ania')}
          >
            {question.optionA}
          </button>
          <button
            id="quiz-btn-pawel"
            className="info-quiz__option"
            onClick={() => handleAnswer('pawel')}
          >
            {question.optionB}
          </button>
        </div>
      ) : (
        <div className="info-quiz__options">
          <button
            className={`info-quiz__option ${selected === 'ania' ? 'info-quiz__option--selected-ania' : ''}`}
            disabled
          >
            {question.optionA}
          </button>
          <button
            className={`info-quiz__option ${selected === 'pawel' ? 'info-quiz__option--selected-pawel' : ''}`}
            disabled
          >
            {question.optionB}
          </button>
        </div>
      )}

      {stats && (
        <div>
          <div className="info-quiz__bar-wrapper">
            <div
              className="info-quiz__bar-ania"
              style={{ width: `${aniaPercent}%` }}
            >
              {aniaPercent}%
            </div>
            <div
              className="info-quiz__bar-pawel"
              style={{ width: `${pawelPercent}%` }}
            >
              {pawelPercent}%
            </div>
          </div>
          <div className="info-quiz__bar-labels">
            <span>{question.optionA} &mdash; {stats.ania} {stats.ania === 1 ? 'głos' : 'głosy'}</span>
            <span>{stats.pawel} {stats.pawel === 1 ? 'głos' : 'głosy'} &mdash; {question.optionB}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizSection;
