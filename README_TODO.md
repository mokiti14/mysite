# ToDoリストアプリケーション

シンプルで使いやすいToDoリストアプリケーションです。

## 機能

- ✅ タスクの追加・削除
- ✅ タスクの完了/未完了の切り替え
- ✅ フィルター機能（すべて/未完了/完了済み）
- ✅ タスクの永続化（localStorage使用）
- ✅ レスポンシブデザイン
- ✅ 作成日時の表示

## 使い方

1. `todo.html` をブラウザで開きます
2. 入力欄にタスクを入力して「追加」ボタンをクリック
3. チェックボックスでタスクの完了/未完了を切り替え
4. 「削除」ボタンでタスクを削除
5. フィルターボタンでタスクの表示を切り替え

## デスクトップショートカットの作成方法

### Windows

1. `todo.html` ファイルを右クリック
2. 「送る」→「デスクトップ（ショートカットを作成）」を選択

または

1. デスクトップ上で右クリック
2. 「新規作成」→「ショートカット」を選択
3. 項目の場所に `todo.html` のフルパスを入力
   例: `C:\Users\YourName\mysite\todo.html`
4. 「次へ」をクリックし、名前を「ToDoリスト」などに設定
5. 「完了」をクリック

### macOS

1. Finderで `todo.html` ファイルを見つける
2. ファイルをデスクトップにドラッグしながら、`Command` + `Option` キーを押したままにする
3. エイリアスが作成されます

または

1. `todo.html` ファイルを右クリック
2. 「エイリアスを作成」を選択
3. 作成されたエイリアスをデスクトップに移動

### Linux

1. デスクトップ上で右クリック
2. 「新しいランチャーを作成」または「Create Launcher」を選択
3. 以下のように設定:
   - 名前: ToDoリスト
   - コマンド: `xdg-open /path/to/todo.html`
   - アイコン: お好みのアイコンを選択

または

1. `.desktop` ファイルを作成:
```bash
cat > ~/Desktop/todo.desktop << EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=ToDoリスト
Comment=ToDoリストアプリ
Exec=xdg-open /home/runner/work/mysite/mysite/todo.html
Icon=emblem-documents
Terminal=false
Categories=Utility;
EOF
chmod +x ~/Desktop/todo.desktop
```

## ファイル構成

```
mysite/
├── todo.html       # メインHTMLファイル
├── todo.css        # スタイルシート
├── todo.js         # JavaScript機能
└── README_TODO.md  # このファイル
```

## 技術スタック

- HTML5
- CSS3（グラデーション、アニメーション）
- Vanilla JavaScript
- localStorage API

## ブラウザ対応

- Chrome/Edge (推奨)
- Firefox
- Safari
- Opera

## ライセンス

このプロジェクトはオープンソースです。
