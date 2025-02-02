"use client";
import { useState } from "react";

// お題リスト
const words = [
  { japanese: "みかん", variations: ["mikan"] },
  { japanese: "りんご", variations: ["ringo", "rinngo"] },
  { japanese: "いちご", variations: ["ichigo", "itigo"] },
  { japanese: "パイナップル", variations: ["painappuru", "painaltupuru"] },
  { japanese: "オレンジ", variations: ["orenji", "orennji", "orenzi", "orennzi"] },
  { japanese: "グレープフルーツ", variations: ["gure-puhuru-tsu", "gure-pufuru-tsu", "gure-puhuru-tu", "gure-pufuru-tu"] },
  { japanese: "さくらんぼ", variations: ["sakuranbo", "sakurannbo", "saquranbo", "saqurannbo"] },
  { japanese: "フルーツ全種類盛り合わせ", variations: ["huru-tsuzennsyuruimoriawase", "huru-tuzennsyuruimoriawase", "huru-tsuzensyuruimoriawase", "huru-tsuzennsilyuruimoriawase", "furu-tsuzennsyuruimoriawase", "furu-tuzennsyuruimoriawase", "furu-tsuzensyuruimoriawase", "furu-tsuzennsilyuruimoriawase", "furu-tuzensyuruimoriawase", "huru-tuzensyuruimoriawase"] },
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [currentVariation, setCurrentVariation] = useState(words[index].variations[0]);

  const currentWord = words[index];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newInput = e.target.value;

    // 全角文字を除外し、半角英数字のみにする
    newInput = newInput.replace(/[^\x00-\x7F]/g, "");

    setInput(newInput);

    // variations の中で、入力が一致するものがあれば切り替える
    const matchingVariation = currentWord.variations.find((variation) =>
      variation.startsWith(newInput) // 入力が一致するか確認
    );

    // 入力が異なる表記を含んでいたら、切り替える
    if (matchingVariation && matchingVariation !== currentVariation) {
      setCurrentVariation(matchingVariation); // 表記を切り替える
    }

    // 正しい表記が入力されたら次のお題に進む
    if (currentWord.variations.includes(newInput)) {
      setIndex((prev) => (prev + 1) % words.length); // 次のお題へ
      setInput(""); // 入力リセット
      setCurrentVariation(words[(index + 1) % words.length].variations[0]); // 次のお題の初期アルファベット表記に設定
    }
  };

  // 新しいお題を開始したときに初期化する処理
  const resetGame = () => {
    setCurrentVariation(currentWord.variations[0]); // 初期状態のローマ字表記にリセット
    setInput(""); // 入力リセット
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>タイピングゲーム</h1>
      <h2>{currentWord.japanese}</h2>
      <h3>{currentVariation}</h3> {/* 現在のローマ字表記を表示 */}
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onFocus={resetGame} // フォーカス時にゲームをリセット
        autoFocus
      />
    </div>
  );
}
