import { useState, useEffect, useCallback, useRef } from "react";

const kkPhonemes = [
  // 母音 Vowels
  {
    symbol: "i",
    type: "母音",
    name: "長音 i",
    description: "嘴角向兩側拉開，像微笑，舌頭前高位",
    examples: ["see /si/", "meet /mit/", "feet /fit/"],
    color: "#E8F4FD",
    accent: "#2196F3",
  },
  {
    symbol: "ɪ",
    type: "母音",
    name: "短音 i",
    description: "嘴巴略微張開，比 i 放鬆，舌頭稍低",
    examples: ["sit /sɪt/", "bit /bɪt/", "him /hɪm/"],
    color: "#E8F4FD",
    accent: "#1565C0",
  },
  {
    symbol: "e",
    type: "母音",
    name: "長音 e",
    description: "嘴角向兩側拉，舌頭前中位",
    examples: ["say /se/", "they /ðe/", "eight /et/"],
    color: "#E8F4FD",
    accent: "#0288D1",
  },
  {
    symbol: "ɛ",
    type: "母音",
    name: "短音 e",
    description: "嘴巴半開，舌頭前中低位",
    examples: ["bed /bɛd/", "ten /tɛn/", "get /ɡɛt/"],
    color: "#E8F4FD",
    accent: "#01579B",
  },
  {
    symbol: "æ",
    type: "母音",
    name: "æ（ash）",
    description: "嘴巴大張，比 e 更開，下巴下沉，這個音中文沒有",
    examples: ["cat /kæt/", "bad /bæd/", "man /mæn/"],
    color: "#FFF3E0",
    accent: "#E65100",
  },
  {
    symbol: "ɑ",
    type: "母音",
    name: "長音 a",
    description: "嘴巴完全張開，舌頭後低位，放鬆",
    examples: ["father /ˈfɑðɚ/", "hot /hɑt/", "car /kɑr/"],
    color: "#E8F4FD",
    accent: "#1976D2",
  },
  {
    symbol: "ɔ",
    type: "母音",
    name: "長音 o（開）",
    description: "嘴巴半開半圓，嘴唇略微圓起，舌後低位",
    examples: ["law /lɔ/", "call /kɔl/", "all /ɔl/"],
    color: "#E8F4FD",
    accent: "#1565C0",
  },
  {
    symbol: "o",
    type: "母音",
    name: "長音 o",
    description: "嘴唇圓起向前，舌頭後中高位",
    examples: ["go /ɡo/", "boat /bot/", "home /hom/"],
    color: "#E8F4FD",
    accent: "#0277BD",
  },
  {
    symbol: "ʊ",
    type: "母音",
    name: "短音 u",
    description: "嘴唇略圓，比 u 放鬆，舌頭後高位但不緊",
    examples: ["book /bʊk/", "good /ɡʊd/", "put /pʊt/"],
    color: "#E8F4FD",
    accent: "#1976D2",
  },
  {
    symbol: "u",
    type: "母音",
    name: "長音 u",
    description: "嘴唇圓起緊縮向前，舌頭後高位",
    examples: ["food /fud/", "blue /blu/", "too /tu/"],
    color: "#E8F4FD",
    accent: "#1565C0",
  },
  {
    symbol: "ʌ",
    type: "母音",
    name: "短音 u（中央）",
    description: "嘴巴半開，舌頭中央偏低，嘴唇不圓",
    examples: ["cup /kʌp/", "but /bʌt/", "love /lʌv/"],
    color: "#FFF3E0",
    accent: "#BF360C",
  },
  {
    symbol: "ə",
    type: "母音",
    name: "弱化母音 schwa",
    description: "英文最常見的音，完全放鬆，嘴巴微開，不用力",
    examples: ["about /əˈbaʊt/", "the /ðə/", "sofa /ˈsoʊfə/"],
    color: "#FFF3E0",
    accent: "#E64A19",
  },
  {
    symbol: "ɚ",
    type: "母音",
    name: "r 化母音",
    description: "發 ə 同時舌頭中後部往上捲，這個音中文沒有",
    examples: ["her /hɚ/", "bird /bɚd/", "butter /ˈbʌtɚ/"],
    color: "#FFF3E0",
    accent: "#D84315",
  },
  {
    symbol: "aɪ",
    type: "雙母音",
    name: "雙母音 ai",
    description: "從 ɑ 滑向 ɪ，下巴先降後升",
    examples: ["my /maɪ/", "bite /baɪt/", "sky /skaɪ/"],
    color: "#F3E5F5",
    accent: "#7B1FA2",
  },
  {
    symbol: "aʊ",
    type: "雙母音",
    name: "雙母音 au",
    description: "從 ɑ 滑向 ʊ，嘴先開後圓",
    examples: ["how /haʊ/", "now /naʊ/", "out /aʊt/"],
    color: "#F3E5F5",
    accent: "#6A1B9A",
  },
  {
    symbol: "ɔɪ",
    type: "雙母音",
    name: "雙母音 oi",
    description: "從 ɔ 滑向 ɪ，嘴唇先圓後展",
    examples: ["boy /bɔɪ/", "oil /ɔɪl/", "coin /kɔɪn/"],
    color: "#F3E5F5",
    accent: "#4A148C",
  },
  // 子音 Consonants
  {
    symbol: "p",
    type: "子音",
    name: "p",
    description: "雙唇閉合後爆破送氣，氣流強",
    examples: ["pen /pɛn/", "cap /kæp/", "top /tɑp/"],
    color: "#E8F5E9",
    accent: "#2E7D32",
  },
  {
    symbol: "b",
    type: "子音",
    name: "b",
    description: "雙唇閉合後爆破，有聲（喉嚨振動）",
    examples: ["bat /bæt/", "big /bɪɡ/", "cab /kæb/"],
    color: "#E8F5E9",
    accent: "#1B5E20",
  },
  {
    symbol: "t",
    type: "子音",
    name: "t",
    description: "舌尖頂上齒齦，爆破送氣",
    examples: ["top /tɑp/", "sit /sɪt/", "let /lɛt/"],
    color: "#E8F5E9",
    accent: "#388E3C",
  },
  {
    symbol: "d",
    type: "子音",
    name: "d",
    description: "舌尖頂上齒齦，爆破有聲",
    examples: ["dog /dɑɡ/", "bed /bɛd/", "end /ɛnd/"],
    color: "#E8F5E9",
    accent: "#2E7D32",
  },
  {
    symbol: "k",
    type: "子音",
    name: "k",
    description: "舌後部頂軟顎，爆破送氣",
    examples: ["cat /kæt/", "back /bæk/", "king /kɪŋ/"],
    color: "#E8F5E9",
    accent: "#1B5E20",
  },
  {
    symbol: "ɡ",
    type: "子音",
    name: "g",
    description: "舌後部頂軟顎，爆破有聲",
    examples: ["go /ɡo/", "big /bɪɡ/", "get /ɡɛt/"],
    color: "#E8F5E9",
    accent: "#388E3C",
  },
  {
    symbol: "f",
    type: "子音",
    name: "f",
    description: "上齒輕咬下唇，氣流從縫隙穿出",
    examples: ["fan /fæn/", "life /laɪf/", "off /ɔf/"],
    color: "#E8F5E9",
    accent: "#2E7D32",
  },
  {
    symbol: "v",
    type: "子音",
    name: "v",
    description: "上齒輕咬下唇，氣流穿出且喉嚨振動",
    examples: ["van /væn/", "love /lʌv/", "very /ˈvɛri/"],
    color: "#E8F5E9",
    accent: "#1B5E20",
  },
  {
    symbol: "θ",
    type: "子音",
    name: "th（清音）",
    description: "舌尖輕放上下齒之間，氣流穿出，不振動，這個音中文沒有",
    examples: ["think /θɪŋk/", "bath /bæθ/", "three /θri/"],
    color: "#FFF3E0",
    accent: "#E65100",
  },
  {
    symbol: "ð",
    type: "子音",
    name: "th（濁音）",
    description: "舌尖輕放上下齒之間，氣流穿出且喉嚨振動，這個音中文沒有",
    examples: ["the /ðə/", "this /ðɪs/", "that /ðæt/"],
    color: "#FFF3E0",
    accent: "#BF360C",
  },
  {
    symbol: "s",
    type: "子音",
    name: "s",
    description: "舌尖靠近上齒齦，氣流從縫隙穿出，尖銳",
    examples: ["sun /sʌn/", "bus /bʌs/", "sea /si/"],
    color: "#E8F5E9",
    accent: "#388E3C",
  },
  {
    symbol: "z",
    type: "子音",
    name: "z",
    description: "與 s 相同位置，但喉嚨振動",
    examples: ["zoo /zu/", "quiz /kwɪz/", "zero /ˈzɪro/"],
    color: "#E8F5E9",
    accent: "#2E7D32",
  },
  {
    symbol: "ʃ",
    type: "子音",
    name: "sh",
    description: "嘴唇略圓前突，舌頭後縮，氣流穿出",
    examples: ["she /ʃi/", "fish /fɪʃ/", "shop /ʃɑp/"],
    color: "#E8F5E9",
    accent: "#1B5E20",
  },
  {
    symbol: "ʒ",
    type: "子音",
    name: "zh（濁音）",
    description: "與 ʃ 相同位置，喉嚨振動",
    examples: ["vision /ˈvɪʒən/", "measure /ˈmɛʒɚ/", "genre /ˈʒɑnrə/"],
    color: "#E8F5E9",
    accent: "#388E3C",
  },
  {
    symbol: "tʃ",
    type: "子音",
    name: "ch",
    description: "t 和 ʃ 連發，舌尖先頂後放氣",
    examples: ["chair /tʃɛr/", "watch /wɑtʃ/", "church /tʃɚtʃ/"],
    color: "#E8F5E9",
    accent: "#2E7D32",
  },
  {
    symbol: "dʒ",
    type: "子音",
    name: "j（有聲）",
    description: "d 和 ʒ 連發，有聲版的 ch",
    examples: ["judge /dʒʌdʒ/", "age /edʒ/", "job /dʒɑb/"],
    color: "#E8F5E9",
    accent: "#1B5E20",
  },
  {
    symbol: "m",
    type: "子音",
    name: "m",
    description: "雙唇閉合，氣流從鼻腔穿出，喉嚨振動",
    examples: ["map /mæp/", "him /hɪm/", "name /nem/"],
    color: "#E8F5E9",
    accent: "#388E3C",
  },
  {
    symbol: "n",
    type: "子音",
    name: "n",
    description: "舌尖頂上齒齦，氣流從鼻腔穿出",
    examples: ["no /no/", "ten /tɛn/", "sun /sʌn/"],
    color: "#E8F5E9",
    accent: "#2E7D32",
  },
  {
    symbol: "ŋ",
    type: "子音",
    name: "ng",
    description: "舌後部頂軟顎，氣流從鼻腔穿出",
    examples: ["sing /sɪŋ/", "ring /rɪŋ/", "king /kɪŋ/"],
    color: "#E8F5E9",
    accent: "#1B5E20",
  },
  {
    symbol: "l",
    type: "子音",
    name: "l",
    description: "舌尖頂上齒齦，氣流從舌兩側穿出",
    examples: ["leg /lɛɡ/", "ball /bɔl/", "all /ɔl/"],
    color: "#E8F5E9",
    accent: "#388E3C",
  },
  {
    symbol: "r",
    type: "子音",
    name: "r",
    description: "舌頭中後部往上捲，不碰任何地方，嘴唇略圓，這個音跟中文的 r 不同",
    examples: ["red /rɛd/", "car /kɑr/", "run /rʌn/"],
    color: "#FFF3E0",
    accent: "#E64A19",
  },
  {
    symbol: "w",
    type: "子音",
    name: "w",
    description: "嘴唇圓起前突，快速滑向下一個母音",
    examples: ["wet /wɛt/", "will /wɪl/", "way /we/"],
    color: "#E8F5E9",
    accent: "#2E7D32",
  },
  {
    symbol: "j",
    type: "子音",
    name: "y",
    description: "舌頭前高位，快速滑向下一個母音",
    examples: ["yes /jɛs/", "you /ju/", "yard /jɑrd/"],
    color: "#E8F5E9",
    accent: "#1B5E20",
  },
  {
    symbol: "h",
    type: "子音",
    name: "h",
    description: "聲門送氣，聲道開放，氣流直接穿出",
    examples: ["hat /hæt/", "hot /hɑt/", "home /hom/"],
    color: "#E8F5E9",
    accent: "#388E3C",
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const words = text.split("/").filter((w) => /[a-zA-Z]/.test(w));
  const word = words[0]?.trim() || text;
  const utt = new SpeechSynthesisUtterance(word);
  utt.lang = "en-US";
  utt.rate = 0.8;
  window.speechSynthesis.speak(utt);
}

function buildQuizQuestion(phoneme, pool) {
  const type = Math.random() < 0.5 ? "A" : "B";
  const distractors = shuffle(pool.filter((p) => p.symbol !== phoneme.symbol)).slice(0, 3);
  const options = shuffle([phoneme, ...distractors]);
  const correctIndex = options.findIndex((o) => o.symbol === phoneme.symbol);
  return { type, phoneme, options, correctIndex };
}

export default function KKFlashcards() {
  const [deck, setDeck] = useState(() => shuffle(kkPhonemes));
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState(new Set());
  const [filter, setFilter] = useState("全部");
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [mode, setMode] = useState("flashcard"); // "flashcard" | "quiz"

  // Quiz state
  const [quizQueue, setQuizQueue] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const current = deck[index];
  const progress = Math.round(((seen.size) / deck.length) * 100);

  const categories = ["全部", "母音", "雙母音", "子音"];

  useEffect(() => {
    const filtered =
      filter === "全部"
        ? kkPhonemes
        : kkPhonemes.filter((p) => p.type === filter);
    setDeck(shuffle(filtered));
    setIndex(0);
    setSeen(new Set());
  }, [filter]);

  const startQuiz = useCallback(() => {
    const pool =
      filter === "全部"
        ? kkPhonemes
        : kkPhonemes.filter((p) => p.type === filter);
    const queue = shuffle(pool);
    setQuizQueue(queue);
    setQuizIndex(0);
    setScore(0);
    setSelected(null);
    setQuizFinished(false);
    setQuizQuestion(buildQuizQuestion(queue[0], pool));
  }, [filter]);

  useEffect(() => {
    if (mode === "quiz") startQuiz();
  }, [mode, filter, startQuiz]);

  useEffect(() => {
    if (mode === "quiz" && quizQuestion?.type === "B") {
      speak(quizQuestion.phoneme.examples[0]);
    }
  }, [mode, quizQuestion]);

  const handleQuizAnswer = (optionIndex) => {
    if (selected !== null || !quizQuestion) return;
    setSelected(optionIndex);
    const correct = optionIndex === quizQuestion.correctIndex;
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      const nextIndex = quizIndex + 1;
      if (nextIndex >= quizQueue.length) {
        setQuizFinished(true);
        return;
      }
      const pool =
        filter === "全部"
          ? kkPhonemes
          : kkPhonemes.filter((p) => p.type === filter);
      setQuizIndex(nextIndex);
      setQuizQuestion(buildQuizQuestion(quizQueue[nextIndex], pool));
      setSelected(null);
    }, 1000);
  };

  const goNext = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setDirection(1);
    setSeen((s) => new Set([...s, current.symbol]));
    setTimeout(() => {
      setIndex((i) => (i + 1) % deck.length);
      setAnimating(false);
    }, 220);
  }, [animating, current, deck.length]);

  const goPrev = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setDirection(-1);
    setTimeout(() => {
      setIndex((i) => (i - 1 + deck.length) % deck.length);
      setAnimating(false);
    }, 220);
  }, [animating, deck.length]);

  const reshuffle = () => {
    const filtered =
      filter === "全部"
        ? kkPhonemes
        : kkPhonemes.filter((p) => p.type === filter);
    setDeck(shuffle(filtered));
    setIndex(0);
    setSeen(new Set());
  };

  useEffect(() => {
    const handle = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [goNext, goPrev]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0f12",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', serif",
      padding: "20px",
      gap: "20px",
    }}>

      {/* Title */}
      <div style={{ textAlign: "center" }}>
        <div style={{ color: "#888", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "4px" }}>
          KK 音標學習
        </div>
        <div style={{ color: "#f0f0f0", fontSize: "22px", fontWeight: "300", letterSpacing: "1px" }}>
          英文發音基底
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: "8px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              border: filter === cat ? "1px solid #f0f0f0" : "1px solid #333",
              background: filter === cat ? "#f0f0f0" : "transparent",
              color: filter === cat ? "#0f0f12" : "#888",
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s",
              letterSpacing: "0.5px",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mode toggle */}
      <div style={{ display: "flex", gap: "8px", position: "relative" }}>
        <button
          onClick={() => setMode((m) => (m === "flashcard" ? "quiz" : "flashcard"))}
          style={{
            padding: "6px 16px",
            borderRadius: "20px",
            border: "1px solid #444",
            background: mode === "quiz" ? "#f0f0f0" : "transparent",
            color: mode === "quiz" ? "#0f0f12" : "#aaa",
            fontSize: "12px",
            cursor: "pointer",
            letterSpacing: "0.5px",
          }}
        >
          {mode === "quiz" ? "🗂 切換回字卡" : "🎯 測驗"}
        </button>
        {mode === "quiz" && quizQueue.length > 0 && (
          <div style={{
            position: "absolute",
            right: "-110px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#f0f0f0",
            fontSize: "13px",
            fontWeight: "600",
            whiteSpace: "nowrap",
          }}>
            分數 {score} / {quizQueue.length}
          </div>
        )}
      </div>

      {mode === "quiz" ? (
        <QuizPanel
          quizQuestion={quizQuestion}
          quizIndex={quizIndex}
          quizQueueLength={quizQueue.length}
          selected={selected}
          score={score}
          quizFinished={quizFinished}
          onAnswer={handleQuizAnswer}
          onRestart={startQuiz}
          onReplay={() => quizQuestion && speak(quizQuestion.phoneme.examples[0])}
        />
      ) : (
      <>
      {/* Progress */}
      <div style={{ width: "320px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#555", fontSize: "11px", marginBottom: "6px" }}>
          <span>{index + 1} / {deck.length}</span>
          <span>已看過 {seen.size} 個 · {progress}%</span>
        </div>
        <div style={{ height: "2px", background: "#222", borderRadius: "1px" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "#f0f0f0",
            borderRadius: "1px",
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      {/* Card */}
      <div
        style={{
          width: "320px",
          minHeight: "380px",
          background: current.color,
          border: `2px solid ${current.accent}`,
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px",
          gap: "16px",
          transition: "all 0.3s ease",
          opacity: animating ? 0 : 1,
          transform: animating ? `translateX(${direction * 30}px)` : "translateX(0)",
          boxSizing: "border-box",
          userSelect: "none",
        }}
      >
        <div
          onClick={() => speak(current.examples[0])}
          style={{
            fontSize: "72px",
            color: current.accent,
            lineHeight: 1,
            fontFamily: "'Georgia', serif",
            cursor: "pointer",
          }}
        >
          {current.symbol}
        </div>
        <div style={{
          color: "#555",
          fontSize: "12px",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}>
          {current.type}
        </div>
        <div style={{
          fontSize: "15px",
          color: "#1a1a1f",
          fontWeight: "600",
          letterSpacing: "0.5px",
        }}>
          {current.name}
        </div>
        <div style={{
          fontSize: "13px",
          color: "#333",
          textAlign: "center",
          lineHeight: 1.7,
          maxWidth: "240px",
        }}>
          {current.description}
        </div>
        <div style={{ width: "100%", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {current.examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => speak(ex)}
              style={{
                background: "rgba(0,0,0,0.06)",
                border: "none",
                borderRadius: "8px",
                padding: "6px 12px",
                fontSize: "13px",
                color: "#1a1a1f",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'Georgia', serif",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.12)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.06)"}
            >
              <span style={{ fontSize: "14px" }}>🔊</span>
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button
          onClick={goPrev}
          style={{
            width: "48px", height: "48px",
            borderRadius: "50%",
            border: "1px solid #333",
            background: "transparent",
            color: "#888",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#f0f0f0"; e.currentTarget.style.color = "#f0f0f0"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#888"; }}
        >
          ←
        </button>

        <button
          onClick={reshuffle}
          style={{
            padding: "10px 20px",
            borderRadius: "24px",
            border: "1px solid #333",
            background: "transparent",
            color: "#666",
            fontSize: "12px",
            cursor: "pointer",
            letterSpacing: "1px",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#888"; e.currentTarget.style.color = "#f0f0f0"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#666"; }}
        >
          重新洗牌
        </button>

        <button
          onClick={goNext}
          style={{
            width: "48px", height: "48px",
            borderRadius: "50%",
            border: "1px solid #333",
            background: "transparent",
            color: "#888",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#f0f0f0"; e.currentTarget.style.color = "#f0f0f0"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#888"; }}
        >
          →
        </button>
      </div>

      <div style={{ color: "#333", fontSize: "11px", letterSpacing: "1px" }}>
        ← → 換卡　🔊 點符號或例字聽發音
      </div>
      </>
      )}
    </div>
  );
}

function QuizPanel({
  quizQuestion,
  quizIndex,
  quizQueueLength,
  selected,
  score,
  quizFinished,
  onAnswer,
  onRestart,
  onReplay,
}) {
  if (quizFinished) {
    return (
      <div style={{
        width: "320px",
        minHeight: "380px",
        background: "#1a1a1f",
        border: "2px solid #2a2a30",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        padding: "32px 24px",
        boxSizing: "border-box",
      }}>
        <div style={{ color: "#888", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>
          測驗結束
        </div>
        <div style={{ color: "#f0f0f0", fontSize: "40px", fontWeight: "300" }}>
          {score} / {quizQueueLength}
        </div>
        <div style={{ color: "#666", fontSize: "13px" }}>
          正確率 {Math.round((score / quizQueueLength) * 100)}%
        </div>
        <button
          onClick={onRestart}
          style={{
            marginTop: "12px",
            padding: "10px 24px",
            borderRadius: "24px",
            border: "1px solid #444",
            background: "#f0f0f0",
            color: "#0f0f12",
            fontSize: "13px",
            cursor: "pointer",
            letterSpacing: "1px",
          }}
        >
          重新開始
        </button>
      </div>
    );
  }

  if (!quizQuestion) return null;

  const { type, phoneme, options, correctIndex } = quizQuestion;

  return (
    <>
      <div style={{ width: "320px", color: "#555", fontSize: "11px", textAlign: "right" }}>
        第 {quizIndex + 1} / {quizQueueLength} 題
      </div>
      <div style={{
        width: "320px",
        minHeight: "380px",
        background: "#1a1a1f",
        border: "2px solid #2a2a30",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
        gap: "20px",
        boxSizing: "border-box",
      }}>
        {type === "A" ? (
          <>
            <div style={{ color: "#666", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>
              這個符號的發音是？
            </div>
            <div style={{ fontSize: "72px", color: "#f0f0f0", lineHeight: 1, fontFamily: "'Georgia', serif" }}>
              {phoneme.symbol}
            </div>
            <button
              onClick={onReplay}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid #444",
                background: "transparent",
                color: "#f0f0f0",
                fontSize: "13px",
                cursor: "pointer",
                letterSpacing: "0.5px",
              }}
            >
              🔊 播放發音
            </button>
          </>
        ) : (
          <>
            <div style={{ color: "#666", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>
              聽發音，選出正確的音標符號
            </div>
            <button
              onClick={onReplay}
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                border: "1px solid #444",
                background: "transparent",
                color: "#f0f0f0",
                fontSize: "26px",
                cursor: "pointer",
              }}
            >
              🔊
            </button>
          </>
        )}

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
          {options.map((opt, i) => {
            let bg = "rgba(255,255,255,0.05)";
            let border = "1px solid #333";
            let color = "#ccc";
            if (selected !== null) {
              if (i === correctIndex) {
                bg = "rgba(76, 175, 80, 0.25)";
                border = "1px solid #4caf50";
                color = "#aaffae";
              } else if (i === selected) {
                bg = "rgba(244, 67, 54, 0.25)";
                border = "1px solid #f44336";
                color = "#ffb3ad";
              }
            }
            return (
              <button
                key={opt.symbol}
                onClick={() => onAnswer(i)}
                disabled={selected !== null}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border,
                  background: bg,
                  color,
                  fontSize: type === "A" ? "13px" : "20px",
                  cursor: selected !== null ? "default" : "pointer",
                  fontFamily: "'Georgia', serif",
                  transition: "all 0.2s",
                  boxSizing: "border-box",
                }}
              >
                {type === "A" ? opt.description : opt.symbol}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
