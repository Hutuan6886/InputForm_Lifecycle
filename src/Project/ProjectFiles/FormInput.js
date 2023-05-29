import React, { Component } from 'react'
import { Heading3, Heading4, Heading5 } from '../Components/Heading'
import { TextField } from '../Components/TextField'
import { ButtonGreen, ButtonRed } from '../Components/Button'
import { dangKiAction, updateAction } from '../Redux/Action/Action'

import { connect } from 'react-redux'

class FormInput extends Component {
    state = {
        input: {
            newTk: '',
            newMk: '',
            newEmail: '',
            newTen: '',
            newSdt: '',
            newId: '',
        },


        error: {
            newTk: '',
            newMk: '',
            newEmail: '',
            newTen: '',
            newSdt: '',
            newId: '',
        }
    }

    handleEvent = (event) => {
        let { name, value, type } = event.target;
        console.log(name, value, type);

        //todo: lấy dữ liệu từ ô input
        let newInput = { ...this.state.input }
        newInput[name] = value;

        //todo: kiểm tra valid trước khi tạo 1 item gửi qua redux
        let newError = { ...this.state.error }

        if (type === 'text') {
            let letter = /^[\u0041-\u1ef5\s]+$/;
            if (value.match(letter)) {
                newError[name] = ''
            }
            else {
                newError[name] = 'Không hợp lệ!'
            }
        }
        if (type === 'number') {
            if (name === 'newSdt') {
                if (value.trim().length === 10) {
                    newError[name] = ''
                }
                else {
                    newError[name] = 'Phải có 10 kí tự!'
                }
            }
            if (name === 'newId') {
                if (value.trim().length === 8) {
                    newError[name] = ''
                }
                else {
                    newError[name] = 'Phải có 8 kí tự!'
                }
            }
        }
        if (type === 'email') {
            let email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (value.match(email)) {
                newError[name] = ''
            }
            else {
                newError[name] = `${type} Không hợp lệ!`
            }
        }

        this.setState({
            //todo: set lại input và error
            input: { ...newInput },
            error: { ...newError },
        })
    }

    submitForm = () => {
        let { newTk, newMk, newEmail, newTen, newSdt, newId } = this.state.input;
        let { input, error } = this.state;

        //todo: sau khi kiểm tra valid trước thì tạo điều kiện để được submit, là không có 1 lỗi nào mới được submit

        //todo: Sẽ có 2 điều kiện được submit: 1. error khác rỗng, sử dụng for in quét qua error, và gán biến cờ valid bằng true hoặc false
        //todo:                                2. value(newTk, newMk, new...) phải khác rỗng(không được để rỗng ô input) 
        let valid = true;       //* Tạo biến cờ cho phép qua, xét điều kiện nào không đạt thì cho valid false
        for (let i in error) {
            if (error[i] !== '') {      //* error khác rỗng nghĩa là có hiện error => thì không đc submit
                valid = false;
            }
        }

        for (let i in input) {      //* input bằng rồng nghĩa là không nhập gì hết => không được submit
            if(input[i] === ''){
                valid = false;
            }
        }

        if (!valid) {     //* nếu valid false
            alert('Submit không thành công!')
            return;
        }

        //todo: tạo 1 person mới và gửi qua redux
        let newPerson = {
            id: newId,
            tk: newTk,
            mk: newMk,
            ten: newTen,
            sdt: newSdt,
            email: newEmail
        }
        this.props.dangKi(newPerson);


        this.setState({
            input: {
                newTk: '',
                newMk: '',
                newEmail: '',
                newTen: '',
                newSdt: '',
                newId: ''
            }
        })
    }

    updateForm = () => {
        let { newTk, newMk, newEmail, newTen, newSdt, newId } = this.state.input;

        //todo: Valid update giống submit
        let { input, error } = this.state;
        let valid = true;
        for (let i in error) {
            if (error[i] !== '') {
                valid = false;
            }
        }
        for (let i in input) {
            if(input[i] === ''){
                valid = false;
            }
        }

        if (!valid) {  
            alert('Submit không thành công!')
            return;
        }

        let editPerson = {
            id: newId,
            tk: newTk,
            mk: newMk,
            ten: newTen,
            sdt: newSdt,
            email: newEmail
        }
        this.props.update(editPerson);
    }

