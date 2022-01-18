export const state = () => ({
    menuOpened: false,
    theme: 'dark',
    colors: {
        dark: {
            background: 'rgb(0,0,0)',
            content: 'rgb(220,220,220)',
            accent: 'rgb(255,255,0)',
            accentAlt: 'rgb(238, 116,8)'
        },
        light: {
            background: 'rgb(220,220,220)',
            content: 'rgb(10,10,10)',
            accent: 'rgb(255,0,0)',
            accentAlt: 'rgb(238, 116,8)'
        }
    },
    sun: {}
})

export const mutations = {
    toggleMenu(state) {
        state.menuOpened = !state.menuOpened
    },
    setTheme(state) {
        const sunsetFormated = new Date(state.sun.sunset).getTime()
        if (state.currentDate <= sunsetFormated) {
            state.theme = "dark"
        } else {
            state.theme = "light"
        }
    },
    setCurrentDate(state, date) {
        state.currentDate = new Date(Date.now()).getTime()
    },
    toggleTheme(state) {
        state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
    closeMenu(state) {
        state.menuOpened = false
    },
    setSunDatas(state, datas) {
        if (datas.status === 'OK') {
            state.sun = datas.results
        }
    }
}

export const actions = {
    async getSunTimes({commit}) {
        const req = await this.$axios.$get('https://api.sunrise-sunset.org/json?lat=48.584614&lng=7.7507127&date=today&formatted=0')
        commit('setSunDatas', req)
    },
    async setTheme({dispatch,commit}) {
        return dispatch('getSunTimes').then(async () => {
            await commit('setCurrentDate')
            commit('setTheme')
        })
    }
}