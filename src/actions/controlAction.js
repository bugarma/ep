import {
    START_TYPING,
    FINISH_TYPING,
    RESET_TYPING,
} from "../types";

export const startTyping = () => ({
    type: START_TYPING,
})

export const finishTyping = () => ({
    type: FINISH_TYPING,
})

export const resetTyping = () => ({
    type: RESET_TYPING,
})