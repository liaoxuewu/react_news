import React,{Component,PropTypes} from 'react';
import axios from 'axios';
import {Card} from 'antd';
import {Link} from 'react-router';

//新闻列表组件
export default class MobileNewsBlock extends Component{
    static propTypes = {
        type:PropTypes.string.isRequired,
        count:PropTypes.number.isRequired
    }

    constructor(props){
        super(props)
        //初始化状态
        this.state = {
            newsArr:[]
        }
    }

    componentDidMount(){
        const {type,count} = this.props;
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response => {
                const result = response.data;
                //更新状态
                this.setState({
                    newsArr:result
                })
            })
    }

    render(){
        const {newsArr} = this.state;
        const newsList = newsArr.length
            ? newsArr.map((news, index) => (
            <Card key={index} className="m_article list-item special_section clearfix">
                <Link to={`detail/${news.uniquekey}`}>
                    <div className="m_article_img">
                        <img src={news.thumbnail_pic_s} alt={news.title} />
                    </div>
                    <div className="m_article_info">
                        <div className="m_article_title">
                            <span>{news.title}</span>
                        </div>
                        <div className="m_article_desc clearfix">
                            <div className="m_article_desc_l">
                                <span className="m_article_channel">{news.realtype}</span>
                                <span className="m_article_time">{news.date}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </Card>
        ))
            /*? newsArr.map((news,index)=>{
                <Card key={index} className="m_article list-item special_section clearfix">
                    <Link to={`detail/${news.uniquekey}`}>
                        <div className="m_article_img">
                            <img src={news.thumbnail_pic_s} alt={news.title}/>
                        </div>
                        <div className="m_article_info">
                            <div className="m_article_title">
                                <span>{news.title}</span>
                            </div>
                            <div className="m_article_desc clearfix">
                                <div className="m_article_desc_l">
                                    <span className="m_article_channel">{news.realtype}</span>
                                    <span className="m_article_time">{news.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </Card>
        })*/
            :'没有加载任何新闻'
        return(
            <div>
                {newsList}
            </div>
        )
    }

}