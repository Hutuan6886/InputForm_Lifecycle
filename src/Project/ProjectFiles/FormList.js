import React, { Component } from 'react'
import { Heading3 } from '../Components/Heading'
import { Table, Tbody, Td, Th, Thead, Tr } from '../Components/Table'


import { connect } from 'react-redux'
import { ButtonGreen, ButtonRed } from '../Components/Button'
import { editAction, xoaAction } from '../Redux/Action/Action'
class FormList extends Component {

    renderList = () => {
        return this.props.propList.map((item, index) => {
            return <Tr key={index}>
                <Td>{item.id}</Td>
                <Td>{item.tk}</Td>
                <Td>{item.ten}</Td>
                <Td>{item.mk}</Td>
                <Td>{item.sdt}</Td>
                <Td>{item.email}</Td>
                <Td style={{ width: '200px' }} className='text-center'>
                    <ButtonGreen className='mr-2' onClick={() => { this.props.edit(item) }}>Chỉnh sửa</ButtonGreen>
                    <ButtonRed onClick={() => { this.props.xoa(item) }}>Xóa</ButtonRed>
                </Td>
            </Tr>
        })
    }
    render() {
        return (
            <div className='m-2'>
                <Heading3>Danh Sách Người Dùng</Heading3>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>STT</Th>
                            <Th>Tài Khoản</Th>
                            <Th>Họ và Tên</Th>
                            <Th>Mật Khẩu</Th>
                            <Th>Số Điện Thoại</Th>
                            <Th>Email</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {this.renderList()}
                    </Tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        propList: state.FormReducer.formList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        xoa: (itemPerson) => {
            dispatch(xoaAction(itemPerson))
        },
        edit: (itemPerson) => {
            dispatch(editAction(itemPerson))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormList)