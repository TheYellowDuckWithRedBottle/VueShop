<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

      <div id="main" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script> 
import _ from 'lodash'
import {getReport} from '@/network/report'
export default {
data() {
    return {
        options: {
          title: {
            text: '用户来源'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#E9EEF3'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              boundaryGap: false
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ]
        }
    }

},
 mounted() {
    var echarts = require('echarts');
     var myChart = echarts.init(document.getElementById('main'));
    getReport().then(res=>{
        if(res.meta.status==200){
this.options=_.merge(res.data,this.options)
myChart.setOption(this.options);
        }
    })
  
    // 
    // 

},
created() {
    
},
}
</script>

<style>

</style>