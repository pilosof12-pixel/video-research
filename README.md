# video-research: ערכת כלים לרילס ברמה מקצועית (HyperFrames + Remotion)

אותה ערכה עובדת ב-**Cursor**, **Claude Code** ו-**Codex**. כולם קוראים את אותם סקילס, אותו תהליך עבודה ואותו `style.md`.

## מה יש כאן
| קובץ/תיקייה | מה זה |
|---|---|
| `setup.sh` / `setup.ps1` | התקנה בפקודה אחת (מק/לינוקס / ווינדוס) |
| `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/video.mdc` | תהליך העבודה שהסוכן חייב לעקוב אחריו |
| `style.md` | ערכת המיתוג: פונטים, צבעים, כתוביות, easing, תזמונים, SFX. **את זה עורכים** |
| `remotion/` | פרויקט Remotion עם רכיבים מוכנים + דמו |
| `prompts/` | פרומפטים מוכנים להעתקה |
| `assets/lottie`, `assets/sfx` | מקום לאנימציות ולסאונדים (עם מקורות חינמיים) |
| `mcp.example.json` | חיבור ל-ElevenLabs (קריינות, תמלול, SFX) |
| `docs-research.md` | דוח המחקר המלא |

## שלב 1: להעלות לגיטהאב (פעם אחת)
1. פתח את הזיפ. תקבל תיקייה `video-research`.
2. בטרמינל, בתוך התיקייה:
   ```bash
   git init && git add . && git commit -m "video toolkit"
   git branch -M main
   git remote add origin https://github.com/pilosof12-pixel/video-research.git
   git push -u origin main
   ```
   (אפשר גם: ב-GitHub, Add file ← Upload files ← לגרור את כל התוכן, כולל התיקיות הנסתרות `.cursor`.)

## שלב 2: בכל מחשב חדש
```bash
git clone https://github.com/pilosof12-pixel/video-research.git
cd video-research
./setup.sh            # מק / לינוקס
# ווינדוס: powershell -ExecutionPolicy Bypass -File .\setup.ps1
```
דרישות: Node 22 ומעלה, git, ffmpeg.

## שלב 3: חיבור ElevenLabs (לא חובה)
העתק את `mcp.example.json` ל-`.cursor/mcp.json` (Cursor) או ל-`.mcp.json` (Claude Code), והכנס את המפתח. לא מעלים את המפתח לגיטהאב (הקובץ `mcp.json` נמצא ב-gitignore).

## שלב 4: לעבוד
1. פתח את התיקייה ב-Cursor, ב-Claude Code (`claude`) או ב-Codex (`codex`).
2. ערוך את `style.md` לצבעים ולפונטים שלך.
3. שים את הסרטון בתיקייה והדבק את הפרומפט המתאים:
   - **רילס מלא מסרטון:** `prompts/00-full-reel.md`
   - **רק כתוביות קינטיות:** `prompts/01-kinetic-captions.md`
   - **מעברים:** `prompts/02-transitions.md`
   - **אייקונים ומספרים:** `prompts/03-icons-and-stats.md`
4. הסוכן יכין טבלת beats, יחכה לאישור שלך, יבנה, ירנדר תמונות, יבקר את עצמו, יתקן וירנדר סופי.

## לראות את הדמו
```bash
cd remotion
npm run studio     # תצוגה חיה בדפדפן
npm run render     # out/demo.mp4
```

## טיפים
- הוסף סאונדים ל-`assets/sfx` (ההנחיות בקובץ README שם). זה עושה חצי מהרושם.
- כשמשהו נראה טוב, בקש מהסוכן להפוך אותו לרכיב קבוע ב-`remotion/src/components`.
