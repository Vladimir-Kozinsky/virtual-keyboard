import './styles/index.scss'

const userStack = {
    language: "JavaScript",
    framework: "React"
}

const user = {
    name: "Vitaliy",
    age: "37",
    ...userStack
}

console.log(user)