    render() {
        return (
            <div className='row m-2'>
                <Heading3>Form Đăng Kí</Heading3>
                <div className='col-6'>
                    <Heading4>Tài Khoản</Heading4>
                    <TextField className='col-5' name='newTk' type='account' value={this.state.input.newTk} onChange={(event) => { this.handleEvent(event) }}></TextField>
                    <Heading5>{this.state.error.newTk}</Heading5>
                    <Heading4>Mật Khẩu</Heading4>
                    <TextField className='col-5' name='newMk' type='password' value={this.state.input.newMk} onChange={(event) => { this.handleEvent(event) }}></TextField>
                    <Heading4>Email</Heading4>
                    <TextField className='col-5' name='newEmail' type='email' value={this.state.input.newEmail} onChange={(event) => { this.handleEvent(event) }}></TextField>
                    <Heading5>{this.state.error.newEmail}</Heading5>
                </div>
                <div className='col-6'>
                    <Heading4>Họ và Tên</Heading4>
                    <TextField className='col-5' name='newTen' type='text' value={this.state.input.newTen} onChange={(event) => { this.handleEvent(event) }}></TextField>
                    <Heading5>{this.state.error.newTen}</Heading5>
                    <Heading4>Số Điện Thoại</Heading4>
                    <TextField className='col-5' name='newSdt' type='number' value={this.state.input.newSdt} onChange={(event) => { this.handleEvent(event) }}></TextField>
                    <Heading5>{this.state.error.newSdt}</Heading5>
                    <Heading4>Mã Khách Hàng</Heading4>
                    {this.props.propDisabledId
                        ?
                        <TextField disabled className='col-5' name='newId'></TextField>
                        :
                        <TextField className='col-5' name='newId' type='number' value={this.state.input.newId} onChange={(event) => { this.handleEvent(event) }}></TextField>}
                    <Heading5>{this.state.error.newId}</Heading5>
                </div>
                <div className='mt-2'>
                    {this.props.propDisableDangkiBtn
                        ?
                        <ButtonGreen disabled className='mr-2'>Đăng Kí</ButtonGreen>
                        :
                        <ButtonGreen className='mr-2' onClick={() => { this.submitForm() }}>Đăng Kí</ButtonGreen>}
                    {this.props.propDisableUpdateBtn
                        ?
                        <ButtonRed disabled>Cập Nhật</ButtonRed>
                        :
                        <ButtonRed onClick={() => { this.updateForm() }}>Cập Nhật</ButtonRed>}

                </div>
            </div>
        )
    }

    componentDidUpdate = (prevProps, prevState) => {
        //todo: Nếu ấn vào chỉnh sửa id=1, thì prevProps=rỗng, props=1 => khác nhau thì sẽ cho redux cập nhật lại state để hiển thị lên ô input giá trị id=1 
        //todo: Nếu lần 2 ấn vào id=2, thì thì prevProps=1, props=2 => khác nhau thì sẽ cho redux cập nhật lại state để hiển thị lên ô input giá trị id=2
        //! ==> nếu lần sau ấn vào nút edit của item khác với item trước đó thì state sẽ được redux cập nhật lại 
        if (prevProps.propEdit.id !== this.props.propEdit.id) {
            this.setState({
                input: {
                    newTk: this.props.propEdit.tk,
                    newMk: this.props.propEdit.mk,
                    newEmail: this.props.propEdit.email,
                    newTen: this.props.propEdit.ten,
                    newSdt: this.props.propEdit.sdt,
                    newId: this.props.propEdit.id
                }
            })
        }
    }
}

const mapStateToProps = state => {
    return {
        propEdit: state.FormReducer.editPerson,
        propDisabledId: state.FormReducer.disabledId,
        propDisableUpdateBtn: state.FormReducer.disabledUpdateBtn,
        propDisableDangkiBtn: state.FormReducer.disabledDangkiBtn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dangKi: (newperson) => {
            dispatch(dangKiAction(newperson));
        },
        update: (itemEdit) => {
            dispatch(updateAction(itemEdit));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormInput);