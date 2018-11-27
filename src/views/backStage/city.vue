<!--网站管理-支持城市管理 -->
<template>
  <div class="city">
    <el-input placeholder="输入城市名进行过滤" v-model.trim="filterText">
    </el-input>
    <el-tree :data="city" ref="tree2" show-checkbox node-key="id" accordion :expand-on-click-node="false"
      :filter-node-method="filterNode" :props="{label:'cityNameCn',children:'sub'}">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="menu">
          <el-button type="text" size="mini" @click="() => append(data)">
            <i class="el-icon-plus"></i>
          </el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">
            <i class="el-icon-delete"></i>
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
  export default {
    name: 'city',
    data() {
      return {
        filterText: '',
        city: []
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    methods: {
      loadCity() {
        let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
        this.$axios.post('/api/pc/support/cities')
          .then(res => {
            console.log(res)
            this.city = res.dataSet;
          }).catch(err => this.$message.error(err.message))
          .finally(() => this.$nextTick(() => {
            loadingInstance.close();
          }));
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.cityNameCn.indexOf(value) !== -1;
      },
      append(data) {//新增节点
        // const newChild = { id: id++, label: 'testtest', children: [] };
        // if (!data.sub) {
        //   this.$set(data, 'sub', []);
        // }
        // data.sub.push(newChild);
      },
      remove(node, data) {//移除节点
        console.log(node);
        console.log(data);
        // const parent = node.parent;
        // const children = parent.data.children || parent.data;
        // const index = children.findIndex(d => d.id === data.id);
        // children.splice(index, 1);
      },
    },
    beforeMount() {
      this.loadCity();
    }
  }
</script>
<style scoped lang="less">
  .city {
    .menu {
      margin-left: 30px;
    }
  }
</style>