# איך מגיעים לרמת עריכה של יוצרי AI מובילים: מחקר עבור Raz

## 0. מה הפלאגין שאתה משתמש בו
"הפלאגין של אסף קליין" הוא כנראה **assafkip/claude-video-editor**: https://github.com/assafkip/claude-video-editor
זה פלאגין ל-Claude שעושה חיתוך לפי תמלול, כתוביות, color grade ומושן גרפיקס ב-HyperFrames (HTML+GSAP), וקריינות ב-ElevenLabs. הוא חזק בעיקר ב"עריכה לפי תמלול". הוא לא נבנה כספריית מושן דיזיין ברמת אינסטגרם.

## 1. אבחנה: למה התוצאה שלך פחות טובה
1. **אין מערכת עיצוב קבועה.** אצל היוצרים המובילים הכתוביות, האייקונים, הפונטים והקצב חוזרים על עצמם וכתובים בטמפלייט. אצלך הסוכן ממציא סגנון חדש בכל פעם, ולכן התוצאה "גנרית".
2. **ה-easing וה-timing דיפולטיביים.** אצל המקצוענים יש overshoot ו-spring עם bounce, אנימציות כניסה של 6-10 פריימים, יציאות חדות, motion blur ו-anticipation. סוכן בלי הנחיה כותב fade/slide ליניאריים של 0.5 שניות.
3. **אין סאונד דיזיין.** כל פופ של כתובית, אייקון או מעבר מלווה אצלם ב-SFX (whoosh, pop, click, riser). חצי מהתחושה של "חדות" מגיעה מהאודיו.
4. **אין assets מוכנים.** הם משתמשים באייקוני Lottie מונפשים, אימוג'י מונפשים, ב-B-roll ובטמפלייטים קנויים. הסוכן מצייר SVG סטטי.
5. **אין סבב ביקורת ויזואלי.** הסוכן לא "רואה" את התוצאה. בלי snapshot של פריימים ותיקון לפיהם, הליטוש לא קורה.
6. **אמת לא נוחה:** רוב יוצרי הרילס המובילים **לא** עורכים רק עם קוד. הם עובדים ב-CapCut, Premiere או After Effects עם טמפלייטים ופריסטים, ומוסיפים כלים כמו Submagic או Captions לכתוביות. קוד (Remotion/HyperFrames) יכול להגיע לרמה הזו, בעיקר בכתוביות קינטיות, אינפוגרפיקה וטקסט, אבל רק עם טמפלייטים שנבנו פעם אחת בקפידה ושימוש חוזר בהם. פרומפט חד-פעמי לא יספיק.

## 2. כלים ופלאגינים להוסיף (כל הקישורים נבדקו וחזרו 200)
**Skills לסוכן:**
- סקילס רשמיים של HyperFrames (21 סקילס: core, animation, creative, registry, media-use, keyframes): https://github.com/heygen-com/hyperframes
  `npx skills add heygen-com/hyperframes` (בחר Core Skills), או `npx hyperframes skills` לסט המלא. הכי חשובים לך: `/hyperframes-animation`, `/hyperframes-creative`, `/hyperframes-registry`.
- קטלוג רכיבים מוכנים של HyperFrames (חפש בו לפני שאתה בונה מאפס): https://hyperframes.heygen.com/catalog
- Remotion Agent Skills הרשמיים: https://github.com/remotion-dev/skills | מדריך: https://www.remotion.dev/docs/ai/skills
- GSAP skills: https://github.com/greensock/gsap-skills

**כתוביות:**
- Remotion Captions (word-level, TikTok-style pages): https://www.remotion.dev/docs/captions
- טמפלייט TikTok הרשמי של Remotion (Whisper ועוד כתוביות מילה-מילה): https://github.com/remotion-dev/template-tiktok
- Whisper לתמלול מקומי: https://github.com/openai/whisper

**מעברים ואנימציה:**
- @remotion/transitions: https://www.remotion.dev/docs/transitions
- React Bits (אנימציות טקסט ורכיבים מוכנים להעתקה): https://reactbits.dev
- Anime.js: https://animejs.com

**אייקונים מונפשים:**
- LottieFiles (אלפי אייקונים מונפשים חינם): https://lottiefiles.com
- Remotion Lottie: https://www.remotion.dev/docs/lottie | dotLottie: https://github.com/LottieFiles/dotlottie-web
- Lucide ו-Iconify (SVG נקי שמונפש עם GSAP): https://lucide.dev , https://iconify.design

**סאונד:**
- ElevenLabs MCP (קריינות וגם יצירת SFX): https://github.com/elevenlabs/elevenlabs-mcp
- מומלץ לבנות ספריית SFX קבועה של 15-20 צלילים (pop, whoosh, click, riser, glitch) ולהגדיר לסוכן מתי להשתמש בכל אחד.

**כלים שמשמשים לבנצ'מרק או כהשלמה:**
- Submagic: https://submagic.co
- Captions: https://www.captions.ai
אלה הכלים שרוב "מכונות התוכן" באינסטגרם משתמשות בהם לכתוביות ולזומים האוטומטיים. כדאי לנסות פעם אחת כדי להבין מה הרף שצריך לעבור.

