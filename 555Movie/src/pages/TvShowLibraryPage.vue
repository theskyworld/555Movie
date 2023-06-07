<template>
  <div class="tvShowLibraryPageContainer">
    <div class="header">
      <div class="tvShowFilter">
        <div v-for="section in filterItems" v-key="section.title">
          <div class="title">
            <span>{{ section.title }}</span>
          </div>
          <div>
            <ul>
              <li
                class="items"
                v-for="item in section.content"
                v-key="item.key"
              >
                <span>{{ item.title }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="listCards">
        <ul>
          <li v-for="card in cardsNumPerPage">
            <ListCard></ListCard>
          </li>
        </ul>
      </div>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
    </div>
  </div>
</template>
<script setup>
import ListCard from "../components/ListCard.vue";
import { ref, reactive } from "vue";
import { ElPagination } from "element-plus";
const cardsNumPerPage = ref(30);

const thisYear = new Date().getFullYear();

const filterItems = reactive({
  byStory: {
    title: "剧情",
    content: [
      {
        key: "1",
        title: "全部",
      },
      {
        key: "2",
        title: "YouTube",
      },
      {
        key: "3",
        title: "脱口秀",
      },
      {
        key: "4",
        title: "真人秀",
      },
      {
        key: "5",
        title: "选秀",
      },
      {
        key: "6",
        title: "八卦",
      },
      {
        key: "7",
        title: "访谈",
      },
      {
        key: "8",
        title: "情感",
      },
      {
        key: "9",
        title: "生活",
      },
      {
        key: "10",
        title: "晚会",
      },
      {
        key: "11",
        title: "搞笑",
      },
      {
        key: "12",
        title: "音乐",
      },
      {
        key: "13",
        title: "时尚",
      },
      {
        key: "14",
        title: "游戏",
      },
      {
        key: "15",
        title: "少儿",
      },
      {
        key: "16",
        title: "体育",
      },
      {
        key: "17",
        title: "纪实",
      },
      {
        key: "18",
        title: "科教",
      },
      {
        key: "19",
        title: "曲艺",
      },
      {
        key: "20",
        title: "歌舞",
      },
    ],
  },
  byArea: {
    title: "地区",
    content: [
      {
        key: "1",
        title: "全部",
      },
      {
        key: "2",
        title: "大陆",
      },
      {
        key: "3",
        title: "香港",
      },
      {
        key: "4",
        title: "台湾",
      },
      {
        key: "5",
        title: "美国",
      },
      {
        key: "6",
        title: "日本",
      },
      {
        key: "7",
        title: "韩国",
      },
      {
        key: "8",
        title: "其它",
      },
    ],
  },
  byYear: {
    title: "年份",
    content: [
      {
        key: "1",
        title: "全部",
      },
      {
        key: "2",
        title: `${thisYear}`,
      },
      {
        key: "3",
        title: `${thisYear - 1}`,
      },
      {
        key: "4",
        title: `${thisYear - 2}`,
      },
      {
        key: "5",
        title: `${thisYear - 3}`,
      },
      {
        key: "6",
        title: `${thisYear - 4}`,
      },
      {
        key: "7",
        title: `${thisYear - 5}`,
      },
      {
        key: "8",
        title: `${thisYear - 6}`,
      },
      {
        key: "9",
        title: `${thisYear - 7}`,
      },
      {
        key: "10",
        title: `${thisYear - 8}`,
      },
      {
        key: "11",
        title: `${thisYear - 9}`,
      },
      {
        key: "12",
        title: `${thisYear - 10}`,
      },
      {
        key: "13",
        title: `${thisYear - 11}`,
      },
      {
        key: "14",
        title: `${thisYear - 12}`,
      },
      {
        key: "15",
        title: `${thisYear - 13}`,
      },
      {
        key: "16",
        title: `${thisYear - 14}`,
      },
      {
        key: "17",
        title: `${thisYear - 15}`,
      },
    ],
  },
  byOrder: {
    title: "排序",
    content: [
      {
        key: "1",
        title: "时间排序",
      },
      {
        key: "2",
        title: "人气排序",
      },
      {
        key: "3",
        title: "评分排序",
      },
    ],
  },
});
</script>
<style scoped>
.tvShowLibraryPageContainer {
  position: relative;
}

.tvShowFilter {
  color: #fff;
}

.title {
  font-weight: bolder;
  font-size: 1.1em;
}

.items {
  display: inline-block;
}

.items span {
  display: inline-block;
  background-color: var(--bg--part1--);
  margin: 0 10px;
  width: 8em;
  border-radius: 3px;
  height: 2em;
  text-align: center;
  line-height: 2em;
  font-size: 0.6em;
  cursor: pointer;
}

.content {
  position: absolute;
  left: -35px;
}

li {
  display: inline-block;
  margin: 5px;
}

.pagination {
  padding-left: 350px;
  margin-top: 30px;
}
</style>
