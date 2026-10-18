export type Fruit = {
  no: string;
  name: string;
  en: string;
  char: string;
  image: string;
  months: number[];
  season: string;
  area: string;
  taste: string;
  desc: string;
  bg: string;
  fg: string;
};

export const fruits: Fruit[] = [
  {
    no: "01",
    name: "愛文芒果",
    en: "Irwin Mango",
    char: "芒",
    image: "/images/mango.jpg",
    months: [5, 6, 7, 8],
    season: "五月至八月",
    area: "台南玉井、屏東枋山",
    taste: "濃甜、香氣飽滿、果肉細緻",
    desc: "夏天的開幕式。果皮轉紅、飄出香氣的那一刻，就是台灣人說「芒果季到了」的時候。",
    bg: "#F0A81B",
    fg: "#3A2400",
  },
  {
    no: "02",
    name: "金鑽鳳梨",
    en: "Tainung No.17 Pineapple",
    char: "梨",
    image: "/images/pineapple.jpg",
    months: [3, 4, 5, 6, 7],
    season: "三月至七月",
    area: "嘉義、台南關廟",
    taste: "酸甜平衡、纖維細、不刺舌",
    desc: "果心也能直接吃的鳳梨。香氣足、汁水多，是台灣外銷最成功的水果之一。",
    bg: "#D9D24A",
    fg: "#2D2B00",
  },
  {
    no: "03",
    name: "玉荷包荔枝",
    en: "Yu Her Bao Lychee",
    char: "荔",
    image: "/images/lychee.jpg",
    months: [5, 6, 7],
    season: "五月至七月",
    area: "高雄大樹、南投",
    taste: "清甜、汁多、帶花香",
    desc: "核小肉厚，剝開時先聞到花香。產期短，錯過就要等一年。",
    bg: "#D4405F",
    fg: "#FFF1EC",
  },
  {
    no: "04",
    name: "黑珍珠蓮霧",
    en: "Black Pearl Wax Apple",
    char: "霧",
    image: "/images/wax-apple.jpg",
    months: [11, 12, 1, 2, 3, 4],
    season: "十一月至隔年四月",
    area: "屏東佳冬、林邊",
    taste: "清脆、多汁、微甜",
    desc: "冬天最解渴的水果。顏色深到近乎黑紅，咬下去的清脆聲是它的招牌。",
    bg: "#7B1E3A",
    fg: "#FBE7E0",
  },
  {
    no: "05",
    name: "麻豆文旦",
    en: "Pomelo",
    char: "旦",
    image: "/images/pomelo.jpg",
    months: [9, 10],
    season: "九月至十月",
    area: "台南麻豆、花蓮瑞穗",
    taste: "清甜、微苦回甘、柚花香",
    desc: "中秋節的主角。皮厚、果肉飽滿，剝一顆文旦，全家就會圍過來。",
    bg: "#7FA650",
    fg: "#10200A",
  },
  {
    no: "06",
    name: "鳳梨釋迦",
    en: "Pineapple Sugar Apple",
    char: "釋",
    image: "/images/sugar-apple.jpg",
    months: [7, 8, 9, 10, 11, 12, 1, 2],
    season: "七月至隔年二月",
    area: "台東",
    taste: "綿密如冰淇淋、帶鳳梨酸香",
    desc: "台東的名片。要等它微微變軟才好吃，等待也是享受的一部分。",
    bg: "#2F5D4A",
    fg: "#E6F2D8",
  },
];