## 3. המלצות לתהליך העבודה
1. **בנה Brand Kit פעם אחת** (קובץ `style.md`, ואפשר גם `tokens.json`): 2 פונטים, פלטה של 4 צבעים, סגנון כתוביות (גודל, stroke, צל, צבע הדגשה), ספריית easings, ספריית SFX. כל פרומפט יפנה לקובץ הזה.
2. **בנה 5-8 רכיבים קבועים** ושכלל כל אחד מהם עד שהוא מושלם: כתובית מילה-מילה, הדגשת מילת מפתח, pop של אייקון, מעבר whip/zoom, כרטיס כותרת, lower-third, הצגת מספר/סטטיסטיקה. אחר כך הסוכן רק מרכיב ממה שכבר קיים.
3. **תכנון לפי beats:** קודם תמלול מילה-מילה, אחר כך טבלת beats (מה קורה בכל 1-2 שניות), ורק אז קוד. כלל: משהו ויזואלי משתנה כל 1.5-3 שניות.
4. **סבב ביקורת:** `npx hyperframes snapshot/preview` או Remotion Studio. מייצאים פריימים בנקודות מפתח, נותנים לסוכן להסתכל ולתקן. 2-3 סבבים לפחות.
5. **שילוב היברידי:** חיתוך ראשוני בקוד (הפלאגין של assafkip), שכבת מושן ב-HyperFrames/Remotion עם רקע שקוף, ובדיקה סופית או SFX ב-CapCut אם נוח לך. אין בזה בושה, וזה מה שהמקצוענים עושים.
6. **הנדסה הפוכה:** קח רילס שאתה אוהב, עבור עליו פריים-פריים (או תן לסוכן לנתח פריימים), ורשום את התזמונים במילישניות. זה הופך לספק מדויק לסוכן.

## 4. תבניות פרומפטים מוכנות

### פרומפט 1: כתוביות קינטיות ברמת פרו
```
Use /hyperframes (or Remotion skills). Build a reusable KineticCaptions component for 1080x1920 @30fps from word-level timestamps in captions.json.
Style spec (follow exactly):
- Show 1-3 words per page, max 12 chars per line, centered at 62% height, safe margins 80px.
- Font: Montserrat 900 (or brand font), 96px, white fill, 10px black stroke + soft drop shadow (0 6px 0 rgba(0,0,0,.35)).
- Active word: scale 1 -> 1.18 -> 1.0 with spring (stiffness 300, damping 14, ~6 frames overshoot), color switches to #FFD400.
- Page in: each word pops from scale 0.6 + translateY 20px to 1.0 over 5 frames, staggered 2 frames, easing back.out(2.2).
- Page out: hard cut (0 frames) on the next page; NO fades.
- Keywords listed in keywords.json: emoji/icon pops above the word (Lottie if available), plus 1-frame white flash on the caption.
- Freeze emphasis: on words tagged "freeze", hold the page 12 frames longer with a 3% slow zoom on the background.
- Emit sfx cues (pop.wav on keyword, click.wav on page change at -6dB) into the audio track.
Then render snapshots at 5 keyword timestamps, inspect them, and fix anything that is off-spec before final render.
```

### פרומפט 2: מעברים חדים
```
Create a transitions library with 4 transitions, each 6-10 frames at 30fps:
1) Whip pan: outgoing scene translateX -100% with motion blur (directional blur 40px peak at mid), incoming from +100%, easing expo.inOut, whoosh.wav synced to the midpoint.
2) Zoom punch: incoming scale 1.35 -> 1.0, 8 frames, power4.out, plus a 2-frame white flash at 30% opacity.
3) Glitch cut: 3 frames of RGB split (±12px) + horizontal slice offset, then hard cut.
4) Mask wipe: diagonal shape wipe in brand accent color, 8 frames, then reveal.
Rules: never use crossfade longer than 4 frames. Every transition lands on a beat or word boundary from captions.json. Use @remotion/transitions or HyperFrames shader-transitions where available. Expose as props so I can choose a transition per cut.
```

### פרומפט 3: אנימציית אייקונים ומידע
```
For each beat in beats.md, add one animated visual element (icon, stat, or logo):
- Prefer Lottie from LottieFiles (local .json in /assets/lottie). Fallback: Lucide SVG animated with GSAP (stroke draw-on 10 frames, then scale pop with back.out(3)).
- Entry: 8 frames, anticipation (scale 0.9 for 2 frames, then overshoot 1.12, settle 1.0). Idle: subtle float ±6px sine over 60 frames. Exit: 5 frames scale to 0 with power3.in.
- Numbers count up over 15 frames with an ease-out, ticking SFX.
- Layout: icon in the top third, never overlapping captions; use a rounded-rect card (radius 32, 12% white glass, backdrop blur) behind icons.
- Visual change every 1.5-3s. No element on screen longer than 4s without motion.
Respect style.md (fonts, palette, easings). After building, render a contact sheet of frames every 15 frames and critique it against these rules, then fix.
```

## שורה תחתונה
לא חסר לך פלאגין קסם אחד. חסרים לך (א) הסקילס הרשמיים של HyperFrames ו-Remotion, כולל registry ו-animation, (ב) ספריית assets: Lottie, SFX, פונטים, (ג) קובץ style עם ספציפיקציית easing ו-timing מדויקת, ו-(ד) סבב ביקורת ויזואלי. עם רכיבים שנבנים פעם אחת ונשמרים לשימוש חוזר, קוד מגיע לרמה של הרילס המובילים. כשמתחילים מאפס בכל פעם, זה לא עובד.
