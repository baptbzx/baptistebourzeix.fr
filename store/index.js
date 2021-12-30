export const state = () => ({
    menuOpened: false,
    theme: 'dark',
    colors: {
        dark: {
            background: 'rgb(10,10,10)',
            content: 'rgb(220,220,220)',
            accent: 'rgb(255,255,0)',
            accentAlt: 'rgb(238, 116,8)'
        },
        light: {
            background: 'rgb(220,220,220)',
            content: 'rgb(10,10,10)',
            accent: 'rgb(255,255,0)',
            accentAlt: 'rgb(238, 116,8)'
        }
    },

})

export const mutations = {
    toggleMenu(state) {
        state.menuOpened = !state.menuOpened
    },
    closeMenu(state) {
        state.menuOpened = false
    }
}