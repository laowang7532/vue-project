<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>订单列表</span>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="50"></el-table-column>
      <el-table-column prop="goodsList" width="500">
        <template slot-scope="scope">
          <el-table :data="scope.row.goodsList" stripe style="width: 100%">
            <el-table-column label="商品">
              <template slot-scope="scope">
                <div class="goods">
                  <img :src="scope.row.img_md" class="img" />
                  <div>{{scope.row.name}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="goods_price" label="单价" width="100"></el-table-column>
            <el-table-column prop="goods_num" label="数量" width="100"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="payment" label="付款总额" width="180"></el-table-column>
      <el-table-column prop="create_time" label="下单时间" sortable width="180"></el-table-column>
      <el-table-column prop="status" label="状态" sortable width="180"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="edit(scope.row.id,scope.row.name)"
            size="mini"
            type="primary"
            icon="el-icon-edit"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { Order } from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.loadlist();
  },
  methods: {
    async loadlist() {
      let { status, data, total } = await Order.list({
        pageindex: 1,
        pagesize: 4
      });
      if (status) {
        this.tableData = data;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.img {
  width: 80px;
  border: 1px solid #ebeef5;
  margin-right: 10px;
}
.goods {
  display: flex;
  align-items: center;
}
</style>