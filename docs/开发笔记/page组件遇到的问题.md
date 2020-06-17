# page组件遇到的问题

## 返回的页面数问题
当页面过于长的时候，可以这样显示。
1. 页面数小于等于6，就默认遍历1-6
2. 页面数大于6时，如果当前页小于2或者大于总页数-2：返回数组为[1,2,3,……,page-1,page]
3. 页面数大于6时，如果当前页为中间值：返回数组为[……,current-1,current,current+1,……]
```js
       // 页数小于6，显示页数
            if (pageNumber <= 6) {
                return pageNumber
            } else {
                if (this.currentPage <= 2 || this.currentPage >= pageNumber - 2) {
                    return [1, 2, 3, '…', pageNumber - 2, pageNumber - 1, pageNumber]
                } else {
                    return ['…', this.currentPage - 1, this.currentPage, this.currentPage + 1, '…']
                }
            }
```

## 向上取整
```js
Math.ceil()
```