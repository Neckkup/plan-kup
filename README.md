# plan-kup

สกิลของ Claude Code สำหรับวางโครงงานก่อนเริ่ม dev เว็บ แอป และ back office โดยเปลี่ยน brief ของลูกค้าเป็น 3 อย่าง:

- feature list จัด priority (MVP / Phase 1 / Phase 2 / Later)
- prototype หน้าจอหลักบน Design canvas ที่กดดู flow ได้
- คำถามที่ยังเปิด และ checklist สิ่งที่ต้องตัดสินก่อนเขียนโค้ด

ส่งออก 2 ที่: canvas ให้ลูกค้าดู และ `docs/planning/` ใน repo ให้ทีม dev ใช้

ขั้นตอนอยู่ใน [SKILL.md](SKILL.md) schema ของ feature list อยู่ใน [references/feature-list.md](references/feature-list.md)
หลังเริ่ม dev ใช้ [deploy-kup](https://github.com/Neckkup/deploy-kup) ทำ CI/CD และ [docs-kup](https://github.com/Neckkup/docs-kup) ทำเอกสารระบบต่อได้

## features.json และ script

feature list เก็บใน `features.json` ไฟล์เดียว แล้วให้ script สร้างไฟล์อื่นออกมา:

```
python3 scripts/features.py check      features.json                  # ตรวจ priority ขัดกัน, MVP ไม่มีหน้าจอ, MVP เกิน budget ฯลฯ
python3 scripts/features.py render-md  features.json docs/planning/   # feature-list.md, open-questions.md, decisions.md (ไม่เขียนทับไฟล์ที่ไม่ได้สร้างเอง เว้นแต่ใส่ --force)
python3 scripts/features.py render-dc  features.json <root>/project/Feature-List.dc.html --canvas <root>/project/canvas.json
```

budget ของ MVP คำนวณจาก `"mvpBudget": {"weeks": 8, "devs": 2}` = สัปดาห์ × คน × 3 แต้ม × 0.8 ข้อความของ script เป็นไทยหรืออังกฤษตาม `lang` ใน features.json

## ติดตั้ง

```
git clone <repo> ~/plan-kup
ln -s ~/plan-kup ~/.claude/skills/plan-kup
```

## ใช้งาน

ใน Claude Code พิมพ์ `/plan-kup` หรือขอแบบปกติ เช่น "ได้ work list จากลูกค้ามา ช่วยทำ feature list กับ prototype ก่อนเริ่ม dev" หรือ "ตรวจ feature list นี้ว่า MVP ใหญ่เกินไหม"
