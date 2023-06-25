import { defineStore } from "pinia";
import { ref } from "vue";

// 追剧周表
const useWeeklyStore = defineStore("weeklyStore", {
  state: () => {
    const weeklyCardsNum = ref(6);
    const weeks = ref([
      {
        date: "周一",
        videoItems: [
          "真的出现了",
          "律师Sodom",
          "月读君的禁忌夜宵",
          "哦！英心",
          "继承之战第四季",
          "巴瑞第四季",
        ],
      },
      {
        date: "周二",
        videoItems: [
          "Pending Train-8点23分，明天和你",
          "LAST MAN-全盲搜查官",
          "偶然遇见的你",
          "假面女王",
          "纸之月",
          "某人某地第二季",
        ],
      },
      {
        date: "周三",
        videoItems: [
          "大哥大姐没出息第三季",
          "晴空",
          "有益的欺诈",
          "我继承了牛郎俱乐部",
          "残酷夏天第二季",
          "Unknown",
        ],
      },
      {
        date: "周四",
        videoItems: [
          "熊家餐馆第二季",
          "高地沙漠",
          "09届探员",
          "甜蜜的宽恕",
          "柏拉图关系第一季",
          "周日晚上左右",
        ],
      },
      {
        date: "周五",
        videoItems: [
          "罪恶黑名单",
          "羊毛战记第一季",
          "就这样第二季",
          "行尸走肉：死亡之城",
          "4月的东京",
          "但是还有热情",
        ],
      },
      {
        date: "周六",
        videoItems: [
          "玛雅帮第五季",
          "古战场传奇第七季",
          "Numbers：大厦森林的监视者们",
          "恶鬼",
          "昂首阔步第二季",
          "神探南茜第四季",
        ],
      },
      {
        date: "周日",
        videoItems: [
          "爱停留",
          "浪漫医生金师傅3",
          "巧克力医生",
          "夫妻破裂之际",
          "断林镇谜案第九季",
          "九尾狐传1938",
        ],
      },
    ]);
    return {
      weeklyCardsNum,
      weeks,
    };
  },

  actions: {},
});

export default useWeeklyStore;
