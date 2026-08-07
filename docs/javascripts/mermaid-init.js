// Material 內建的 Mermaid 自動偵測在這個版本沒有觸發渲染，改成明確自己呼叫初始化。
//
// 三個坑：
// 1. 不能用 mermaid.init() 直接處理 DOM 節點：pymdownx.superfences 產生的結構是
//    <pre class="mermaid"><code>...</code></pre>（巢狀 code 標籤），mermaid.init()
//    處理這種巢狀結構時會讓實際餵給解析器的文字跑掉。改成自己讀 textContent 再呼叫 render()。
// 2. 一個頁面有多張圖表時，不能同步（forEach）連續呼叫 render()：v9 的 render() 內部用共用的
//    暫存 DOM 做量測，沒等上一張真的渲染完（callback 觸發）就呼叫下一張，會互相干擾。
//    改成一張一張依序等待。
// 3. 最關鍵的一個：程式碼區塊的 class 故意不叫 "mermaid"，改叫 "mermaid-src"。
//    Mermaid.js 本身在 script 載入時會自動掃描 class="mermaid" 的節點並搶先用它自己那段
//    有問題的邏輯處理過一次（把節點內容弄壞、標記為已處理），比我們這支腳本的
//    DOMContentLoaded handler還早執行，導致我們接手時已經來不及。用不同 class 名稱，
//    讓 Mermaid 的自動掃描完全找不到這些節點，只由我們自己的邏輯處理。
document.addEventListener("DOMContentLoaded", function () {
  if (!window.mermaid) return;
  var isDark = document.body.getAttribute("data-md-color-scheme") === "slate";
  window.mermaid.initialize({ startOnLoad: false, theme: isDark ? "dark" : "default" });

  var nodes = Array.prototype.slice.call(document.querySelectorAll(".mermaid-src"));
  var i = 0;
  function renderNext() {
    if (i >= nodes.length) return;
    var node = nodes[i];
    var source = node.textContent;
    var id = "classcord-mermaid-" + i;
    i += 1;
    window.mermaid.render(id, source, function (svgCode) {
      node.innerHTML = svgCode;
      node.className = "mermaid-rendered";
      renderNext();
    });
  }
  renderNext();
});
