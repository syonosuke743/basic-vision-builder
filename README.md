# サービス名
Idea Template Box

## サービスURL
https://www.idea-template-box.com

## 開発のきっかけ

初めて開発を経験するにあたり、アイデアを生み出す際にすぐに使えるアイデア発想法のテンプレートが欲しいと感じました。FigmaやMiroのようなツールはテンプレートの作成や管理に便利ですが、機能が多すぎて複雑でした。そのため、シンプルにアイデア発想法に特化したツールが必要だと考えるようになりました。

また、インターネットでアイデア発想法を調べると、テンプレートや使い方は紹介されていますが、その場で簡単にテンプレートを作成・編集・保存できるツールは見つかりませんでした。さらに、有料のテンプレート管理サービスは存在するものの、無料で手軽に使えるツールが不足していると感じました。

この課題を解決するため、自分が必要としていたテンプレートの作成・保存・編集・削除ができ、発想法の説明や使い方の例も一体化したシンプルなツールを開発することにしました。

## ユーザーの課題
 
- アイデア発想の際、すぐに使えるテンプレートが手軽に欲しい。  
- 複雑なものではなく、シンプルなものが良い。
- 無料で簡単にアイデア発想テンプレートを管理できる手段が欲しい。

## 機能一覧
  
- ユーザー登録・ログイン機能
- テンプレートの作成
- 履歴画面で編集、閲覧、削除

## ER図
データベースの構造を視覚化したER図を載せます。  
（ここにER図のリンクや画像を挿入してください。）

## インフラ構成図
サービスのインフラ構成を示す図を載せます。  
（ここにインフラ構成図のリンクや画像を挿入してください。）

## 使用技術

- フロントエンド: React, Next.js, NextAuth
- バックエンド: Ruby on Rails,Puma
- データベース: PostgreSQL 
- インフラ: AWS, Vercel
- 環境構築: Docker, Docker-compose
- その他:Git,GitHub

## 工夫した点

- NextAuthによるgoogle認証。
- 他のユーザーが作成したテンプレートにアクセスしようとした場合、サーバー側で X-UID をチェックし、そのユーザーがテンプレートの所有者でない場合はアクセスを拒否する仕組み。
- Unixソケット通信で、NginxとPumaの役割を分離しセキュリティを強化。

## 今後の課題

- 現状Sixhatしか作成できないので、現状サービスとして機能しているとはいえない。少なくとも10種類くらいのテンプレートを作れるようにする。
  
- ローカルストレージにテキストを自動保存して、書き直しが起こらないようにする。
  
- 各テンプレートに簡単な説明のダイアログボックス、作成画面にテンプレートを作成するときの例が見られるダイアログボックスを設置して、ユーザーがテンプレートの使い方について、いちいち調べに行かなくて良いようにする。
  
- テンプレート選択画面において、商品のアイデアに適したテンプレート、アプリのアイデアを考えるのに適したテンプレート、ゲームのアイデアを考えるのに適したテンプレート等を分類する項目を画面に追加して、ユーザーの目的に適した機能を提供できるようにする。
  
- テンプレート選択画面をカードスタイルにして、テンプレートを移動できるようにしたい。
  
- 全体的にスタイルが統一感に欠け、見た目が悪いのでデザインを考え直す。
  
- ヘッダーのテンプレート選択と履歴の遷移のリンクがデフォルトのままなので改善する。また、ヘッダーの画像がずれているので修正する。
 
- 履歴画面の作ったテンプレートの表示がデフォルトのままなので、カードスタイルにして見やすくする。

- 履歴画面で時間順、テンプレートの種類別を管理できるようにする。
 
- データベース設計でユーザーが作った全てのテンプレートに名前を付けられるようにカラムを変更し、名前の記述を必須にする。
 
- google認証だけでなく、他のプラットフォームでもログインできるようにする。
 
- OAuth認証は、メールアドレスをいちいち入力しない方が楽でいいと考えていたが、多くの人が使えるようにメールアドレスでのログインも検討する。