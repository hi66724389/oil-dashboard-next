# Oil Dashboard Next

這是一個基於 [Next.js](https://nextjs.org) (v16) 與 React (v19) 的石油數據分析儀表板專案。
預設服務連接埠為 **`5000`**。

---

## 🚀 快速開始 (Getting Started)

### 1. 前景直接運行 (標準終端機模式)

```bash
# 開發模式（Port 5000，佔用終端機）
npm run dev

# 或編譯並啟動正式模式（Port 5000，佔用終端機）
npm run build
npm run start
```

打開瀏覽器造訪 [http://localhost:5000](http://localhost:5000)。

---

## 🛡️ 背景守護模式 (Background Daemon Mode)

本專案已整合 **PM2** 進程守護，支援在不佔用 CLI / 終端機的情況下於背景常駐運行：

| 指令 | 說明 |
| :--- | :--- |
| `npm run bg:start` | **背景啟動（正式版，推薦）**：自動編譯並於背景常駐 |
| `npm run bg:dev` | **背景啟動（開發版）**：於背景常駐且支援熱重載（Hot Reload） |
| `npm run bg:status` | 檢視目前背景進程狀態與資源佔用 |
| `npm run bg:logs` | 檢視即時日誌（按 `Ctrl + C` 退出，不影響背景運作） |
| `npm run bg:restart` | 重新啟動背景服務 |
| `npm run bg:stop` | 停止背景服務 |

詳細配置與維護紀錄請參閱 [UPDATE_LOG.md](./UPDATE_LOG.md)。

---

## 📁 相關設定檔

* [ecosystem.config.cjs](./ecosystem.config.cjs)：PM2 背景守護進程組態設定
* [UPDATE_LOG.md](./UPDATE_LOG.md)：專案更新與維運紀錄日誌
