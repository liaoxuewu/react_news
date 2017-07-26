import React,{Component} from 'react';

import MobileNewsHeader from '../mobile_news_header/mobile_news_header';
import NewsFooter from '../news_footer/news_footer'
import '../../componentCss/mobile.css';


//移动端跟根路由组件
export default class MobileApp extends Component{
    render(){
        return(
            <div>
                <MobileNewsHeader/>
                {this.props.children}
                <NewsFooter/>
            </div>
        )
    }
}