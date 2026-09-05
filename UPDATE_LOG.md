# OIL DASHBOARD 專案更新與維運紀錄 (Update & Operation Log)

**紀錄日期**: 2026-09-06  
**專案名稱**: `oil-dashboard-next`  
**主要範疇**: 伺服器背景常駐（Daemon Process）配置、PM2 守護進程建置、雙模式（正式/開發）運作機制與操作指引

---

## 1. 📋 需求背景與目標

* **痛點**：先前以 `npm run dev` 或 `npm run start` 啟動時，會佔用一個互動式終端機（CLI）進程；一旦關閉終端視窗、SSH 連線中斷或觸發訊號，服務便會隨之中斷。
* **目標**：
  1. 將 Next.js 服務以守護進程（Daemon）方式常駐於背景，釋放 CLI 進程。
  2. 同時支援 **正式模式（Production，預設推薦）** 與 **開發模式（Development，支援 Hot Reload）**。
  3. 提供乾淨直覺的指令介面，方便隨時檢視狀態、查詢 Log、重啟與停止。

---

## 2. 🛠️ 執行動作與變更清單

### 2.1 安裝進程守護引擎（PM2）
* 系統環境安裝 `pm2` 全域守護引擎，並同步寫入專案 `devDependencies`（`package.json`）：
  ```bash
  npm install --save-dev pm2
  ```

### 2.2 建立 PM2 多環境組態檔：`ecosystem.config.cjs`
在專案根目錄新增 [`ecosystem.config.cjs`](./ecosystem.config.cjs)，針對兩種模式分別定義配置：
* **`oil-dashboard`（正式環境，預設）**：
  * 執行入口：`node_modules/next/dist/bin/next start -p 5000`
  * 特性：經 `npm run build` 優化編譯，佔用記憶體小（約 50MB~160MB）、回應速度最快、穩定度最高。
  * 設有 `max_memory_restart: "1G"` 自動保護機制。
* **`oil-dashboard-dev`（開發環境）**：
  * 執行入口：`node_modules/next/dist/bin/next dev -p 5000`
  * 特性：具備熱重載（Hot Reload），修改程式碼無需重啟即可即時反映。

### 2.3 擴充 `package.json` 快捷指令
在 [`package.json`](./package.json) 中整合 `bg:*` 系列 NPM 指令，無需記憶冗長的 PM2 參數：
```json
"scripts": {
  "dev": "next dev -p 5000",
  "build": "next build",
  "start": "next start -p 5000",
  "lint": "eslint",
  "bg:start": "npm run build && pm2 start ecosystem.config.cjs --only oil-dashboard",
  "bg:dev": "pm2 start ecosystem.config.cjs --only oil-dashboard-dev",
  "bg:stop": "pm2 stop oil-dashboard oil-dashboard-dev",
  "bg:restart": "pm2 restart oil-dashboard",
  "bg:logs": "pm2 logs oil-dashboard",
  "bg:status": "pm2 status"
}
```

---

## 3. 📖 操作與使用教學 (How to Use)

### 3.1 常用 NPM 快捷指令（推薦）

| 操作目標 | 指令 | 說明 |
| :--- | :--- | :--- |
| **背景啟動（正式模式）** | `npm run bg:start` | 自動執行 `next build` 並在背景啟動正式版（監聽 Port 5000） |
| **背景啟動（開發模式）** | `npm run bg:dev` | 在背景啟動開發版（監聽 Port 5000，支援即時熱重載） |
| **檢視運作狀態** | `npm run bg:status` | 檢視進程狀態（Online/Stopped）、CPU 與記憶體佔用率 |
| **檢視即時日誌 (Logs)** | `npm run bg:logs` | 即時監聽輸出 Log（按 `Ctrl + C` 離開，**不影響背景服務**） |
| **重新啟動服務** | `npm run bg:restart` | 零等待重啟正式模式進程 |
| **停止背景服務** | `npm run bg:stop` | 停止所有 oil-dashboard 背景進程 |

