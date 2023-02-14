import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { Descriptions, Tag } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import DescriptionContainer from '../../../Components/Molecules/DescriptionContainer/DescriptionContainer'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import { userAction } from './user.action'
import UserResponse from './user.model'

const UserDetail: React.FC = () => {
  const { id } = useParams()
  const [props, setProps] = React.useState<IApiRes<UserResponse>>()

  React.useEffect(() => {
    ;(async () => setProps(await userAction.findOne(id)))()
  }, [])

  return (
    <>
      <PageHeader title="User Detail" />
      <DescriptionContainer>
        <Descriptions.Item label="ID">{props?.data?.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{props?.data?.name}</Descriptions.Item>
        <Descriptions.Item label="Email">
          {props?.data?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          {props?.data?.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Role">
          <Tag>{props?.data?.role}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Address">
          {props?.data?.address}
        </Descriptions.Item>
      </DescriptionContainer>
    </>
  )
}

export default UserDetail