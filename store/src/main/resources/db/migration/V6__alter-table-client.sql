ALTER TABLE client ADD password TEXT;
UPDATE client SET password = '12345678';

ALTER TABLE client ADD role TEXT;
UPDATE client SET role = 'USER';