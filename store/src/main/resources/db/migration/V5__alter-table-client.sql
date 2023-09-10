ALTER TABLE client ADD active BOOLEAN;
UPDATE client SET active = true;