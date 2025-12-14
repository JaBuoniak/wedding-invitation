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
$$ LANGUAGE plpgsql;

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
INSERT INTO invitations (slug, guest_who, guest_and, guest_with, max_adults, max_children, max_under_10, max_under_2)
VALUES 
('pj', 'Pawła Jabłońskiego', 'Annę Imbiorkiewicz', NULL, 2, 0, 0, 0),
('nowaki', 'Rodzinę Nowaków', NULL, 'dziećmi', 2, 0, 2, 1);
