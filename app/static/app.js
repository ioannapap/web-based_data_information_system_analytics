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
    chartType: 'bar'
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

      params.country_ids = this.checkedCountries.join(',')
      $.get({ url: '/api/culture', data: params })
        .then(res => {
          var traces = {}
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
  
      params.country_ids = this.checkedCountries.join(',')
      $.get({ url: '/api/homicides', data: params })
        .then(res => {
          var traces = {}
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
    activePage () {
      /* When activePage changes, trigger window resize event so that
       * charts can fit the new bounds */
      window.setTimeout(() => {window.dispatchEvent(new Event('resize'));}, 200)
    }
  }
});
