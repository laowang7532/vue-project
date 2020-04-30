<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品列表</span>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column label="商品名称" width="480">
        <template slot-scope="scope">
          <div class="goods">
            <img :src="scope.row.img_md" class="img" />
            <div>{{scope.row.name}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" sortable width="180"></el-table-column>
      <el-table-column prop="inventory" label="库存" sortable width="180"></el-table-column>
      <el-table-column prop="create_time" label="发布时间" sortable width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="edit(scope.row.id,scope.row.name)"
            size="mini"
            type="primary"
            icon="el-icon-edit"
            plain
          ></el-button>
          <el-button
            @click="removeHandle(scope.row.id,scope.$index)"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="footer">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[4, 8, 16, 32]"
        :page-size="10"
        :pager-count="5"
        layout="prev, pager, next, sizes, total"
        :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import { Goods } from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
      pagedata:{},
      total:'',
      pageSize:"4",
      pageIndex:"1",
    };
  },
  created() {
    //获取数据列表
    this.loadlist(4,1);
  },
  methods: {
    //--------------------删除商品--------------------------
    // 删除
    removeHandle(id, index) {
      this.$confirm("确定要删除此商品吗?", { type: "warning" }).then(
        async () => {
          // 发送ajax
          let { status } = await Goods.del({ id });
          if (status) {
            // 界面上的数据删除
            this.tableData.splice(index, 1);
            this.$message.success("删除成功");
          }
        }
      );
    },

    //--------------------获取商品列表------------------------
    async loadlist(pageSize,pageIndex) {
      let { status, goods, total } = await Goods.list({
        pageSize,
        pageIndex
      });
      if (status) {
        this.total = total;
        this.tableData = goods;
      }
    },
    //--------------------分页器----------------------------
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);

      this.loadlist(val,this.pageIndex)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.loadlist(this.pageSize,val)
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  margin-top: 10px;
  margin-right: 10px;
  text-align: right;
}
.img {
  width: 80px;
  border: 1px solid #ebeef5;
  margin-right: 10px;
}
.goods{
  display: flex;
  align-items: center;
}
</style>