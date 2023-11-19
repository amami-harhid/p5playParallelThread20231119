# p5playParallelThread20231119
p5play Sprite にて Scratch3 風に 繰り返し処理を書きたい！を目指すものです

## 要点

Javascript で次のようなコードを書くと ブラウザーが固まってしまします。

```
const _f = (_count)=>{
  for(;;) {
    // p5.play のプロパティ操作などのコードを書く。
    // 例えば x,y 座標をインクリメントするとか。
  }
}
_f();
```

これを p5.play で実現するならば次のようにするのが p5的な推奨です。

```: スプライトコード
draw() {
  // p5.play のプロパティ操作などのコードを書く。
  // 例えば x,y 座標をインクリメントするとか。
}

```

## 寂しさ
p5的な推奨のやり方では、for(;;) や while(true) を書かないので、僕は無限ループだよ！と主張できないのが寂しいです。

## ややこしさ
無限ループだけならいいですが、ループの中に入れ子で 回数分の繰り返し、条件分岐を入れる、入れ子の入れ子などを p5 推奨風に実現するのは、実装がややこしくなってしまいます。

## Scratch3 みたいにコードを書きたい
比べることに無理があるのは承知の上ですが、Scratch3 では わかりやすく Loop をかけます。
Scratch3では、ここは 永久フープだ！、そのなかで条件分岐コードがあって、その下に 回数繰り返し処理があって・・とコードが見やすいのです。

## そこで

p5.play のスプライトの中で、こんな風にコードを書きたい！　

### 永久ループ 
```
control.LoopForEver(async _=> {

});
```
### 指定した回数分の繰り返し

```
// 10回の繰り返し
control.LoopRepeat(10, async _=> {

});
```
### 入れ子の組み合わせも大丈夫

繰り返し処理の中が見通しがよくなるので コードを書きやすい！が狙いです。

```
let _counter = 0;
control.LoopForEver(async _=> {  // <--- for(;;) を意味する行
  this.x += 5; // スプライトのx座標を +5 する
  _counter += 1;
  if (_counter == 100) {
    this.x = 0;
  }
  // 10回の繰り返し
  await control.LoopRepeat(10, async _=> { // <--- for(let i=0; i<10; i++) を意味する行
    this.y += 10;
    // 30回の繰り返し
    await control.LoopRepeat(30, async _=> { // <--- for(let i=0; i<30; i++) を意味する行
      this.rotation += 10;
    });  
  });
});
```

## お詫び

まだトライアル版なので、LoopForEver と LoopRepeat の２種類しか用意していません。
今後追加しますが、ひとまず レポジトリを作ったものです。

## 使い方
これを スクリプトタグに追加
```
<script src="https://amami-harhid.github.io/p5playParallelThread20231119/js/ParallelThreadSupport.js"></script>
```

利用方法は、js/Pico.js をみてね。
