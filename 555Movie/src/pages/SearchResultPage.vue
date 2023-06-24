<template>
  <div class="searchResultPageContainer">
    <div class="header">
      <span>
        搜索
        <span>"{{ searchValue }}"</span>
        ,找到
        <span>{{ uniqueInfos.length }}</span>
        部影片
      </span>
    </div>
    <div class="listCard">
      <ul>
        <li v-for="i in curPageNum">
          <ListCard
            :url="urls[i - 1 + perPageStartIndex]"
            :pic="pics[i - 1 + perPageStartIndex]"
            :title="titles[i - 1 + perPageStartIndex]"
            @click="playVideo(i - 1 + perPageStartIndex)"
          ></ListCard>
        </li>
      </ul>
    </div>
    <div class="pagination">
      <el-pagination
        background
        :hide-on-single-page="true"
        @prev-click="toPrevPage()"
        @next-click="toNextPage()"
        @current-change="getCurrentPage"
        layout="prev, pager, next"
        :page-count="allPages"
      />
    </div>
  </div>
</template>
<script setup>
import ListCard from "../components/ListCard.vue";
import { ElPagination } from "element-plus";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import useMainStore from "../store";
import { storeToRefs } from "pinia";
import router from "../router";

const mainStore = useMainStore();
let {
  searchValue,
  searchRes,
  curPageStartIndex,
  uniqueInfos,
  urlsRes,
  picsRes,
  titlesRes,
  perPageNum,
} = storeToRefs(mainStore);
const { getDetails, setSearchRes } = mainStore;
let { urls, pics, titles } = searchRes.value;

// 设置当前页中展示的卡片数量
// 期望每页中展示的数量为perPageNum = ref(10);
// 如果当前页为第一页：如果要展示的卡片总数量（uniqueInfos.length）> perPageNum，则当前页展示perPageNum条
//                    如果要展示的卡片数量 <= perPageNum，则当前页展示uniqueInfos.length条
// 如果当前页为任意中间页：直接总共展示perPageNum条
// 如果当前页为最后一页：直接展示剩余的要展示的数量

const rawcurPageNum =
  uniqueInfos.value.length <= perPageNum.value
    ? uniqueInfos.value.length
    : perPageNum.value;
const curPageNum = ref(rawcurPageNum);
// 总的页码值
const allPages = Math.ceil(uniqueInfos.value.length / perPageNum.value);
// 每页展示卡片的开始索引值
const perPageStartIndex = ref(0);

// 点击上一页或者下一页导致当前页码变化
// 上一页
function toPrevPage() {
  // 更新当前页展示的卡片数量
  curPageNum.value = perPageNum.value;
  // 更新当前页卡片开始的索引值
  perPageStartIndex.value -= perPageNum.value;
}

// 下一页
function toNextPage() {
  // 更新当前页卡片开始的索引值
  perPageStartIndex.value += perPageNum.value;

  // 继续当前页的数据请求
  uniqueInfos.value.forEach(async (info, index) => {
    if (
      index >= perPageStartIndex.value &&
      index < perPageStartIndex.value + curPageNum.value
    ) {
      const res = await getDetails(info);

      const { url, pic, title } = res;
      urlsRes.value.push(url);
      picsRes.value.push(pic);
      titlesRes.value.push(title);
    }
  });
  // 存储获取到的结果值
  setSearchRes(urlsRes.value, picsRes.value, titlesRes.value);
  searchRes = storeToRefs(mainStore).searchRes;
  urls = searchRes.value.urls;
  pics = searchRes.value.pics;
  titles = searchRes.value.titles;
}

// 点击页码导致当前页码变化
// 获取当前页的页码
function getCurrentPage(val) {
  // val的值为当前页码的值
  // 如果当前页码的值等于总的页码值，则表示为最后一页
  // 更新curPageNum的值
  if (val === allPages) {
    curPageNum.value = uniqueInfos.value.length % perPageNum.value;
  }
}

// TODO 实现点击页码时导致页码的变化以及导致跳转到指定的页码

// 点击卡片跳转到播放页面，播放相应的视频
function playVideo(index) {
  // console.log(index);
  // 跳转到视频播放页面
  router.push({
    name: "videoplay",
    params: {
      index,
    },
  });
}
</script>
<style scoped>
.searchResultPageContainer {
  position: relative;
  top: -100px;
  left: 30px;
  width: 100%;
}
.header {
  width: 100%;
  font-size: 1.1em;
  color: var(--color--light--);
}
.header span span {
  color: var(--hover--color--);
}
.header::after {
  content: "";
  display: block;
  position: relative;
  top: 15px;
  width: 100%;
  border: solid 1px var(--seperate--line--);
}

.listCard ul {
  position: relative;
  left: -45px;
  top: 15px;
}

.listCard li {
  display: inline-block;
  margin: 5px;
}

:deep(.el-pagination.is-background .btn-prev),
:deep(.el-pagination.is-background .btn-next),
:deep(.el-pagination.is-background .el-pager li) {
  background-color: var(--bg--pagination--);
  color: var(--color--light--);
}

:deep(.el-pagination.is-background .el-pager li.is-active),
:deep(.el-pagination.is-background .btn-prev.is-active),
:deep(.el-pagination.is-background .btn-next.is-active) {
  background-color: transparent;
  color: var(--active--color--);
}

:deep(.el-pagination.is-background .btn-prev:hover),
:deep(.el-pagination.is-background .btn-next:hover),
:deep(.el-pagination.is-background .el-pager li:hover) {
  color: var(--hover--color--);
}

:deep(.el-pagination.is-background .btn-prev:disabled),
:deep(.el-pagination.is-background .btn-next:disabled) {
  background-color: transparent;
}
</style>
