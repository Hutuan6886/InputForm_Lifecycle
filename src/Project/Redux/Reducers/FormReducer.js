import { DefaultTheme } from "../../Themes/DefaultTheme";
import { DANG_KI, EDIT, UPDATE, XOA } from "../Type/Type";

const formState = {
    theme: DefaultTheme,

    formList: [
        // { id: 1, tk: 'tuanlehuu', mk: '123', ten: 'Lê Hữu Tuân', sdt: '0353898846', email: 'tuanlehuu72@gmail.com' }
    ],
    editPerson: { id: '', tk: '', mk: '', ten: '', sdt: '', email: '' },

    disabledId: false,
    disabledDangkiBtn: false,
    disabledUpdateBtn: true,
}

const FormReducer = (state = formState, action) => {

    switch (action.type) {
        case DANG_KI: {

            let formListUpdate = [...state.formList];

            let index = formListUpdate.findIndex(item => item.id === action.newPerson.id || item.tk === action.newPerson.tk || item.sdt === action.newPerson.sdt || item.email === action.newPerson.email)
            if (index !== -1) {
                if (formListUpdate[index].id === action.newPerson.id) {
                    alert('ID này đã tồn tại xin kiểm tra lại!');
                }
                else if (formListUpdate[index].tk === action.newPerson.tk) {
                    alert('Tài khoản này đã tồn tại xin kiểm tra lại!');
                }
                else if (formListUpdate[index].sdt === action.newPerson.sdt) {
                    alert('Số điện thoại này đã tồn tại xin kiểm tra lại!');
                }
                else if (formListUpdate[index].email === action.newPerson.email) {
                    alert('Email này đã tồn tại xin kiểm tra lại!');
                }
            }
            else {
                formListUpdate.push(action.newPerson);
            }
            state.formList = formListUpdate;

            return { ...state }
        }

        case XOA: {
            console.log(action.itemPerson)
            let formListUpdate = [...state.formList];
            formListUpdate = formListUpdate.filter(item => item.id !== action.itemPerson.id) //! filter lọc ra các phần tử không thỏa mãn điều kiện trong filter

            state.formList = formListUpdate;
            return { ...state }
        }

        case EDIT: {
            // console.log('state',state.editPerson)
            //todo: xóa đi item mà khi ấn vào nút edit
            let formListUpdate = [...state.formList];
            formListUpdate = formListUpdate.filter(item => item.id !== action.itemPerson.id)

            state.formList = formListUpdate;
            //todo: sau khi ấn nút edit thì trạng thái của một số ô input và nút btn có thay đổi
            return { ...state, editPerson: action.itemPerson, disabledId: true, disabledDangkiBtn: true, disabledUpdateBtn: false }
        }

        case UPDATE: {
            console.log(action.itemEdit)

            let formListUpdate = [...state.formList];
            let editPersonUpdate = state.editPerson;

            //todo: Gán giá trị edit vào editPerson tại redux
            let index = formListUpdate.findIndex(item => item.tk === action.itemEdit.tk || item.sdt === action.itemEdit.sdt || item.email === action.itemEdit.email)
            if (index !== -1) {
                if (formListUpdate[index].tk === action.itemEdit.tk) {
                    alert('Tài khoản này đã tồn tại xin kiểm tra lại!');
                }
                else if (formListUpdate[index].sdt === action.itemEdit.sdt) {
                    alert('Số điện thoại này đã tồn tại xin kiểm tra lại!');
                }
                else if (formListUpdate[index].email === action.itemEdit.email) {
                    alert('Email này đã tồn tại xin kiểm tra lại!');
                }
            }
            else {
                editPersonUpdate = action.itemEdit;
                //todo: sau khi điền xong update thì push lại item đó vào formListUpdate
                formListUpdate.push(editPersonUpdate);

                //todo: sau khi ấn updateBtn thì xóa các giá trị hiển thị trên ô input đi để nhập giá trị khác
                editPersonUpdate = { id: '', tk: '', mk: '', ten: '', sdt: '', email: '' }
                //todo: đồng thời set lại trạng thái disabled ở các ô input và các nút btn để kết thúc update
                state.disabledId = false;
                state.disabledDangkiBtn = false;
                state.disabledUpdateBtn = true;
            }

            state.formList = formListUpdate;
            // console.log('state.formList', state.formList)
            state.editPerson = editPersonUpdate;
            // console.log('state.editPerson', state.editPerson)

            return { ...state }
        }
        default: return { ...state };
    }
}

export default FormReducer;