# 婚禮籌備助手（GitHub Pages 版）

## 檔案說明
| 檔案 | 用途 |
|---|---|
| index.html | 主程式 |
| sw.js | 離線快取（讓沒網路時也能開） |
| manifest.webmanifest、icon-*.png、apple-touch-icon.png | 加到手機主畫面用的圖示與名稱 |
| data.json | 婚禮資料，由 App 產生後上傳（一開始沒有） |

## 第一次上架
1. 到 github.com 註冊並登入。
2. 右上角「＋」→「New repository」，名稱取不好猜的英文，例如 `lg-0328-helper`，選 **Public**，按「Create repository」。
3. 在新的 repository 頁面點「uploading an existing file」，把這個資料夾裡的所有檔案拖進去，按「Commit changes」。
4. 到「Settings」→ 左邊選「Pages」→ Branch 選 `main`、資料夾選 `/ (root)` → Save。
5. 等 1～2 分鐘，網址會是 `https://你的帳號.github.io/lg-0328-helper/`。

## 更新資料（每次改完都要做）
1. 用手機打開上面的網址，在 App 裡修改資料（會存在你的手機）。
2. 「同步」頁 →「⬆️ 產生 data.json」→ 設定密碼 → 下載。
3. 回到 GitHub repository →「Add file」→「Upload files」→ 上傳 data.json（會取代舊檔）→ Commit。
4. 約 1～10 分鐘後，工作人員打開網址就會自動更新成新資料。

> 注意：工作人員自己在手機上勾選或修改的內容，會在你發佈新版 data.json 時被覆蓋。

## 給工作人員的說明
1. **婚禮前一天，在有網路時打開網址一次**，輸入新人給的密碼。
2. 建議加到主畫面：
   - Android Chrome：右上「⋮」→「加到主畫面」
   - iPhone Safari：下方「分享」→「加入主畫面」
3. 當天沒訊號也能打開，畫面上方會顯示「目前沒有網路」和資料更新時間。

## 隱私
GitHub 免費版的網站任何人都能打開。賓客名單和電話放在 data.json 裡，**請在產生 data.json 時一定要設定密碼**，這樣即使有人拿到檔案也只會看到亂碼。

## 改了 index.html 之後
打開 sw.js，把第一行附近的 `wedding-helper-v1` 改成 `v2`（之後每次改都 +1），大家的手機才會換成新版程式。
