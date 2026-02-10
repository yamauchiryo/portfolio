export type FileId = "README.md" | "projects.md" | "research.md" | "intern.md";

export const FILES: { id: FileId; label: string; group: "root" }[] = [
  { id: "README.md", label: "README.md", group: "root" },
  { id: "projects.md", label: "projects.md", group: "root" },
  { id: "research.md", label: "research.md", group: "root" },
  { id: "intern.md", label: "intern.md", group: "root" },
];

export const PROFILE = {
  name: "山内 瞭",
  title: "Software Engineer / AI Engineer（研究×実装）",
  affiliation: "立命館大学院　情報理工学研究科　1回生",
  location: "Tokyo, Japan",
  links: {
    lab: "https://www.si-lab.org/index-ja.html",
    github: "https://github.com/yamauchiryo/",
    email: "ryo62y13@icloud.com",
  },
  intro: [
    "初めまして．山内瞭と申します．立命館大学院情報理工学研究科でLLMエージェントの研究を行っています．\nソフトウェアエンジニアとしても活動しており，AI関連のプロジェクトに携わっています．",
  ],
  hobbies: [
    { name: "ゴルフ", image: "/assets/hobbies/golf.jpg" },
    { name: "マラソン" },
    { name: "海外旅行" },
  ],
  skills: [
    { name: "Python", image: "/assets/skills/python.svg" },
    { name: "React", image: "/assets/skills/react.svg" },
    { name: "MySQL", image: "/assets/skills/mysql.svg" },
    { name: "CSS", image: "/assets/skills/css3.svg" },
    { name: "HTML", image: "/assets/skills/html5.svg" },
    { name: "FastAPI", image: "/assets/skills/fastapi.svg" },
    { name: "Docker", image: "/assets/skills/docker.svg" },
  ],
  certifications: [
    "Python 3 エンジニア認定基礎試験",
    "基本情報技術者",
    "TOEIC 745",
  ],
};

export type Project = {
  title: string;
  tags: string[];
  org?: string;
  lead?: string;
  paragraphs: string[];
  highlights: string[];
  summary?: string;
  references?: string[];
  languages?: string[];
  image?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "ShigaChat",
    tags: ["Team Project", "滋賀国際協会にて運用中"],
    image: "/assets/shigachat.png",
    paragraphs: [
      "Shiga Chatは、滋賀国際協会の職員を対象とした多言語対応の限定公開Q&Aサービスです。",
      "研究室内の活動の一環で開発されました。活動終了後でも運用に至るまで実装をし、実際に滋賀国際協会内で運用中です。",
      "ChatGPTとRAGを組み合わせることで、日常生活に関する質問に対して、迅速かつ地域特化の回答を提供します。ユーザの質問に、RAGで関連する情報をChatGPTに渡します。渡されたテキストをChatGPTが自然な形で回答生成し、ユーザに返します。",
    ],
    image: "/assets/shigachat.png",
    highlights: [
      "ユーザ体験の向上：質問の投稿から回答までの流れを直感的に設計。画面遷移や操作性に配慮し、初めて使う外国人ユーザでも使いやすいUIを意識。",
      "情報の正確性と安全性：ChatGPTの誤回答（ハルシネーション）を防ぐため、回答の元となるQ&Aデータベースを構築。また、人手による内容チェック、多言語対応の文法チェックを導入。",
      "多言語対応：通知や検索などの基本操作が全対応言語で可能なように設計し、多文化に配慮。",
    ],
  },
  {
    title: "Diary Board",
    tags: ["Team Project"],
    image: "/assets/図1.png",
    paragraphs: [
      "Diary Boardは、非自発的に来日した外国人児童が、日本の学校現場で孤立しないように設計された多言語対応の教育支援ツールです。",
      "研究室内の活動の一環で滋賀国際協会へ訪問し、課題をヒアリングする中でこのシステムを開発しました。",
      "日記を通じて外国人児童の過ごす多文化を知り、文化的背景や言語の違いによる障壁を取り除きます。そして児童同士の交流を促進することで、包摂的な学級づくりを支援します。",
    ],
    highlights: [
      "継続利用の促進：日記を継続的に書いてもらうために、ランキング機能や称号機能を実装。",
      "多言語学習支援：日記の内容に関するクイズ機能を追加し、楽しみながら言語学習できる仕組みを提供。",
    ],
  },
];

export const RESEARCH = {
  title: "Shared Plans に基づくクロスドメインQA向けマルチLLMエージェント",
  summary:
    "近年，LLMを用いた質問応答システムは広く利用されているが，複数分野の知識を段階的に結びつけるクロスドメインQAでは誤答が生じやすい。例えば「忠犬ハチ公が待ち続けた駅はどこで，その飼い主は誰か」といった質問では，人物・地理・出来事を順に関連付ける推論が必要となる。既存手法では推論計画を単一エージェントが管理することが多く，誤った前提や hallucination が推論全体に波及しやすいという課題がある。本研究では1990年代に発表されたマルチエージェントの静的協調フレームワークであるSharedPlans 理論に基づき，複数LLMが計画を共有・合意しながら協調的に推論を進めるクロスドメインQA手法を提案する。",
};

export const INTERN = {
  title: "AIプロトタイプ開発（業務）",
  summary: [
    "音声対話フロー設計、実装、デバッグ、改善提案",
    "Realtime / FastAPI / React / Prompt設計",
  ],
  outcomes: [
    "音声テンポ改善（生成指示/設定/再生側調整）",
    "フロー分岐とデータ収集の安定化",
  ],
  approach: "要件 → 最小PoC → 計測 → 改善 を短いサイクルで回す",
};
