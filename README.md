# PalliDose

เว็บแอพช่วยคำนวณยา opioid และ syringe driver สำหรับทีมดูแลผู้ป่วยแบบประคับประคอง (palliative care) โรงพยาบาลนครไทย ใช้ได้บน iPhone, Android และ iPad

> **ต้นแบบ (v0.8) — ยังไม่ผ่านการรับรองจากคณะกรรมการเภสัชกรรมและการบำบัด (PTC) ห้ามใช้สั่งยาจริง**
> เป็นเครื่องมือช่วยคำนวณสำหรับบุคลากรการแพทย์เท่านั้น ผู้สั่งยาต้องพิจารณาและตรวจสอบซ้ำทุกครั้ง

## ความสามารถ

| แท็บ | ทำอะไร |
| --- | --- |
| ยาเดิม | กรอกแบบ order: ยากินกี่ tab/cap/ml q กี่ชม., ยาฉีดเป็นครั้ง (q กี่ชม.), หยดต่อเนื่อง mg/ชม. หรือ SC syringe driver ต่อ 24 ชม., patch กี่แผ่น, PRN ใช้ไปกี่ครั้งใน 24 ชม. แต่ละรายการแสดงบรรทัด order + mg/วัน + OME แล้วรวมเป็น oral morphine equivalent (OME) |
| แปลงยา | เปลี่ยนเป็น MST, Kapanol, Mo syr q4h, morphine/fentanyl SC 24 ชม. หรือ fentanyl patch พร้อมลด cross-tolerance อัตโนมัติ |
| ปรับโดส | เริ่มยาใหม่ (opioid-naïve) หรือ titrate ตาม pain score และ PRN ที่ใช้ |
| Syringe | ผสม opioid กับ midazolam, haloperidol, hyoscine butylbromide, metoclopramide ออกเป็น order พร้อมวิธีผสม (ml แต่ละตัว + สารเจือจาง) และอัตราตามเครื่อง: syringe pump (ml/h), driver mm/24 ชม. (เช่น Graseby MS26), driver mm/ชม. (เช่น Graseby MS16A) ตั้งระยะเวลา 12/24/48/72 ชม. ได้ |
| ข้อมูล | ตั้งอัตราส่วน morphine กิน:ฉีด (3:1 หรือ 2:1), ค่าแปลง และแหล่งอ้างอิง |

**Sedation & respiration** (หน้ายาเดิม): ใช้ RR, POSS (Pasero Opioid-induced Sedation Scale), PPS v2 และ clinical signs (pinpoint pupils, cyanosis/SpO₂ < 90%, recent opioid ↑/AKI, myoclonus/delirium)
- No signs of toxicity: titration ได้
- Unacceptable sedation (POSS 3 หรือ RR < 10): omit dose, ลด 25–50%, ยังไม่ให้ naloxone
- Severe sedation (POSS 4 หรือ RR < 8): hold opioid, monitor q15min
- Opioid-induced respiratory depression (RR < 8 ร่วมกับ POSS 4 หรือ cyanosis): naloxone 20 mcg IV q2min (PCF / Scottish Palliative Care Guidelines)
- PPS ≤ 30 ที่ซึม/หายใจช้า โดยไม่มี pinpoint pupils หรือ recent opioid ↑: likely terminal phase ไม่ให้ naloxone และไม่หยุด opioid ทันที
- Opioid-induced neurotoxicity: ลดโดสหรือ opioid rotation

แถบข้อมูลผู้ป่วย 2 บรรทัดลอยอยู่ด้านบนเมื่อเลื่อนลง (อายุ · eGFR · RR และ POSS · PPS · OME) (จุดสีบอกระดับความปลอดภัย)
- แตะแถบ: แผ่นข้อมูลผู้ป่วยเลื่อนลงมาจากด้านบนให้แก้ไขได้ทันที โดยไม่เลื่อนหน้ากลับขึ้นไป ปัดขึ้น แตะนอกแผ่น หรือกด "เสร็จ" เพื่อปิด
- ปัดแถบซ้าย/ขวา (หรือกดปุ่ม –): ย่อเป็นปุ่มลอยแบบ AssistiveTouch ลากไปข้างใดก็ได้ แตะเพื่อเปิดแถบกลับมา

ลบยาแต่ละรายการได้ และมีปุ่ม "ล้างข้อมูล" (กด 2 ครั้ง) ล้างข้อมูลผู้ป่วยทั้งหมด

ผลลัพธ์ปัดเป็นจำนวนเม็ด/ml/แผ่นที่ รพ. มีจริง และคัดลอกเป็นข้อความคำสั่งยาได้ มีธีม "คืนจันทร์" (สลับได้ที่ปุ่มข้างชื่อแอพ)

