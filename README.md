# PalliDose

เว็บแอพช่วยคำนวณยา opioid และ syringe driver สำหรับทีมดูแลผู้ป่วยแบบประคับประคอง (palliative care) โรงพยาบาลนครไทย ใช้ได้บน iPhone, Android และ iPad

> **ต้นแบบ (v0.3) — ยังไม่ผ่านการรับรองจากคณะกรรมการเภสัชกรรมและการบำบัด (PTC) ห้ามใช้สั่งยาจริง**
> เป็นเครื่องมือช่วยคำนวณสำหรับบุคลากรการแพทย์เท่านั้น ผู้สั่งยาต้องพิจารณาและตรวจสอบซ้ำทุกครั้ง

## ความสามารถ

| แท็บ | ทำอะไร |
| --- | --- |
| ยาเดิม | กรอกยาที่ให้ประจำและ PRN ที่ใช้จริงใน 24 ชม. แล้วรวมเป็น oral morphine equivalent (OME) |
| แปลงยา | เปลี่ยนเป็น MST, Kapanol, Mo syr q4h, morphine/fentanyl SC 24 ชม. หรือ fentanyl patch พร้อมลด cross-tolerance อัตโนมัติ |
| ปรับโดส | เริ่มยาใหม่ (opioid-naïve) หรือ titrate ตาม pain score และ PRN ที่ใช้ |
| Syringe | ผสม opioid กับ midazolam, haloperidol, hyoscine butylbromide, metoclopramide ออกเป็น order พร้อมวิธีผสม (ml แต่ละตัว + สารเจือจาง) และอัตราตามเครื่อง: syringe pump (ml/h), driver mm/24 ชม. (เช่น Graseby MS26), driver mm/ชม. (เช่น Graseby MS16A) ตั้งระยะเวลา 12/24/48/72 ชม. ได้ |
| ข้อมูล | ตั้งอัตราส่วน morphine กิน:ฉีด (3:1 หรือ 2:1), ค่าแปลง และแหล่งอ้างอิง |

ลบยาแต่ละรายการได้ และมีปุ่ม "ล้างข้อมูล" (กด 2 ครั้ง) ล้างข้อมูลผู้ป่วยทั้งหมด

ผลลัพธ์ปัดเป็นจำนวนเม็ด/ml/แผ่นที่ รพ. มีจริง และคัดลอกเป็นข้อความคำสั่งยาได้ มีธีม "คืนจันทร์" (สลับได้ที่ปุ่มข้างชื่อแอพ)

## บัญชียาที่รองรับ

Tramadol 50 mg · MST 10, 30 mg · Kapanol 20 mg · Mo IR 10 mg · Mo syr 2 mg/ml · Morphine ฉีด · Fentanyl ฉีด · Fentanyl patch 25 mcg/h · Pethidine IV (เป็นยาต้นทางเท่านั้น)

## ค่าแปลงที่ใช้ (→ OME mg/วัน)

| ยา | ค่าแปลง | ที่มา |
| --- | --- | --- |
| Tramadol PO | mg ÷ 10 | BNF (CDC ใช้ 5:1) |
| Morphine PO ทุกรูปแบบ | × 1 | |
| Morphine IV/SC | × 3 (ตั้งเป็น 2 ได้) | NCCN 3:1, EAPC 2–3:1 |
| Fentanyl IV/SC (mcg) | ÷ 10 × 3 | IV fentanyl 100 mcg ≈ IV morphine 10 mg (NCCN) |
| Pethidine IV | ÷ 7.5 × 3 | 75 mg ≈ IV morphine 10 mg |
| Fentanyl patch (mcg/h) | × 2.4 | CDC 2022 |
| OME → patch | 60–134 = 25, 135–224 = 50, 225–314 = 75, 315–404 = 100 mcg/h | ฉลากยา fentanyl transdermal |

ลด cross-tolerance 25% (50% ในผู้สูงอายุ ≥ 75 ปี, eGFR < 30, ง่วงมาก หรือตับบกพร่อง) เมื่อเปลี่ยนชนิด opioid; ไม่ลดเมื่อเปลี่ยน route ของ morphine, จาก tramadol หรือไป patch

**เรื่องที่ต้องให้ PTC ยืนยัน:** อัตราส่วน fentanyl ฉีดเทียบกับ patch ในแหล่งอ้างอิงไม่ตรงกัน แอพเลือกค่าที่ได้โดสต่ำกว่า (conservative)

## วิธีใช้งาน

เป็นไฟล์ HTML ไฟล์เดียว ไม่ต้องมี server และไม่เก็บข้อมูลผู้ป่วย

- เปิด `index.html` ในเบราว์เซอร์ได้ทันที
- เผยแพร่ผ่าน GitHub Pages: Settings → Pages → Deploy from branch → `main` / root แล้วเปิดลิงก์บนมือถือ กด "Add to Home Screen" เพื่อใช้เหมือนแอพ

## ทดสอบ

`tests/conversion-cases.js` รันตัวอย่างการแปลงยา 17 กรณีผ่านเบราว์เซอร์ headless และพิมพ์คำสั่งยาที่ได้ เพื่อให้เภสัชกร/แพทย์คำนวณมือเทียบ

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
