/**
 * Created by lenovo on 2017/10/31.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 2;
  
  
  function render() {
  $.ajax({
    type:"get",
    url:"/product/queryProductDetailList",
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    success:function (data) {
      // console.log(data);
      $("tbody").html(template("tpl",data));
      
      //分页功能
      $("#paginator").bootstrapPaginator({
        bootstrapMajorVersion:3,
        currentPage:currentPage,
        totalPages:Math.ceil(data.total / pageSize),
        size:"small",
        onPageClicked(a,b,c,page){
          currentPage = page;
          render();
        }
      });
    }
  });
  }
  render();
  
  
  //点击添加模态框
  $(".btn_add").on("click",function () {
    //显示模态框
    $("#addModal").modal("show");
    
    //给下拉框渲染数据
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      success:function (data) {
        // console.log(data);
        $(".dropdown-menu").html(template("tpl2",data));
      }
    });
  });
  
  //给下拉框注册点击事件,让里面值等于点击的那个值  事件委托
  $(".dropdown-menu").on("click","a",function () {
    //获取下拉框里面的值,填写到dropdown-text标签中
    $(".dropdown-text").text($(this).text());//把这个标签写上值
    
    
    
    //获取到自定义属性data-id,设置给隐藏域
    $("#brandId").val(  $(this).data("id") );
  
  
    //改成通过状态
    $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
  });
  
  
  //初始化产品图片上传  调用插件
  $("#fileupload").fileupload({
    dataType:"json",
    done:function (e, data) {
      console.log(e);
      console.log(data);
      //上传成功吧图片上传到img_box中

      $(".img_box").append('<img src="'+ data.result.picAddr+'" width="100" hight="100">');
      
      
      $form.data("bootstrapValidator").updateStatus("brandLogo", "NOT_VALIDATED");//验证中
  
      $form.data("bootstrapValidator").updateStatus("brandId", "VALID");//成功
    }
  });
  
  
  //表单验证
  var $form = $("#form");
  $form.bootstrapValidator({
    //默认不校验的配置
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            //必须是0以上的数字
            regexp: /^[1-9]\d*$/,
            message: "请输入一个大于0的数"
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品尺寸"
          },
          regexp:{
            //33-35
            regexp:/^\d{2}-\d{2}$/,
            message:"请输入正确尺码xx-xx"
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品的原价"
          }
        }
      },
      Price:{
        validators:{
          notEmpty:{
            message:"请输入商品的折扣价"
          }
        }
      },
    }
  });
  
});

