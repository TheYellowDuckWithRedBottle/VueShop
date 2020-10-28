<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据管理</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
         <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
    </div>
</template>
<script>
import _ from 'lodash'
import echarts from 'echarts'
import {getReport} from '@/network/dataStatic'
export default {
    name:'DataReport',
    data(){
        return{
            report:{},
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
    methods:{
      
    },
   async mounted(){
       var myChart = echarts.init(document.getElementById('main'));
        const res= await getReport()
        console.log(res)
        if(res.meta.status!=200)
        {
            this.$message.error("获取数据错误")
        }
        const result=_.merge(res.data,this.options)
        myChart.setOption(result)
        // const result=_.merge(this.report,this.options)
        // console.log(result)
        
        
    },
 created(){
        
    }
    
}
</script>