-- TABELA 1: Zaproszenia (Konfiguracja gości)
CREATE TABLE invitations (
  -- Slug jako unikalny identyfikator gościa (np. 'nowaki')
  slug TEXT PRIMARY KEY,
  
  -- Dane personalne
  guest_who TEXT NOT NULL,
  guest_and TEXT,
  guest_with TEXT,
  
  -- Limity
  max_adults INTEGER DEFAULT 2,
  max_children INTEGER DEFAULT 0,
  max_under10 INTEGER DEFAULT 0,
  max_under2 INTEGER DEFAULT 0
);

-- TABELA 2: Odpowiedzi RSVP
CREATE TABLE rsvps (
  -- Klucz złożony ze sluga i wersji
  slug TEXT REFERENCES invitations(slug) NOT NULL,
  version INTEGER NOT NULL DEFAULT 0,
  
  -- Dane
  email TEXT,
  phone TEXT,
  
  -- Potwierdzone liczby
  adults INTEGER DEFAULT 0,
  children INTEGER DEFAULT 0,
  under10 INTEGER DEFAULT 0,
  under2 INTEGER DEFAULT 0,
  
  -- Noclegi
  frisat BOOLEAN DEFAULT FALSE,
  satsun BOOLEAN DEFAULT FALSE,
  sunmon BOOLEAN DEFAULT FALSE,
  
  message TEXT,
  is_declined BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  PRIMARY KEY (slug, version)
);

-- FUNKCJA: Automatyczne numerowanie wersji dla danego sluga
CREATE OR REPLACE FUNCTION set_rsvp_version()
RETURNS TRIGGER AS $$
BEGIN
  -- Ustawia wersję na MAX + 1 dla danego sluga
  -- Jeśli brak rekordów, COALESCE zwróci 0, więc 0 + 1 = 1
  NEW.version := COALESCE(
    (SELECT MAX(version) FROM rsvps WHERE slug = NEW.slug), 
    0
  ) + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- TRIGGER: Uruchamianie funkcji przed każdym INSERT
CREATE TRIGGER trigger_set_rsvp_version
BEFORE INSERT ON rsvps
FOR EACH ROW
EXECUTE FUNCTION set_rsvp_version();

-- BEZPIECZEŃSTWO
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Każdy może odczytać zaproszenie znając slug" 
ON invitations FOR SELECT 
USING (true);

CREATE POLICY "Każdy może wysłać RSVP" 
ON rsvps FOR INSERT 
WITH CHECK (true);

-- Przykładowe dane
INSERT INTO invitations (slug, guest_who, guest_and, guest_with, max_adults, max_children, max_under10, max_under2)
VALUES 
('pj', 'Pawła Jabłońskiego', 'Annę Imbiorkiewicz', NULL, 2, 0, 0, 0),
('nowaki', 'Rodzinę Nowaków', NULL, 'dziećmi', 2, 0, 2, 1);