## บัญชียาที่รองรับ

Tramadol 50 mg · MST 10, 30 mg · Kapanol 20 mg · Mo IR 10 mg · Mo syr 2 mg/ml · Morphine ฉีด · Fentanyl ฉีด · Fentanyl patch 25 mcg/h · Pethidine IV (เป็นยาต้นทางเท่านั้น)

ยานอกบัญชี (ใช้คำนวณยาเดิมของผู้ป่วยส่งต่อ): Fentanyl patch 12/50 mcg/h · MST 60 mg · Oxycodone IR/CR · Hydromorphone · Codeine · Tapentadol · Buprenorphine patch · Methadone (แจ้งเตือน ไม่แปลงให้)

PRN ทางปากตั้งได้ q1h (NCCN/NICE) หรือ q2h ในหน้าข้อมูล · ยา SR (MST, Kapanol, OxyContin) ไม่ใช้เป็น PRN แอพจะเตือน

## ค่าแปลงที่ใช้ (→ OME mg/วัน)

| ยา | ค่าแปลง | ที่มา |
| --- | --- | --- |
| Tramadol PO | mg ÷ 10 | BNF (CDC ใช้ 5:1) |
| Morphine PO ทุกรูปแบบ | × 1 | |
| Morphine IV/SC | × 3 (ตั้งเป็น 2 ได้) | NCCN 3:1, EAPC 2–3:1 |
| Fentanyl IV/SC (mcg) | ÷ 10 × 3 | IV fentanyl 100 mcg ≈ IV morphine 10 mg (NCCN) |
| Pethidine IV | ÷ 7.5 × 3 | 75 mg ≈ IV morphine 10 mg |
| Fentanyl patch (mcg/h) | × 2.4 | CDC 2022 |
| Oxycodone PO | × 1.5 | EAPC/CDC |
| Hydromorphone PO | × 4 | NCCN (CDC/EAPC 5) |
| Codeine PO | mg ÷ 10 | BNF (CDC 0.15) |
| Tapentadol PO | × 0.4 | CDC/BNF |
| Buprenorphine patch (mcg/h) | × 2.4 | BNF |
| Methadone | ไม่แปลง | ให้ผู้เชี่ยวชาญปรับ |
| OME → patch | 60–134 = 25, 135–224 = 50, 225–314 = 75, 315–404 = 100 mcg/h | ฉลากยา fentanyl transdermal |

ลด cross-tolerance 25% (50% ในผู้สูงอายุ ≥ 75 ปี, eGFR < 30, ง่วงมาก หรือตับบกพร่อง) เมื่อเปลี่ยนชนิด opioid; ไม่ลดเมื่อเปลี่ยน route ของ morphine, จาก tramadol หรือไป patch

**เรื่องที่ต้องให้ PTC ยืนยัน:** อัตราส่วน fentanyl ฉีดเทียบกับ patch ในแหล่งอ้างอิงไม่ตรงกัน แอพเลือกค่าที่ได้โดสต่ำกว่า (conservative)

## วิธีใช้งาน

เป็นไฟล์ HTML ไฟล์เดียว ไม่ต้องมี server และไม่เก็บข้อมูลผู้ป่วย

- เปิด `index.html` ในเบราว์เซอร์ได้ทันที
- เผยแพร่ผ่าน GitHub Pages: Settings → Pages → Deploy from branch → `main` / root แล้วเปิดลิงก์บนมือถือ กด "Add to Home Screen" เพื่อใช้เหมือนแอพ

## ทดสอบ

`tests/conversion-cases.js` รันตัวอย่างการแปลงยา 11 ชุดผ่านเบราว์เซอร์ headless และพิมพ์คำสั่งยาที่ได้ เพื่อให้เภสัชกร/แพทย์คำนวณมือเทียบ

```
npm i playwright
node tests/conversion-cases.js index.html
```

## แหล่งอ้างอิง

- WHO Guidelines for the pharmacological and radiotherapeutic management of cancer pain in adults and adolescents (2018)
- NCCN Clinical Practice Guidelines: Adult Cancer Pain v2.2025
- ESMO Clinical Practice Guidelines: Management of cancer pain in adult patients (2018); EAPC opioid recommendations (Caraceni 2012)
- CDC Clinical Practice Guideline for Prescribing Opioids for Pain (2022)
- NICE CG140 Palliative care for adults: strong opioids
- King et al. Opioids in cancer pain with renal impairment (Palliat Med 2011)
- Palliative Care Formulary; Dickman & Schneider, The Syringe Driver
