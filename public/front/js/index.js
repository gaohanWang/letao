/**
 * Created by lenovo on 2017/11/1.
 */
//获得slider插件对象
//轮播图
mui('.mui-slider').slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});
// scroll滑动  区域滑动
mui(".mui-scroll-wrapper").scroll({
  indicators : false,
})