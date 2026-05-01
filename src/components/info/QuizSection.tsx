import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { supabase } from '../../supabaseClient';

type QuizRow = {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  answers_a: number;
  answers_b: number;
  correct_answer: 'a' | 'b' | null;
};

const fireConfetti = () => {
  const duration = 2500;
  const end = Date.now() + duration;
  const colors = ['#e53935', '#fdd835', '#43a047', '#1e88e5'];

  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.65 },
      colors,
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.65 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

const QuizSection = () => {
  const [question, setQuestion] = useState<QuizRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<'a' | 'b' | null>(null);
  const [stats, setStats] = useState<{ a: number; b: number } | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchRandomQuestion = async () => {
      const { data, error } = await supabase.from('quiz').select('*');
      if (error || !data || data.length === 0) {
        setLoading(false);
        return;
      }

      const STORAGE_KEY = 'quiz_seen_ids';
      const seenRaw = localStorage.getItem(STORAGE_KEY);
      let seen: number[] = seenRaw ? JSON.parse(seenRaw) : [];

      // Jeśli wszystkie pytania już widziane — resetuj historię
      const allIds = (data as QuizRow[]).map((q) => q.id);
      const unseen = allIds.filter((id) => !seen.includes(id));
      if (unseen.length === 0) {
        seen = [];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seen));
      }

      // Losuj spośród niewidzianych
      const available = (data as QuizRow[]).filter((q) => !seen.includes(q.id));
      const random = available[Math.floor(Math.random() * available.length)];

      // Zapisz ID jako widziane
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...seen, random.id]));

      setQuestion(random);
      setLoading(false);
    };

    fetchRandomQuestion();
  }, []);

  const handleAnswer = async (answer: 'a' | 'b') => {
    if (selected || !question) return;
    setSelected(answer);

    // Odpal konfetti jeśli poprawna odpowiedź
    if (question.correct_answer && answer === question.correct_answer) {
      fireConfetti();
    }

    await supabase.rpc('increment_quiz_answer', {
      question_id: question.id,
      chosen: answer,
    });

    // Odczytaj świeże dane po głosowaniu
    const { data } = await supabase
      .from('quiz')
      .select('answers_a, answers_b')
      .eq('id', question.id)
      .single();

    if (data) {
      setStats({ a: data.answers_a, b: data.answers_b });
    }
  };

  if (loading) return null;
  if (!question) return null;

  const total = stats ? stats.a + stats.b : 0;
  const percentA = total > 0 ? Math.round((stats!.a / total) * 100) : 50;
  const percentB = 100 - percentA;

  const isCorrect = (opt: 'a' | 'b') => question.correct_answer === opt;
  const hasCorrect = question.correct_answer === 'a' || question.correct_answer === 'b';

  const getOptionClass = (opt: 'a' | 'b') => {
    if (!selected) return 'info-quiz__option';
    if (selected === opt && hasCorrect) {
      return isCorrect(opt)
        ? 'info-quiz__option info-quiz__option--correct'
        : 'info-quiz__option info-quiz__option--wrong';
    }
    if (selected === opt) {
      return opt === 'a'
        ? 'info-quiz__option info-quiz__option--selected-a'
        : 'info-quiz__option info-quiz__option--selected-b';
    }
    // Zaznacz poprawną odpowiedź nawet gdy nie wybrana
    if (hasCorrect && isCorrect(opt)) {
      return 'info-quiz__option info-quiz__option--correct';
    }
    return 'info-quiz__option info-quiz__option--disabled';
  };

  return (
    <div>
      <p className="info-quiz__question">„{question.question}"</p>

      <div className="info-quiz__options">
        <button
          id="quiz-btn-a"
          className={getOptionClass('a')}
          onClick={() => handleAnswer('a')}
          disabled={!!selected}
        >
          {question.option_a}
          {selected && hasCorrect && isCorrect('a') && (
            <span className="info-quiz__option-check"> ✓</span>
          )}
        </button>
        <button
          id="quiz-btn-b"
          className={getOptionClass('b')}
          onClick={() => handleAnswer('b')}
          disabled={!!selected}
        >
          {question.option_b}
          {selected && hasCorrect && isCorrect('b') && (
            <span className="info-quiz__option-check"> ✓</span>
          )}
        </button>
      </div>

      {stats && (
        <div>
          <div className="info-quiz__bar-wrapper">
            <div
              className={[
                'info-quiz__bar-a',
                hasCorrect
                  ? isCorrect('a') ? 'info-quiz__bar--correct' : 'info-quiz__bar--incorrect'
                  : '',
              ].join(' ')}
              style={{ width: `${percentA}%` }}
            >
              {percentA}%
            </div>
            <div
              className={[
                'info-quiz__bar-b',
                hasCorrect
                  ? isCorrect('b') ? 'info-quiz__bar--correct' : 'info-quiz__bar--incorrect'
                  : '',
              ].join(' ')}
              style={{ width: `${percentB}%` }}
            >
              {percentB}%
            </div>
          </div>
          <div className="info-quiz__bar-labels">
            <span>
              {question.option_a} &mdash; {stats.a}{' '}
              {stats.a === 1 ? 'głos' : 'głosy'}
            </span>
            <span>
              {stats.b} {stats.b === 1 ? 'głos' : 'głosy'} &mdash;{' '}
              {question.option_b}
            </span>
          </div>
          {hasCorrect && (
            <p className="info-quiz__correct-hint">
              {selected === question.correct_answer
                ? '🎉 Zgadza się!'
                : `Jednak ${
                    question.correct_answer === 'a'
                      ? question.option_a
                      : question.option_b
                  }`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizSection;
