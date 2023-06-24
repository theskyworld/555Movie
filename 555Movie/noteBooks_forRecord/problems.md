### 在当前 store 中无法获取到另一个 store 中更新后的数据
#### 问题展示
```js
//当前store中使用其它store中的数据
import useSearchStore from "./useSearch";
import { defineStore, storeToRefs } from "pinia";
import { ref, reactive } from "vue";

const initialInfos = storeToRefs(useSearchStore());
const rawsearchResultPerPageNum =
  initialInfos.value?.length >= 15 ? 15 : initialInfos.value?.length;
const searchResultPerPageNum = ref(rawsearchResultPerPageNum);
```

```js
    const uniqueInfos = ref([]);

    //其它store中无法获取到更新后的数据
    getInfos: async function (keyWord) {
      const res = await getService({
        wd: keyWord,
      });
      const infos = res.info;

      this.initialInfos = infos;

      return infos;
    },
```
#### 问题解决

#### 引用链接
