SELECT setval('attach_sequence', (SELECT MAX(id) FROM attach) + 1);
SELECT setval('bank_sequence', (SELECT MAX(id) FROM bank) + 1);
SELECT setval('bank_receipt_sequence', (SELECT MAX(id) FROM bank_receipt) + 1);
SELECT setval('bill_buy_sequence', (SELECT MAX(id) FROM bill_buy) + 1);
SELECT setval('bill_sell_sequence', (SELECT MAX(id) FROM bill_sell) + 1);
SELECT setval('bill_sell_receipt_sequence', (SELECT MAX(id) FROM bill_sell_receipt) + 1);
SELECT setval('company_sequence', (SELECT MAX(id) FROM company) + 1);
SELECT setval('customer_sequence', (SELECT MAX(id) FROM customer) + 1);
SELECT setval('deduction_sequence', (SELECT MAX(id) FROM deduction) + 1);
SELECT setval('deduction_type_sequence', (SELECT MAX(id) FROM deduction_type) + 1);
SELECT setval('detection_type_sequence', (SELECT MAX(id) FROM detection_type) + 1);
SELECT setval('diagnosis_sequence', (SELECT MAX(id) FROM diagnosis) + 1);
SELECT setval('doctor_sequence', (SELECT MAX(id) FROM doctor) + 1);
SELECT setval('drug_sequence', (SELECT MAX(id) FROM drug) + 1);
SELECT setval('drug_category_sequence', (SELECT MAX(id) FROM drug_category) + 1);
SELECT setval('drug_unit_sequence', (SELECT MAX(id) FROM drug_unit) + 1);
SELECT setval('employee_sequence', (SELECT MAX(id) FROM employee) + 1);
SELECT setval('falcon_sequence', (SELECT MAX(id) FROM falcon) + 1);
SELECT setval('order_sequence', (SELECT MAX(id) FROM "order") + 1);
SELECT setval('order_attach_sequence', (SELECT MAX(id) FROM order_attach) + 1);
SELECT setval('order_detection_type_sequence', (SELECT MAX(id) FROM order_detection_type) + 1);
SELECT setval('order_detection_type_attach_sequence', (SELECT MAX(id) FROM order_detection_type_attach) + 1);
SELECT setval('order_receipt_sequence', (SELECT MAX(id) FROM order_receipt) + 1);
SELECT setval('person_sequence', (SELECT MAX(id) FROM person) + 1);
SELECT setval('receipt_sequence', (SELECT MAX(id) FROM receipt) + 1);
SELECT setval('salary_sequence', (SELECT MAX(id) FROM salary) + 1);
SELECT setval('supplier_sequence', (SELECT MAX(id)  FROM supplier) + 1);
SELECT setval('team_sequence', (SELECT MAX(id) FROM team) + 1);
SELECT setval('team_rule_sequence', (SELECT MAX(id) FROM team_rule) + 1);
SELECT setval('transaction_buy_sequence', (SELECT MAX(id) FROM transaction_buy) + 1);
SELECT setval('transaction_sell_sequence', (SELECT MAX(id) FROM transaction_sell) + 1);
SELECT setval('vacation_sequence', (SELECT MAX(id) FROM vacation) + 1);
SELECT setval('vacation_type_sequence', (SELECT MAX(id) FROM vacation_type) + 1);
