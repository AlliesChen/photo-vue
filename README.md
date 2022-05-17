# 圖片庫

## 功能

圖庫部分：

- [x] 可上傳照片，檔案格式 JPG/PNG，上傳後完即可於圖庫中看到縮圖。
- [x] 預覽圖(縮圖)為原始圖片壓縮過之非透明圖片。
- [ ] 一個 floating icon 依日期為最小單位顯示該行照片的檔案日期
- [ ] 可點擊縮圖看原始圖檔(支援透明圖層)。
- [ ] 原始圖檔瀏覽可左右滑動切換上下一張圖片。
- [ ] 瀏覽狀態下圖片預載前後兩張，左右滑動可見。
- [ ] 瀏覽狀態下顯示檔案名稱為檔名前 14 碼，yyyy/mm/dd hh:mm:ss
- [ ] 可刪除圖片，刪除後即不見於圖庫
- [ ] 單次載入最大 50 張圖片，超過的部分於滑動到最後一張(第 50 張)後繼續載入。

## 檔案說明

/src  
|- main.js -- 建立 Vue 實例  
|- App.vue -- 這個應用的起始點，管理客製 CSS 元素(色票)，引入 main.scss。  
|- router.js -- 相片/影片/相簿頁面切換

/components -- 邏輯元件，會碰到後端的元件  
|- PhotoList.vue -- 向 store 取相片清單，並做出縮圖  
|- VideoList.vue -- 向 store 取影片清單  
|- UploadBtn.vue -- 向 store 進行檔案上傳

/store -- 資料管理元件  
|- index.js -- (vuex)負責 api 資料存取功能管理

/styles -- css/scss 檔案  
|- \_list.scss -- OOCSS 元素製造器  
|- basics.css -- 常用 OOCSS 元素  
|- main.scss -- 傳出\_list.scss

/views -- 畫面元件，不會碰到後端的元件  
|- FilePages.vue -- router-view 的插入點，呈現 PhotoList/VideoList  
|- FooterBar.vue -- 應用的底部功能列容器  
|- HeaderBar.vue -- 應用的頂部功能列容器  
|- PageSwitch.vue -- 切換頁面功能，使用 router-link

## 運作模式

// TODO

vuex

vue-router

scss