> [!TIP]
> 執行 `npm run bg:logs` 時，終端機只會進入串流查看模式，隨時按下鍵盤 `Ctrl + C` 即可回到 CLI，背景伺服器依然持續正常運作。

---

### 3.2 進階 PM2 原生指令

若習慣直接使用 `pm2` 指令，亦可執行：

```bash
# 1. 檢視目前所有 PM2 進程清單
pm2 status
# 或
pm2 list

# 2. 查看特定進程最近 50 行日誌且不持續監聽
pm2 logs oil-dashboard --lines 50 --nostream

# 3. 重新載入最新狀態與環境變數
pm2 restart oil-dashboard --update-env

# 4. 儲存目前 PM2 運行清單（避免系統重開機後遺失）
pm2 save

# 5. 若需徹底自清單中移除進程
pm2 delete oil-dashboard
```

---

## 4. 🔍 驗證與健康檢查紀錄

* **服務網址**：`http://localhost:5000`
* **區域網路網址**：`http://192.168.10.2:5000`
* **HTTP 狀態驗證**：
  ```bash
  curl -I http://localhost:5000
  ```
  ```http
  HTTP/1.1 200 OK
  X-Powered-By: Next.js
  Cache-Control: s-maxage=31536000
  Content-Type: text/html; charset=utf-8
  Connection: keep-alive
  ```
* **目前運作狀態**：
  * 進程名稱：`oil-dashboard`
  * 進程 ID：`0`
  * 狀態：`online`
  * CPU 負載：`0%`
  * 記憶體佔用：約 `162 MB`
  * PM2 持久化清單：已執行 `pm2 save` 寫入 `~/.pm2/dump.pm2`

---

## 5. 🪙 虛擬貨幣交易所 WTI 原油商品整合 (Crypto Exchange WTI Integration)

### 5.1 整合標的與數據源
已成功將主流加密貨幣交易所之 WTI 原油永續合約/期權整合至報價與圖表系統中：
* **幣安 Binance Futures - `CLUSDT`**：
  * 商品名稱：`幣安 WTI 原油永續 (Binance)`
  * 資料來源：`https://fapi.binance.com/fapi/v1/ticker/24hr?symbol=CLUSDT`
  * 資金費率：`https://fapi.binance.com/fapi/v1/premiumIndex?symbol=CLUSDT`（即時顯示當前 8 小時資金費率）
  * 單位：`USDT/桶`
* **OKX - `CL-USDT-SWAP` (`OKX:CL`)**：
  * 商品名稱：`OKX WTI 原油合約 (CL-USDT)`
  * 資料來源：`https://www.okx.com/api/v5/market/ticker?instId=CL-USDT-SWAP`
  * 單位：`USDT/桶`

### 5.2 跨市場基差與套利 (Basis Spread)
* **加密基差（Binance CLUSDT vs NYMEX CL）**：
  * 監控加密貨幣衍生品相對於傳統芝加哥商品交易所（CME/NYMEX）實物交割期貨之即時升貼水（溢價/折價幅度），作為資金費率套利與流動性強弱的核心指標。

### 5.3 介面與圖表連動
* **TradingView 即時 K 線圖**：點選 `CLUSDT` 或上方 `BINANCE WTI` 按鈕，即刻切換為 `BINANCE:CLUSDT.P` 官方行情串流。
* **風控與倉位試算器 (TraderWorkstation)**：合約模式新增「加密永續 (Binance CLUSDT 1桶)」，支援 1 桶/手之保證金、止盈止損與盈虧比試算。

---

## 6. 🐙 GitHub 版本控制與遠端同步 (GitHub Repository)

* **遠端版本庫**：`https://github.com/hi66724389/oil-dashboard-next`
* **可見性**：公開 (Public)
* **預設分支**：`main`
* **同步狀態**：已建立遠端 origin 並完成首發全量推送（Initial Push）。


