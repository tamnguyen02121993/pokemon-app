import theme from "../assets/jsons/background.json"

export const themeData = theme.map(t => {
    const colorStop = t.gradient.map(g => `${g.color} ${g.pos}%`).join(', ')
    console.log(colorStop)
    return {
        ...t,
        style: `background-image: linear-gradient(${t.direction}, ${colorStop}`
    }
})