-- TABELA 3: Logi odwiedzin
CREATE TABLE visits (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug TEXT REFERENCES invitations(slug) NOT NULL,
  user_agent TEXT,
  screen_resolution TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABELA 4: Logi nieznanych prób wejścia
CREATE TABLE unknown_visits (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug TEXT NOT NULL,
  user_agent TEXT,
  screen_resolution TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BEZPIECZEŃSTWO
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE unknown_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Każdy może dodać log wizyty" 
ON visits FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Każdy może dodać log nieznanej wizyty" 
ON unknown_visits FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Każdy może odczytać logi" 
ON visits FOR SELECT 
USING (true);

CREATE POLICY "Każdy może odczytać nieznane logi" 
ON unknown_visits FOR SELECT 
USING (true);

-- TABELA 5: Pytania i statystyki quizu
CREATE TABLE quiz (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  question      TEXT    NOT NULL,
  option_a      TEXT    NOT NULL,
  option_b      TEXT    NOT NULL,
  answers_a     INTEGER NOT NULL DEFAULT 0,
  answers_b     INTEGER NOT NULL DEFAULT 0,
  correct_answer TEXT   -- 'a' lub 'b', NULL jezeli pytanie bez jednoznacznej odpowiedzi
);

ALTER TABLE quiz ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kazdy moze odczytac pytania quizu"
ON quiz FOR SELECT
USING (true);

-- Funkcja RPC do bezpiecznej (atomowej) inkrementacji licznika
CREATE OR REPLACE FUNCTION increment_quiz_answer(question_id BIGINT, chosen TEXT)
RETURNS VOID AS $$
BEGIN
  IF chosen = 'a' THEN
    UPDATE quiz SET answers_a = answers_a + 1 WHERE id = question_id;
  ELSIF chosen = 'b' THEN
    UPDATE quiz SET answers_b = answers_b + 1 WHERE id = question_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Przykladowe pytania
INSERT INTO quiz (question, option_a, option_b, correct_answer) VALUES
  ('Kto pierwszy powiedzial "kocham cie"?',              'Ania',  'Pawel', NULL),
  ('Kto bardziej sie denerwował przed pierwsza randka?', 'Ania',  'Pawel', NULL),
  ('Kto zaproponowal wspolne zamieszkanie?',             'Ania',  'Pawel', NULL);

-- TABELA 6: Plan dnia
CREATE TABLE schedule (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  day         INTEGER NOT NULL DEFAULT 0, -- 0: dzien slubu, 1: kolejny dzien
  hour        INTEGER NOT NULL,
  minute      INTEGER NOT NULL,
  duration    INTEGER, -- Czas trwania w minutach (techniczny dla obslugi)
  title       TEXT    NOT NULL,
  description TEXT,
  is_visible  BOOLEAN NOT NULL DEFAULT TRUE
);

ALTER TABLE schedule ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kazdy moze odczytac plan dnia"
ON schedule FOR SELECT
USING (true);

-- Dane planu dnia
INSERT INTO schedule (day, hour, minute, duration, title, description, is_visible) VALUES
  (0, 8, 0, 60, 'Śniadanie', NULL, false),
  (0, 9, 0, 90, 'Fryzura', NULL, false),
  (0, 10, 30, 90, 'Makijaż', NULL, false),
  (0, 12, 0, NULL, 'Szykowanie z kamera', NULL, false),
  (0, 13, 0, NULL, 'Lunch', NULL, false),
  (0, 13, 45, 15, 'Błogoslawienstwo rodziców', NULL, false),
  (0, 14, 0, NULL, 'Wyjazd do Giżycka', NULL, false),
  (0, 15, 0, 60, 'Ślub', 'Kościół pw. św. Kazimierza Królewicza', true),
  (0, 16, 30, 20, 'Rejsik', 'Goście się rozgaszczają', false),
  (0, 17, 00, 20, 'Powitanie gości', 'przed Tawerną Piękny Brzeg', true),
  (0, 18, 00, NULL, 'Obiad', NULL, true),
  (0, 17, 20, 30, 'Życzenia', 'sala taneczna albo na zewnątrz', true),
  (0, 18, 30, NULL, 'Zdjęcia z goścmi', NULL, false),
  (0, 19, 10, NULL, 'Pierwszy taniec', NULL, false),
  (0, 20, 0, NULL, 'Sesja na jeziorze', NULL, false),
  (0, 21, 0, NULL, 'Kolacja', NULL, true),
  (0, 22, 30, NULL, 'Tort', NULL, true),
  (1, 0, 0, NULL, 'Oczepiny', NULL, true),
  (1, 1, 0, NULL, 'Gorący posiłek', NULL, true),
  (1, 3, 0, NULL, 'Koniec oficjalnej imprezy', 'DJ konczy', false),
  (1,12, 0, NULL, 'Poprawiny', 'obok tawerny', true);
