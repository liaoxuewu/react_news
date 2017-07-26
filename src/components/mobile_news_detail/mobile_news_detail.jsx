import React,{Component} from 'react';
import {BackTop} from 'antd';
import axios from 'axios';

import NewsComment from '../news_comments/news_comments';

//移动端新闻详情组件
export default class MobileNewsDetail extends Component{
    constructor (props) {
        super(props)
        this.state = {
            news: ''
        }
    }

    componentDidMount () {
        const {uniqueKey} = this.props.params
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniqueKey}`
        axios.get(url)
            .then(response => {
                console.log(response)
                const news = response.data
                this.setState({news})
                document.title = news.title + " - React News | React驱动的新闻平台";
            })
    }

    render () {
        const {pagecontent} = this.state.news
        const {uniqueKey} = this.props.params
        return (
            <div style={{padding: '10px'}}>
                <div className="mobileDetailsContainer" dangerouslySetInnerHTML={{__html:pagecontent}}></div>
                <hr/>
                <NewsComment uniquekey={uniqueKey}/>
                <BackTop/>
            </div>
        )
    }
}