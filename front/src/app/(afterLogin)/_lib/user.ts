import Axios from "@/Axios/axios";

export async function getCurrentUser() {
  try {
    const { data } = await Axios.get(`/user/current`);


    //성공시 {data}로 바로 받아올 수 있지만
    //실패시 {data}로 바로 받아올수 없다. 실패시 형태가 다르다. 이걸 까먹고 있었네
    //{data}로 받고 if로 확인하면 요청 성공/실패 여부 알수는 있겠네
    //try catch는 그럼 언제 동작한느거지?
    //아 커스텀 axios 인터셉터르 잘못만들어서 오류를 인지하지 못하고 있었어!!! 이 내용 다 정리하자 ㅎ

    //retrydelay !== refetchinterval 리패치 인터벌을 설정하니까 당연히 오류가 나지!! 

    console.log(data);
    // 데이터 검증: data가 정의되어 있는지 확인
    // if (data === undefined || data === null) {
    //   throw new Error('Data is undefined or null');
    // }

    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get user(current) data!!');
  }
}