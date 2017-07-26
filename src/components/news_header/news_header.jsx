import React,{Component} from 'react';
import {
    Row,//行
    Col,//列
    Menu,//菜单
    Icon,//图标
    Button,//按钮
    Modal,//对话框
    Tabs,//选项卡
    Form,//表单
    Input,//输入框
    message,//弹出提示的对象
} from 'antd';

import logo from '../../images/logo.png';
import {Link} from 'react-router';
import axios from 'axios';


//头部组件
const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class NewsHeader extends Component{
    constructor(props){
        super(props)
        //初始化状态
        this.state = {
            username:null,
            selectKey:'top',
            modalShow:false
        }
    }
    componentDidMount(){
        const username = localStorage.getItem('username')
        if(username){
            //更新状态
            this.setState({username})
        }
    }
    //点击menuItem事件
    handleClickItem = (event) =>{
        //更新selectKey
        this.setState({
            selectKey:event.key
        })

        if(event.key === 'regist'){
            this.setState({
                modalShow:true
            })
        }
}
    //关闭对话框
    handleCancel = ()=>{
        this.setState({
                modalShow:false
        })
    }
    //登出
    logout = ()=>{
        //清除localStorage数据
        localStorage.removeItem('username')
        localStorage.removeItem('userId')
        //更新username状态
        this.setState({username:null})
    }

    //点击注册/登录 发送ajax请求
    handleSubmit = (isRegist)=>{
        //登录
        //http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=zxfjd3g&password=123123
        //注册
        //http://newsapi.gugujiankong.com/Handler.ashx?action=register&r_userName=abc&r_password=123123&r_confirmPassword=123123
        //定义带参数的url
        let url = 'http://newsapi.gugujiankong.com/Handler.ashx?';
        //判断登陆还是注册
        const action = isRegist ? 'register' : 'login';
        url += `action=${action}`;
        //获取表单中所有的数据集合对象
        const formData = this.props.form.getFieldsValue();
        if(isRegist){//注册
            const {r_username,r_password,r_confirm_password} = formData;
            url += `&r_userName=${r_username}&r_password=${r_password}&r_confirm_password=${r_confirm_password}`
        }else {//登陆
            const {username,password} = formData;
            url += `&username=${username}&password=${password}`
        }
        //发送ajax请求
        axios.get(url)
            .then(response =>{
                const result = response.data;
                //请求完成弹出提示
                if(isRegist){//注册
                    if(result === true){//成功
                        message.success('注册成功');
                    }else {//失败
                        message.error('注册失败，请重新注册');
                    }
                }else {//登陆
                    if(result){//成功
                        message.success('登陆成功');
                        //更新username,userId状态
                        const username = result.NickUserName;
                        const userId = result.UserId
                        this.setState({username});
                        //本地保存用户信息
                        localStorage.setItem('username',username);
                        localStorage.setItem('userId',userId);
                    }else {//失败
                        message.error('登陆失败，请重新登陆');
                    }
                }
            })
        //关闭modal
        this.setState({
            modalShow : false
        })
        //清空输入框数据
        this.props.form.resetFields();
}

    render(){
        const {username,selectKey,modalShow} = this.state;

        const { getFieldDecorator} = this.props.form;
        const userInfo = username
            ?(
                <MenuItem key="logout" className="regist">
                    <Button type="primary">{username}</Button>&nbsp;
                    <Link to="/usercenter"><Button type="dashed">个人中心</Button></Link>&nbsp;
                    <Button onClick={this.logout}>退出</Button>
                </MenuItem>
        )
            :(
                <MenuItem key="regist" className="regist">
                    <Icon type="appstore"/>登陆/注册
                </MenuItem>
        )

        return (
            <header>
                <Row>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <a href="/" className="logo">
                            <img src={logo} alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={19}>
                        <Menu mode="horizontal" selectedKeys={[selectKey]} onClick={this.handleClickItem}>
                            <MenuItem key="top">
                                <Icon type="appstore"/>头条
                            </MenuItem>
                            <MenuItem key="shehui">
                                <Icon type="appstore"/>社会
                            </MenuItem>
                            <MenuItem key="guonei">
                                <Icon type="appstore"/>国内
                            </MenuItem>
                            <MenuItem key="guoji">
                                <Icon type="appstore"/>国际
                            </MenuItem>
                            <MenuItem key="yule">
                                <Icon type="appstore"/>娱乐
                            </MenuItem>
                            <MenuItem key="tiyu">
                                <Icon type="appstore"/>体育
                            </MenuItem>
                            <MenuItem key="keji">
                                <Icon type="appstore"/>科技
                            </MenuItem>
                            <MenuItem key="shishang">
                                <Icon type="appstore"/>时尚
                            </MenuItem>
                            {userInfo}
                        </Menu>
                        <Modal
                            title="用户中心"
                            visible={modalShow}
                            onOk={this.handleCancel}
                            onCancel={this.handleCancel}
                            okText="关闭">
                            <Tabs type="card">
                                <TabPane tab="登录" key="1">
                                    {/*绑定this,强制指定参数*/}
                                    <Form onSubmit={this.handleSubmit.bind(this, false)}>
                                        <FormItem label="用户名">
                                            {getFieldDecorator('username')(
                                                <Input type="text" placeholder="请输入账号" />
                                            )}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('password')(
                                                <Input type="password" placeholder="请输入密码" />
                                            )}
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">登陆</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form onSubmit={this.handleSubmit.bind(this,true)}>
                                        <FormItem label="用户名">
                                            {getFieldDecorator('r_username')(
                                                <Input type="text" placeholder="请输入账号" />
                                            )}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('r_password')(
                                                <Input type="password" placeholder="请输入密码" />
                                            )}
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            {getFieldDecorator('r_confirm_password')(
                                                <Input type="password" placeholder="请再次输入你的密码" />
                                            )}
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </header>
            )
    }
}

//所有包含<Form>的组件类都需要Form包装一下
const NewsHeaderForm = Form.create()(NewsHeader);
export default NewsHeaderForm;