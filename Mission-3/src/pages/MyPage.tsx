import React, { useEffect } from 'react'
import { getMyInfo } from '../apis/auth'
import type { ResponseMyInfoDto } from '../types/auth';

const MyPage = () => {
    const [data, setData] = React.useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getDate = async () => {
            const response =  await getMyInfo();
            console.log(response);
            setData(response);
        }

        getDate();
    }, [])
    console.log(data?.data.name);
  return (
    <div>
      {data?.data.name}
    </div>
  )
}

export default MyPage
