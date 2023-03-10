import { UserOutlined } from '@ant-design/icons'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Avatar, Space, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../../Enums/Route'

type IProps = {
  children?: React.ReactNode
  headerRightMenu?: React.FC
  user: IUser
}

const { Text } = Typography

const LayoutProfile: React.FC<IProps> = (props: IProps) => {
  return (
    <Link
      to={Route.Profile}
      style={{
        width: '100%',
        marginLeft: '80%',
      }}
    >
      <Space size="small">
        <Avatar
          icon={<UserOutlined />}
          src={'https://suhpen.up.railway.app/images/profile.jpg'}
          style={{ backgroundColor: 'white' }}
        />

        <Space.Compact direction="vertical" size="small">
          <Text>{props?.user?.name}</Text>
        </Space.Compact>
      </Space>
    </Link>
  )
}

export default LayoutProfile
