const app = new Vue({
  el: '#app',

  data: {
    countries: [],
    checkedCountries: [],
    baseLayout: {
      height: 500
    },
    activePage: 'homicides',
    baseSettings: {
      responsive: true
    },
    chartType: 'bar',
    data: {
      politicalCulture: [],
      homicides: []
    },
    startYear: 2000,
    endYear: 2019,
    availableYears: [],
    yearsGroup: ''
  },

  methods: {
    deepClone (obj) {
      return JSON.parse(JSON.stringify(obj))
    },

    loadCountries () {
      $.get({ url: '/api/country' })
        .then(res => {
          this.countries = res.results
        })
    },

    createPoliticalCultureChart() {
      let chartNodeID = 'culture-chart'
      let params = {}
      let layout = this.deepClone(this.baseLayout)
      let settings = this.deepClone(this.baseSettings)

      layout.xaxis = { title: { text: 'Date' } }
      layout.yaxis = { title: { text: 'Political culture index' } }

      Plotly.purge(chartNodeID)
      this.data.politicalCulture = []

      params.country_ids = this.checkedCountries.join(',')
      params.year_from = this.startYear
      params.year_to = this.endYear
      $.get({ url: '/api/culture', data: params })
        .then(res => {
          var traces = {}
          this.data.politicalCulture = res.results
          for (let i in res.results) {
            let entry = res.results[i]
            if (!traces.hasOwnProperty(entry.country_name)) {
              traces[entry.country_name] = {
                x: [], y: [], name: entry.country_name, type: this.chartType
              }
            }
            traces[entry.country_name].x.push(entry.year)
            traces[entry.country_name].y.push(entry.political_index)
          }
          Plotly.react(chartNodeID, Object.values(traces), layout, settings)
        })
    },

    createHomicidesChart() {
      let chartNodeID = 'homicides-chart'
      let params = {}
      let layout = this.deepClone(this.baseLayout)
      let settings = this.deepClone(this.baseSettings)
  
      layout.xaxis = { title: { text: 'Date' } }
      layout.yaxis = { title: { text: 'Homicides' } }
  
      Plotly.purge(chartNodeID)
      this.data.homicides = []
  
      params.country_ids = this.checkedCountries.join(',')
      params.year_from = this.startYear
      params.year_to = this.endYear
      $.get({ url: '/api/homicides', data: params })
        .then(res => {
          var traces = {}
          this.data.homicides = res.results
          for (let i in res.results) {
            let entry = res.results[i]
            if (!traces.hasOwnProperty(entry.country_name)) {
              traces[entry.country_name] = {
                x: [], y: [], name: entry.country_name, type: this.chartType
              }
            }
            traces[entry.country_name].x.push(entry.year)
            traces[entry.country_name].y.push(entry.homicides)
          }
          Plotly.react(chartNodeID, Object.values(traces), layout, settings)
        })
    },

    createCombinedChart() {
      let chartNodeID = 'combined-chart'
      let layout = this.deepClone(this.baseLayout)
      let settings = this.deepClone(this.baseSettings)
  
      layout.xaxis = { title: { text: 'Date' } }
      layout.yaxis = { title: { text: 'Homicides' } }
      layout.yaxis2 = {
        title: 'Culture index',
        overlaying: 'y',
        side: 'right'
      }
  
      Plotly.purge(chartNodeID)

      let traces = []

      let trace = {x:[], y:[], type:'scatter', mode: 'markers', name: 'Homicides', marker: { size: 7 }}
      for (let i = 0; i < this.data.homicides.length; i++) {
        let homicide = this.data.homicides[i]
        trace.x.push(homicide.year)
        trace.y.push(homicide.homicides)
      }
      traces.push(trace)

      let trace2 = {yaxis: 'y2', x:[], y:[], type:'scatter', mode: 'markers', name: 'Political culture', marker: { size: 7 }}
      for (let i = 0; i < this.data.politicalCulture.length; i++) {
        let pc = this.data.politicalCulture[i]
        trace2.x.push(pc.year)
        trace2.y.push(pc.political_index)
      }
      traces.push(trace2)

      Plotly.react(chartNodeID, traces, layout, settings)
    },

    createCharts () {
      if (this.checkedCountries.length > 0) {
        this.createPoliticalCultureChart()
        this.createHomicidesChart()
      }
    }
  },

  filters: {
    capitalize (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },

  mounted () {
    /* fill available years */
    for (let i = 2019; i >= 1950; i--) {
      this.availableYears.push(i)
    }

    this.loadCountries()
    this.createCharts()
  },

  watch: {
    checkedCountries () {
      this.createCharts()
    },
    chartType () {
      this.createCharts()
    },
    startYear(newVal, oldVal) {
      if (newVal > this.endYear) {
        this.startYear = oldVal;
      } else {
        this.createCharts()
      }
    },
    endYear(newVal, oldVal) {
      if (newVal < this.startYear) {
        this.endYear = oldVal;
      } else {
        this.createCharts()
      }
    },
    activePage () {
      /* When activePage changes, trigger window resize event so that
       * charts can fit the new bounds */
      window.setTimeout(() => {window.dispatchEvent(new Event('resize'));}, 200)
      if (this.activePage === 'combined') {
        this.createCombinedChart()
      }
    }
  }
});
