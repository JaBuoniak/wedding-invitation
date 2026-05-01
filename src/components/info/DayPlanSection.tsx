import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

type ScheduleItem = {
  id: number;
  hour: number;
  minute: number;
  title: string;
  description: string;
};

const DayPlanSection = () => {
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      const { data, error } = await supabase
        .from('schedule')
        .select('*')
        .eq('is_visible', true)
        .order('day', { ascending: true })
        .order('hour', { ascending: true })
        .order('minute', { ascending: true });

      if (!error && data) {
        setItems(data);
      }
      setLoading(false);
    };

    fetchSchedule();
  }, []);

  if (loading) return null;

  return (
    <div className="info-dayplan">
      {items.map((item) => (
        <div className="info-dayplan__item" key={item.id}>
          <div className="info-dayplan__dot" />
          <span className="info-dayplan__time">
            {String(item.hour).padStart(2, '0')}:{String(item.minute).padStart(2, '0')}
          </span>
          <div className="info-dayplan__content">
            <span className="info-dayplan__title">{item.title}</span>
            {item.description && (
              <span className="info-dayplan__description">{item.description}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DayPlanSection;
