import extend from 'extend'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/funnel'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/map'
import '@/assets/js/echarts/shine'
import chinaJson from '@/assets/js/echarts/china.json'

const theme = 'shine'
const tooltip: any = {
  trigger: 'item',
  backgroundColor: '#fff',
  textStyle: {
    color: '#333',
  },
  extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, .7);',
  formatter: (params: any) => {
    return `<p><span style="background: ${params.color};" class="chart-tooltip-color"></span>${params.name} ${params.value} ${params.percent ? (params.percent + '%') : ''}</p>`
  }
}

/**
 * 创建折线图
 * @param ele
 * @param legendData
 * @param xAxisData
 * @param series
 */
export const createLine =
  (ele: HTMLDivElement, legendData: string[], xAxisData: string[], series: any, options?: any) => {
    return echarts.init(ele, theme).setOption(extend(true, {
      legend: {
        data: legendData,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        textStyle: {
          color: '#333',
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, .7);',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      // color: ['#00008B', '#008B8B', '#8B008B', '#8B0000', '#90EE90', '#363636', '#551A8B'],
      series
    }, options))
  }

/**
 * 创建漏斗图
 * @param ele
 * @param legendData
 * @param xAxisData
 * @param series
 */
export const createFunnel = (ele: HTMLDivElement, legendData: string[], series: any[][], options?: any) => {
  return echarts.init(ele, theme).setOption(extend(true, {
    legend: {
      data: legendData,
    },
    tooltip: {
      ...tooltip,
      formatter(params: any) {
        return `<p><span style="background: ${params.color};" class="chart-tooltip-color"></span>${params.data.title}</p><p class="pl-15">数量: ${params.data.value}</p><p class="pl-15">占比: ${params.percent}%</p>`
      }
    },
    color: ['#00d4e7', '#00CED1', '#8470FF', '#1E90FF', '#00BFFF', '#87CEEB', '#87CEFA', '#fffb01'],
    series: series.map((data, index) => {
      const options: any = {
        data,
        type: 'funnel',
        sort: 'descending',
      }
      if (index % 2 === 0) {
        options.itemStyle = {
          normal: {
            label: {
              show: true,
              position: 'right',
              formatter: '{b} {c}'
            }
          }
        }
      } else {
        options.itemStyle = {
          normal: {
            opacity: 0,
            label: {
              show: true,
              position: 'center',
              formatter: '{b}'
            }
          },
        }
      }
      return options
    })
  }, options))
}

/**
 * 创建饼图
 * @param ele
 * @param legendData
 * @param xAxisData
 * @param series
 */
export const createPie = (ele: HTMLDivElement, legendData: string[], series: any[][], options?: any) => {
  return echarts.init(ele, theme).setOption(extend(true, {
    legend: {
      data: legendData,
      bottom: 10,
    },
    tooltip,
    color: ['#00CED1', '#5F9EA0', '#B0C4DE', '#87CEFA', '#7FFFD4', '#00EE00'],
    series: series.map(data => {
      return {
        data,
        radius: ['40%', '60%'],
        type: 'pie',
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: '{b} : {c} ({d}%)'
            },
            labelLine: { show: true }
          }
        }
      }
    })
  }, options))
}

/**
 * 创建柱状图
 * @param ele
 * @param legendData
 * @param series
 */
export const createBar = (ele: HTMLDivElement, legendData: string[], series: any, options?: any) => {
  return echarts.init(ele, theme).setOption(extend(true, {
    xAxis: {
      type: 'category',
      data: legendData
    },
    yAxis: {
      type: 'value',
    },
    tooltip,
    series
  }, options))
}

echarts.registerMap('china', chinaJson)

/**
 * 创建地图
 * @param ele
 * @param legendData
 * @param series
 * @param options
 */
export const createMap = (ele: HTMLDivElement, series: any[][], options?: any) => {
  return echarts.init(ele, theme).setOption(extend(true, {
    geo: {
      map: 'china',
      roam: false, // 不开启缩放和平移
      zoom: 1.23, // 视角缩放比例
      label: {
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#FFE4CA',
          borderColor: '#84C1FF',
          borderWidth: 0.8
        },
        emphasis: {
          areaColor: '#FFC78E'
        }
      }
    },
    visualMap: {
      show: true,
      min: 0,
      max: 60000,
      text: ['高', '低'],
      realtime: false,
      calculable: true,
      itemWidth: 10,
    },
    tooltip,
    series: series.map(data => {
      return {
        data,
        type: 'map',
        mapType: 'china',
        itemStyle: {
          normal: { label: { show: false } },
          emphasis: { label: { show: true } }
        },
      }
    })
  }, options))
}
