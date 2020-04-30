<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>发布新商品</span>
    </div>
    <el-form ref="form" :model="form" label-width="120px" label-position="left">
      <el-form-item label="商品分类">
        <el-select class="region" v-model="form.cate_1st" placeholder="请选择一级分类">
          <el-option></el-option>
        </el-select>

        <el-select v-model="form.cate_2nd" placeholder="请选择二级分类">
          <el-option></el-option>
        </el-select>

        <el-select v-model="form.cate_3th" placeholder="请选择分类">
          <el-option></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称">
        <el-input class="inputsize" v-model="form.name"></el-input>
        <div class="fontstyle">商品标题名称长度至少3个字符，最长200个汉字</div>
      </el-form-item>

      <el-form-item label="商品卖点">
        <el-input class="inputsize" type="textarea" v-model="form.hotPoint"></el-input>
        <div class="fontstyle">商品卖点不能超过140个汉字</div>
      </el-form-item>

      <el-form-item label="商品价格">
        <div>
          <el-input class="inputprice" v-model="form.price">
            <template slot="append">元</template>
          </el-input>
        </div>

        <div class="fontstyle">
          价格必须是0-999999之间的数字，且不能高于市场价
          <br />此价格为商品实际销售价格，如果商品存在规格，改价格显示最低价格
        </div>
      </el-form-item>

      <el-form-item label="市场价">
        <div>
          <el-input class="inputprice" v-model="form.marketPrice">
            <template slot="append">元</template>
          </el-input>
        </div>

        <div class="fontstyle">价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写</div>
      </el-form-item>

      <el-form-item label="成本价">
        <div>
          <el-input class="inputprice" v-model="form.cost">
            <template slot="append">元</template>
          </el-input>
        </div>

        <div class="fontstyle">价格必须是0-999999之间的数字，此价格为商户对所销售的商品的实际成本价进行备注记录，非必填选项，不会在前台销售页面中显示</div>
      </el-form-item>

      <el-form-item label="折扣">
        <div>
          <el-input class="inputprice" v-model="form.discount">
            <template slot="append">折</template>
          </el-input>
        </div>

        <div class="fontstyle">根据销售价与市场价比例自动生成不需要编辑</div>
      </el-form-item>

      <el-form-item label="商品库存">
        <div>
          <el-input class="inputprice" v-model="form.inventory">
            <template slot="append">件</template>
          </el-input>
        </div>

        <div class="fontstyle">
          价格必须是0-999999之间的整数
          <br />若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写
        </div>
      </el-form-item>

      <el-form-item label="商品货号">
        <div>
          <el-input class="inputprice" v-model="form.articleNo"></el-input>
        </div>

        <div class="fontstyle">
          商品货号是商家管理商品的编号，买家不可见
          <br />最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点
        </div>
      </el-form-item>

      <el-form-item label="商品主图">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <!-- <el-dialog :visible.sync="form.img_lg">
          <img width="100%" :src="form.img_lg" alt />
        </el-dialog> -->

        <div
          class="fontstyle"
        >上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸 800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</div>
      </el-form-item>

      <el-form-item label="商品货号">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <!-- <el-dialog :visible.sync="form.img_md">
          <img width="100%" :src="form.img_md" alt />
        </el-dialog> -->

        <div
          class="fontstyle"
        >上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸 800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</div>
      </el-form-item>

      <div class="tips">商品详情描述</div>

      <el-form-item label="商品品牌">
        <el-input class="inputsize" v-model="form.brand"></el-input>
      </el-form-item>

      <el-form-item label="商品描述" v-model="form.detail" prop="content">
        <!-- 富文本编辑器 -->
        <div ref="editor" style="text-align:left" class="wangeditor"></div>
      </el-form-item>

      <div class="tips">商品物流信息</div>

      <el-form-item label="所在地">
        <el-select class="region" v-model="form" placeholder="请选择一级分类">
          <el-option></el-option>
        </el-select>

        <el-select v-model="form" placeholder="请选择二级分类">
          <el-option></el-option>
        </el-select>

        <el-select v-model="form" placeholder="请选择分类">
          <el-option></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="运费">
        <div>
          <el-input class="inputprice" v-model="form.freight">
            <template slot="append">元</template>
          </el-input>
        </div>

        <div class="fontstyle">运费设为0，前台商品将显示免运费</div>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="release">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import E from "wangeditor";
import {Goods} from "@/api/index"
export default {
  data() {
    return {
      form: {
        id: "",
        cate_1st: "",
        cate_2nd: "",
        cate_3rd: "",
        name: "",
        hotPoint: "",
        price: "",
        marketPrice: "",
        cost: "",
        discount: "",
        inventory: "",
        articleNo: "",
        img_lg: "",
        img_md: "",
        slider:"",
        brand: "",
        detail: "",
        freight: "",
      },
    };
  },
  mounted() {
    // document.getElementById('editor') 相当于 this.$refs.editor
    // console.log(this.$refs.editor);
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = html => {
      this.form.content = html;
    };
    editor.create();
  },
  methods: {
    //---------------------------------发布商品-----------------------
    release() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let { status, data, msg } = await Goods.release(this.form);
          if (status) {
            this.$message.success("修改成功！");
            console.log(data)
          } else {
            //注册失败
            this.$message.error(msg);
          }
        } else {
          console.log("error submit!!");
        }
      });
    },




    //---------------------------------主图-----------------------
    // handleAvatarSuccess(res, file) {
    //   this.form.main_photo = URL.createObjectURL(file.raw);
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // },
    //-------------------轮播图----------------------------------
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    }
  }
};
</script>

<style  scoped>
.inputsize {
  width: 800px;
}
.fontstyle {
  font-size: 12px;
  color: #999;
}
.inputprice {
  width: 140px;
}

.tips {
  padding: 10px 10px;
  background-color: #f5f5f5;
  margin: 10px;
}
/* 文本框的高度 */
.wangeditor .w-e-text-container {
  height: 1000px !important;
}
</style>