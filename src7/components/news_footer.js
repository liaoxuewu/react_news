import React from 'react'
import {Row, Col} from 'antd'

/**
 * 底部组件
 */
export default function NewsFooter () {

  return (
    <footer>
      <Row>
        <Col span={1}></Col>
        <Col span={22} style={{textAlign:'center', padding: '20px'}}></Col>
            2017 ReactNews. All Rights Reserved.


        <Col span={1}></Col>
      </Row>
    </footer>
  )
}