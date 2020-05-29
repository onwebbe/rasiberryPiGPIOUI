import React from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Router from '../router/Router'
import ViewPersonCardList from './ViewPersonCardList'
const { Header, Content, Footer, Sider } = Layout;

class MainLayout extends React.Component {
    componentDidMount() {
        console.log('x');
    }
    render() {
        const { collapse, onCollapse } = this.props
        return (
            <Layout>
                <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={onCollapse}
                collapsible collapsed={collapse}
                >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['gpioOverview']}>
                    <Menu.Item key="gpioOverview">
                    <a href='#/gpioOverview'>
                        <UserOutlined />
                        <span className="nav-text">树莓派GPIO总览</span>
                    </a>
                    </Menu.Item>
                    <Menu.Item key="managePiDevice">
                    <a href='#/managePiDevice'>
                        <VideoCameraOutlined />
                        <span className="nav-text">树莓派设备管理</span>
                    </a>
                    </Menu.Item>
                    <Menu.Item key="3">
                    <a href='#/weather'>
                        <VideoCameraOutlined />
                        <span className="nav-text">天气</span>
                    </a>
                    </Menu.Item>
                    <Menu.Item key="4">
                    <a href='#/chartConfig'>
                        <VideoCameraOutlined />
                        <span className="nav-text">图表配置</span>
                    </a>
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0', height: '100%'}}>
                    <div className="site-layout-background">
                        <Router></Router>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default MainLayout;