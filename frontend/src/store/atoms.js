import {atom } from "recoil"

export const flipAtom=atom({
    key:"flipAtom",
    default:false,
})

export const cardAtom=atom({
    key:"cardAtom",
    default:[],
})

export const workAtom=atom({
    key:"workAtom",
    default:""
})