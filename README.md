# 圖片庫

## 設置

`npm install`

### Compiles and hot-reloads for development

`npm run serve`

### Compiles and minifies for prodution

`npm run build`

## 功能

- [x] 可上傳照片，檔案格式 JPG/PNG，上傳後完即可於圖庫中看到縮圖。
- [x] 可上傳影片，檔案格式 MP4，上傳後完即可於圖庫中看到縮圖。
- [ ] 可建立相簿，建立後可於圖庫中看到縮圖。
- [ ] 可將照片及影片加入相簿。
- [x] 預覽圖(縮圖)為原始圖片壓縮過之非透明圖片/影片。
- [x] 一個 floating icon 依日期為最小單位顯示該行照片的檔案日期
- [x] 可點擊縮圖看原始檔案(圖片支援透明圖層)。
- [x] 原始檔案瀏覽可左右滑動切換上下一張圖片。
- [x] 瀏覽狀態下檔案預載前後兩張，左右滑動可見。
- [x] 瀏覽狀態下顯示檔案名稱為檔名前 14 碼，yyyy/mm/dd hh:mm:ss
- [x] 可刪除檔案，刪除後即不見於收藏庫
- [ ] 單次載入最大 50 張圖片，超過的部分於滑動到最後一張(第 50 張)後繼續載入。
- [ ] 使用者操作結果以提示框顯示在右下角
- [ ] 可篩選年/月/日顯示檔案

## 檔案說明

/src  
|- main.js -- 建立 Vue 實例  
|- App.vue -- 這個應用的起始點，使用 Provider 提供 Vuex 的 getter，管理客製 CSS 元素(色票)，引入 main.scss。  
|- router.js -- 透過 URL 控制頁面，如相片/影片/相簿頁面切換

/components -- 邏輯元件，會碰到後端的元件  
|- FileList.vue -- 向 store 取檔案清單，並加入對應的 File-Case  
|- FileCase.vue -- 產生 image 或 video 標籤，無 source prop 的話則連結原始檔案  
|- UploadBtn.vue -- 向 store 進行檔案上傳  
|- DeletionBtn.vue -- 向 store 要求刪除檔案  
|- /mixin -- 常用物件與方法元件

/store -- 資料管理元件  
|- index.js -- 載入(vuex)模組  
|- files.js -- 負責 api 資料存取功能管理  
|- status.js -- 負責 app 狀態管理

/styles -- css/scss 檔案  
|- \_list.scss -- OOCSS 元素製造器  
|- basics.css -- 常用 OOCSS 元素  
|- main.scss -- 傳出\_list.scss

/views -- 畫面元件，不會碰到後端的元件  
|- FilePages.vue -- router-view 的插入點，呈現 PhotoList/VideoList  
|- FooterBar.vue -- 應用的底部功能列容器  
|- HeaderBar.vue -- 應用的頂部功能列容器  
|- PageSwitch.vue -- 切換頁面功能，使用 router-link  
|- FileScene.vue -- 點擊圖片展開後的頁面  
|- DelectionScene -- 在 Scene: deletion 使用的遮罩  
|- SelectionAgent -- 在 Mode: seletion 使用的底部列
