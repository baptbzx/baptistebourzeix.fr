export const state = () => ({
    menuOpened: false
})

export const mutations = {
    toggleMenu(state) {
        state.menuOpened = !state.menuOpened
    },
    closeMenu(state) {
        state.menuOpened = false
    }
}