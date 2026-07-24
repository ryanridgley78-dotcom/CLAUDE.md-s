UPDATE account_paths
SET
  book_list = 'Required Reading:
Created to Be His Help Meet
Love and Respect by Dr. Emerson Eggerichs
How to Win Friends and Influence People by Dale Carnegie
Failing Forward by John Maxwell
The Slight Edge by Jeff Olson

Primary reference: Five-Step Process of Repentance and Redemption (Covenantal Framework).
Scripture focus: Exodus 21:10; Matthew 3:8; 1 John 1:7-9; Hebrews 9-10; Romans 12:1-2.
Elder-selected readings: add household-order, repentance, forgiveness, and covenant-restoration materials appropriate to the widow''s situation.',
  updated_at = CURRENT_TIMESTAMP
WHERE account_type = 'Widows';
