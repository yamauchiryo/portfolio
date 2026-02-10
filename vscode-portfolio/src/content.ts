export type FileId = "README.md" | "projects.md" | "research.md" | "intern.md";

export const FILES: { id: FileId; label: string; group: "root" }[] = [
  { id: "README.md", label: "README.md", group: "root" },
  { id: "projects.md", label: "projects.md", group: "root" },
  { id: "research.md", label: "research.md", group: "root" },
  { id: "intern.md", label: "intern.md", group: "root" },
];

export const PROFILE = {
  name: "山内 瞭",
  title: "立命館大学院　情報理工学研究科　1回生",
  location: "Shiga, Japan",
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
  approach: [
    "本研究では，SharedPlans理論で定義された枠組みに基づき，クロスドメインQAを複数の専門知識エージェントによる共同作業として定式化する。",
    "SharedPlansにおける α（トップレベル行為） を質問への最終回答生成として定義し，その達成に必要な推論過程を Recipe として段階的に外在化する。",
    "推論途中で得られる事実や根拠は Context として共有・更新され，人物・地理・歴史など異なる知識ドメイン間の情報が明示的に接続される。",
    "各専門エージェントは，自身が担当可能な推論を Intentions として表明し，合意 → 修正 → 実行 の協調プロトコルを通じて，誤りに強い推論過程を実現する。",
  ],
};

export const INTERN = {
  title: "長期インターン",
  company: "Markdoor",
  link: "https://markdoor.net",
  description:
    "フルスタック開発を担当しつつ、実際の商談やヒアリングに同席し、先方の課題を整理した上で解決策となるシステムを提案しています。要件整理から提案、実装、検証までを一貫して担当し、事業側との連携を意識した開発を行っています。",
  flow: ["要件整理", "提案・設計", "実装", "検証・改善"],
achievements: [
  {
    title: "AIコールセンターのプロトタイプ開発",
    desc: "音声対話AIを用いた予約受付コールセンターのプロトタイプを設計・実装。通話フローを状態遷移として整理し、スロット設計・確認分岐・復唱ロジックまで構築しました。応答テンポや確認質問の粒度を調整し、AI単体では完結しない運用前提も踏まえた実運用志向の設計を行いました。",
    icon: "🎧",
  },
  {
    title: "RAGを使用した社内チャットボットの構築",
    desc: "社内ドキュメント構造に基づいてチャンク設計と検索戦略を設計し、根拠提示を前提としたRAG型チャットボットを実装。検索精度の検証と改善を繰り返し、曖昧な質問に対しても再検索や補足質問で対応できるよう応答制御を工夫しました。",
    icon: "💬",
  },
  {
    title: "社内営業基幹システムの設計・構想",
    desc: "営業情報を蓄積するデータベース基盤を設計し、案件・商談データを一元管理する社内基幹システムを構想。自然文による質問に対してAIがSQLを生成し、営業成績や進捗をグラフで可視化する仕組みを想定し、将来的な戦略提案まで見据えた設計を行いました。",
    icon: "📊",
  },
  {
    title: "不動産価格を査定するスクレイピングシステムの開発",
    desc: "複数のマンション情報サイトをスクレイピングして物件データを統合・正規化し、緯度経度を付与。外部APIと連携して土地情報を付加することで、マンションごとの不動産価値を可視化するシステムを構築しました。",
    icon: "🏠",
  },
],

};
