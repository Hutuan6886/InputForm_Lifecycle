import { DANG_KI, EDIT, UPDATE, XOA } from "../Type/Type"

export const dangKiAction = (newPerson) => {
    return {
        type: DANG_KI,
        newPerson
    }
}

export const xoaAction = (itemPerson) => {
    return {
        type:XOA,
        itemPerson
    }
}

export const editAction = (itemPerson) => {
    return {
        type: EDIT,
        itemPerson
    }
}

export const updateAction = (itemEdit) => {
    return {
        type: UPDATE,
        itemEdit
    }
}