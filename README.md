選択した文字列をワンクリックでGoogleSpreadSheetへ登録する雑な作りのChrome拡張。英単語学習などに利用。  

# Usage
1. GoogleSpreadSheetへ登録可能なcredentialを取得
1. `src/js/credentials.sample.json` を参考に、`src/js/credentials.json` としてcredentialを配置。
1. `yarn build`
1. Chromeからbuildディレクトリを拡張機能として読み込む。
1. `Cmd + R` で単語がスプレッドシートに登録される。
