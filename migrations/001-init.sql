-- Script SQL para inicialización de la base de datos
-- Microservicio CRUD Canciones
-- Basado en LabWebAv01-scriptbdd_GR1.sql

-- Crear tabla TBL_SONG si no existe
CREATE TABLE IF NOT EXISTS TBL_SONG (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    path VARCHAR(500) NOT NULL,
    plays INTEGER DEFAULT 0 NOT NULL
);

-- Insertar datos de ejemplo
INSERT INTO TBL_SONG (name, path, plays) VALUES 
('Imagine', 'https://music.example.com/imagine.mp3', 1500),
('Bohemian Rhapsody', 'https://music.example.com/bohemian.mp3', 2800),
('Hotel California', 'https://music.example.com/hotel.mp3', 2100),
('Stairway to Heaven', 'https://music.example.com/stairway.mp3', 3200),
('Sweet Child O Mine', 'https://music.example.com/sweet.mp3', 1800),
('Smells Like Teen Spirit', 'https://music.example.com/teen.mp3', 1600),
('Billie Jean', 'https://music.example.com/billie.mp3', 2500),
('Like a Rolling Stone', 'https://music.example.com/rolling.mp3', 1900),
('Purple Haze', 'https://music.example.com/purple.mp3', 1400),
('Satisfaction', 'https://music.example.com/satisfaction.mp3', 2200)
ON CONFLICT DO NOTHING;

-- Verificar la creación de la tabla
SELECT 'Tabla TBL_SONG creada exitosamente' as status;