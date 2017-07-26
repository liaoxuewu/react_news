import React,{Component} from "react";
import axios from 'axios';
import {
    Row,//行
    Col//列
} from 'antd'

import NewsImageBlock from '../news_image_block/news_image_block';
import NewsComments from '../news_comments/news_comments';

//新闻详情组件
export default class NewsDetail extends Component{
    constructor(props){
        super(props)
        //初始化状态
        this.state = {
            newsDetail:{}
        }
    }
    //封装一个函数显示新闻详情
    showNewsDetail = () =>{
        const {uniqueKey} = this.props.params
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniqueKey}`
        axios.get(url)
            .then((response) => {
                const newsDetail = response.data;
                //更新状态
                this.setState({newsDetail})
            })
    }
    componentDidMount(){
        //初始化显示
        this.showNewsDetail(this.props)
    }

    componentWillReceiveProps(newProps){
        this.showNewsDetail(newProps)
    }
    render(){
        const {pagecontent} = this.state.newsDetail
        const {uniqueKey} = this.props.params

        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={16} className="container">
                        <div dangerouslySetInnerHTML={{__html:pagecontent}}></div>
                        <hr/>
                        <NewsComments uniquekey={uniqueKey}></NewsComments>
                    </Col>
                    <Col span={6}>
                        <NewsImageBlock type="top" count={20} cardTitle="相关新闻" cardWidth="100%" imageWidth="132px">

                        </NewsImageBlock>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}