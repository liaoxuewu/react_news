import React,{Component} from 'react';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Carousel,
    Tabs
} from 'antd';

import NewsBlock from '../news_block/news_block';
import NewsProducts from '../news_products/news_products';
import NewsImageBlock from '../news_image_block/news_image_block';

import Carousel_1 from '../../images/carousel_1.jpg';
import Carousel_2 from '../../images/carousel_2.jpg';
import Carousel_3 from '../../images/carousel_3.jpg';
import Carousel_4 from '../../images/carousel_4.jpg';

const TabPane = Tabs.TabPane;

// 新闻列表组件
export default class NewsContainer extends Component{
    render(){
        return (
            <div className="container">
                <Row>
                    <Col span={1}/>
                    <Col span={22}>
                        {/*左侧轮播图*/}
                        <div className="leftContainer" style={{width:"35%"}}>
                            <Carousel autoplay>
                                <div>
                                    <img src={Carousel_1}/>
                                </div>
                                <div>
                                    <img src={Carousel_2}/>
                                </div>
                                <div>
                                    <img src={Carousel_3}/>
                                </div>
                                <div>
                                    <img src={Carousel_4}/>
                                </div>
                            </Carousel>
                            <NewsImageBlock type="guoji" count={6} cardTitle="国际新闻"
                                            cardWidth="400px" imageWidth="112px"/>
                        </div>
                        {/*头条新闻、国际新闻*/}
                        <Tabs className='tabs_news' style={{width: "35%"}}>
                            <TabPane tab="头条新闻" key="1">
                                <NewsBlock type="top" count={20}/>
                            </TabPane>
                            <TabPane tab="国际新闻" key="3">
                                <NewsBlock type="guoji" count={20}/>
                            </TabPane>
                        </Tabs>

                        <Tabs className="tabs_product" style={{width: "30%"}}>
                            <TabPane tab="React News产品" key="1">
                                <NewsProducts/>
                            </TabPane>
                        </Tabs>

                        <div>
                            <NewsImageBlock type="guonei" count={8} cardTitle="国内新闻"
                                            cardWidth="100%" imageWidth="132px"/>
                            <NewsImageBlock type="yule" count={16} cardTitle="娱乐新闻"
                                            cardWidth="100%" imageWidth="132px"/>
                        </div>
                    </Col>
                    <Col span={1}/>
                </Row>
            </div>
        )
    }
}